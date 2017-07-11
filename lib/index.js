import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { polarToCartesian, circularArc, calcAngleDiff } from './helpers/geometryHelpers';
import { Dragger } from './Dragger';

export class DraggableArc extends Component {
  padding = 20
  center = {
    x: this.props.r + this.padding,
    y: this.props.r + this.padding,
  }
  size = 2*(this.props.r + this.padding)
  absoluteContainerPosition = () => {
    if (!this.containerNode) { return null; };
    const { left: x, top: y } = this.containerNode.getBoundingClientRect();
    return { x, y };
  }
  handleDrag = ({ x, y }) => {
    const { x: fiducialX, y: fiducialY } = polarToCartesian(0, 0, this.props.r, this.props.angle);
    const deltaTheta = calcAngleDiff(x, y, fiducialX, -fiducialY);
    const newAngle = this.props.angle + deltaTheta;
    this.props.onMove(newAngle);
  }
  render() {
    const { color, minAngle, maxAngle, r, angle } = this.props;
    const relCenterPos = this.center;
    const relPosition = polarToCartesian(relCenterPos.x, relCenterPos.y, r, angle);
    const radialPosition = polarToCartesian(0, 0, r, angle);
    return (
      <svg
        ref={x => { this.containerNode = x; }}
        style={{ width: this.size, height: this.size }}
      >
        {this.props.showLine ? (
          <line
            stroke={color}
            strokeWidth="1"
            x1={relCenterPos.x}
            x2={relPosition.x}
            y1={relCenterPos.y}
            y2={relPosition.y}
          />
        ) : null}

        {this.props.showArc ? (
          <path
            d={circularArc(relCenterPos.x, relCenterPos.y, minAngle, maxAngle, r)}
            fill="transparent"
            stroke={color}
          />
        ) : null}

        <Dragger
          absoluteContainerFunc={this.absoluteContainerPosition}
          color={color}
          onMove={this.handleDrag}
          radialPosition={radialPosition}
          radius={this.padding}
          relCenterPos={relCenterPos}
        />
      </svg>
    );
  }
}

DraggableArc.propTypes = {
  angle: PropTypes.number,
  color: PropTypes.string,
  maxAngle: PropTypes.number,
  minAngle: PropTypes.number,
  onMove: PropTypes.func,
  r: PropTypes.number,
  showArc: PropTypes.bool,
  showLine: PropTypes.bool,
};

DraggableArc.defaultProps = {
  angle: 200,
  color: "#555",
  maxAngle: 360,
  minAngle: 180,
  onMove: () => {},
  r: 100,
  showArc: true,
  showLine: true,
};
