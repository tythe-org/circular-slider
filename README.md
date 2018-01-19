# circular-slider
React component to drag a point along a circular path

<img src="https://user-images.githubusercontent.com/5648607/28548067-db607404-70c9-11e7-86af-bafee16cc0c6.gif" />

## Installation

```shell
npm install circular-slider --save
```

## Example

```jsx
import React from 'react';
import { CircularSlider } from 'circular-slider';

class MyFancyGauge extends React.Component {
  state = {
    angle: 0
  }
  render() {
    return (
      <CircularSlider
        angle={this.state.angle}
        onMove={angle => this.setState({ angle })}
      />
    );
  }
}
```

## Options

Prop | Type | Default | Description
---- | ---- | ------- | -----------
angle | Number | 200 | Current angle of handle
arcEnd | Number | 360 | Angle of end of optional arc
arcStart | Number | 180 | Angle of start of optional arc
color | String | darkseagreen | Color of handle (and optional needle & arc)
onMove | Function | () => {} | Handler function (takes new angle as sole argument)
r | Number | 100 | Radius of the path the slider follows
showArc | Boolean | false | Renders a circular arc
showNeedle | Boolean | true | Renders a line from center to handle

**_Note:_** Angles are measured in degrees, clockwise from the positive x-axis.
