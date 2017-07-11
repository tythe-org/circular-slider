import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pauseEvent, absTouchPos, absMousePos } from './helpers/eventHelpers';

export class Dragger extends Component {
  state = {
    pressed: false,
  }
  moveListenerArgs = isTouch => ([
    isTouch ? 'touchmove' : 'mousemove',
    isTouch ? this.handleTouchMove : this.handleMouseMove,
    { passive : false },
  ])
  endListenerArgs = isTouch => ([
    isTouch ? 'touchend' : 'mouseup',
    isTouch ? this.handleTouchEnd : this.handleMouseUp,
    { passive : false },
  ])
  addEventListeners = isTouch => {
    this.setState({ pressed: true });
    document.addEventListener(...this.moveListenerArgs(isTouch));
    document.addEventListener(...this.endListenerArgs(isTouch));
  }
  removeEventListeners = isTouch => {
    this.setState({ pressed: false });  
    document.removeEventListener(...this.moveListenerArgs(isTouch));
    document.removeEventListener(...this.endListenerArgs(isTouch));
  }
  handleMouseDown = e => {
    pauseEvent(e);
    this.addEventListeners(false);
  }
  handleTouchStart = e => {
    pauseEvent(e);
    this.addEventListeners(true);
  }
  handleMouseUp = e => {
    pauseEvent(e);
    this.removeEventListeners(false);
  }
  handleTouchEnd = e => {
    pauseEvent(e);
    this.removeEventListeners(true);
  }
  handleMouseMove = e => {
    pauseEvent(e);
    const radialPos = this.calcRadialPos(absMousePos(e));
    this.props.onMove(radialPos);
  }
  handleTouchMove = e => {
    pauseEvent(e);
    const radialPos = this.calcRadialPos(absTouchPos(e));
    this.props.onMove(radialPos);
  }
  calcRadialPos = ({ x: pointerX, y: pointerY }) => {
    const { x: containerX, y: containerY } = this.props.absoluteContainerFunc();
    const { relCenterPos } = this.props;
    return {
      x: (pointerX - containerX - relCenterPos.x),
      y: -(pointerY - containerY - relCenterPos.y),
    };
  }
  render() {
    const { relCenterPos, radialPosition, radius } = this.props;
    const draggerColor = this.state.pressed ? "red" : this.props.color;
    return (
      <g>
        <defs>
          <radialGradient id="draggerGradient">
            <stop
              offset="0%"
              stopColor={draggerColor}
            />
            <stop
              offset="30%"
              stopColor={draggerColor}
            />
            <stop
              offset="40%"
              stopColor="transparent"
            />
            <stop
              offset="100%"
              stopColor="transparent"
            />
          </radialGradient>
        </defs>
        <circle
          cx={relCenterPos.x + radialPosition.x}
          cy={relCenterPos.y + radialPosition.y}
          fill="url(#draggerGradient)"
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          r={radius}
          style={{ cursor: 'pointer' }}
        />
      </g>
    );
  }
}

Dragger.propTypes = {
  absoluteContainerFunc: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  onMove: PropTypes.func.isRequired,
  radialPosition: PropTypes.object.isRequired,
  radius: PropTypes.number.isRequired,
  relCenterPos: PropTypes.object.isRequired,
};
