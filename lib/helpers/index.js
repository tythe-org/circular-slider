export const polarToCartesian = (centerX, centerY, radius, degrees) => {
  const radians = degrees * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(radians)),
    y: centerY + (radius * Math.sin(radians)),
  };
};

export const circularArc = (centerX, centerY, minAngle, maxAngle, r) => {
  var start = polarToCartesian(centerX, centerY, r, maxAngle);
  var end = polarToCartesian(centerX, centerY, r, minAngle);
  const largeArcFlag = maxAngle - minAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};
