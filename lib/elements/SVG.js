import styled from 'styled-components';

export const SquareSVG = styled.svg`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
`;

export const ClickableCircle = styled.circle`
  cursor: pointer;
`;
