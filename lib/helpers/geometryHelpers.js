export const polarToCartesian = (offsetX, offsetY, radius, degrees) => {
  const radians = degrees * Math.PI / 180.0;
  return {
    x: offsetX + (radius * Math.cos(radians)),
    y: offsetY + (radius * Math.sin(radians)),
  };
};

export const calcAngleDiff = (x1, y1, x2, y2) => {
  return Math.atan2(
    x1*y2 - y1*x2,
    x1*x2 + y1*y2
  ) * 180 / Math.PI;
};

export const circularArc = (centerX, centerY, minAngle, maxAngle, r) => {
  var start = polarToCartesian(centerX, centerY, r, maxAngle);
  var end = polarToCartesian(centerX, centerY, r, minAngle);
  const largeArcFlag = maxAngle - minAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};
