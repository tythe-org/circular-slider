import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pauseEvent, absTouchPos, absMousePos } from '../helpers/eventHelpers';
import { CircularHandle } from '../elements/SVG';

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
    const { relCenterPos, radialPosition, trueRadius, visibleRadius, color } = this.props;
    return (
      <CircularHandle
        color={color}
        cx={relCenterPos.x + radialPosition.x}
        cy={relCenterPos.y + radialPosition.y}
        isPressed={this.state.pressed}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        trueRadius={trueRadius}
        visibleRadius={visibleRadius}
      />
    );
  }
}

Dragger.propTypes = {
  absoluteContainerFunc: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  onMove: PropTypes.func.isRequired,
  radialPosition: PropTypes.object.isRequired,
  relCenterPos: PropTypes.object.isRequired,
  trueRadius: PropTypes.number.isRequired,
  visibleRadius: PropTypes.number.isRequired,
};
