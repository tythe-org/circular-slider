/**
 * typescript definition
 * @author Benjamin Piouffle
 */

import * as React from 'react';

export declare class CircularSlider extends React.Component<CircularSliderProps, any> {}

export interface CircularSliderProps {
  readonly angle?: number,
  readonly arcEnd?: number,
  readonly arcStart?: number,
  readonly color?: string,
  readonly onMove?: (angle: number) => void,
  readonly r?: number,
  readonly showArc?: boolean,
  readonly showNeedle?: boolean,
}
