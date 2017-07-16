import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const SquareSVG = styled.svg`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
`;

const ClickableCircle = styled.circle`
  cursor: pointer;
`;

const PartialFillDef = ({ id, color, proportion, fuzziness, isPressed }) => {
  const centerColor = isPressed ? darken(0.1, color) : color;
  const percent = Math.round(proportion*100);
  return (
    <defs>
      <radialGradient id={id}>
        <stop
          offset="0%"
          stopColor={centerColor}
        />
        <stop
          offset={`${percent - fuzziness}%`}
          stopColor={centerColor}
        />
        <stop
          offset={`${percent + fuzziness}%`}
          stopColor={transparentize(1, centerColor)}
        />
        <stop
          offset="100%"
          stopColor={transparentize(1, centerColor)}
        />
      </radialGradient>
    </defs>
  );
};

PartialFillDef.propTypes = {
  color: PropTypes.string.isRequired,
  fuzziness: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isPressed: PropTypes.bool.isRequired,
  proportion: PropTypes.number.isRequired,
};

export const CircularHandle = ({ color, fuzziness, isPressed, trueRadius, visibleRadius, cx, cy, onMouseDown, onTouchStart }) => (
  <g>
    <PartialFillDef
      color={color}
      fuzziness={5}
      id='partialRadialFill'
      isPressed={isPressed}
      proportion={visibleRadius/trueRadius}
    />
    <ClickableCircle
      cx={cx}
      cy={cy}
      fill="url(#partialRadialFill)"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      r={trueRadius}
    />
  </g>
);

CircularHandle.propTypes = {
  color: PropTypes.string.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  fuzziness: PropTypes.number.isRequired,
  isPressed: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  trueRadius: PropTypes.number.isRequired,
  visibleRadius: PropTypes.number.isRequired,
};

CircularHandle.defaultProps = {
  color: 'darkseagreen',
  cx: 0,
  cy: 0,
  fuzziness: 5,
  isPressed: false,
  onMouseDown: () => {},
  onTouchStart: () => {},
  trueRadius: 20,
  visibleRadius: 8,
};
