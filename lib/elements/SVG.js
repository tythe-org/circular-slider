import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';

export const SquareSVG = styled.svg`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
`;

export const ClickableCircle = styled.circle`
  cursor: pointer;
`;

export const PartialFillDef = ({ id, centerColor, isPressed }) => (
  <defs>
    <radialGradient id={id}>
      <stop
        offset="0%"
        stopColor={isPressed ? darken(0.2, centerColor) : centerColor}
      />
      <stop
        offset="30%"
        stopColor={isPressed ? darken(0.2, centerColor) : centerColor}
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
);

PartialFillDef.propTypes = {
  centerColor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isPressed: PropTypes.bool.isRequired,
};
