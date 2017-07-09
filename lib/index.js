import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { polarToCartesian, circularArc } from './helpers';


export class DraggableArc extends Component {
  state = {
    angle: 200,
  }
  padding = 10
  center = {
    x: this.props.r + this.padding,
    y: this.props.r + this.padding,
  }
  size = 2*(this.props.r + this.padding)
  render() {
    const { angle } = this.state;
    const { x, y } = this.center;
    const { color, minAngle, maxAngle, r } = this.props;
    const draggerPosition = polarToCartesian(x, y, r, angle);

    return (
      <svg style={{ width: this.size, height: this.size }}>
        <circle
          cx={draggerPosition.x}
          cy={draggerPosition.y}
          fill={color}
          r={5}
        />

        {this.props.showLine ? (
          <line
            stroke={color}
            strokeWidth="1"
            x1={x}
            x2={draggerPosition.x}
            y1={y}
            y2={draggerPosition.y}
          />
        ) : null}

        {this.props.showArc ? (
          <path
            d={circularArc(x, y, minAngle, maxAngle, r)}
            fill="transparent"
            stroke={color}
          />
        ) : null}
      </svg>
    );
  }
}

DraggableArc.propTypes = {
  color: PropTypes.string,
  maxAngle: PropTypes.number,
  minAngle: PropTypes.number,
  r: PropTypes.number,
  showArc: PropTypes.bool,
  showLine: PropTypes.bool,
};

DraggableArc.defaultProps = {
  color: "#555",
  maxAngle: 360,
  minAngle: 180,
  r: 100,
  showArc: true,
  showLine: true,
};
