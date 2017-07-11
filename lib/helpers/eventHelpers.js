export const pauseEvent = e => {
  e.stopPropagation();
  e.preventDefault();
};

export const absTouchPos = e => ({
  x: e.touches[0].pageX - (window.scrollX || window.pageXOffset),
  y: e.touches[0].pageY - (window.scrollY || window.pageYOffset),
});

export const absMousePos = e => ({
  x: e.pageX - (window.scrollX || window.pageXOffset),
  y: e.pageY - (window.scrollY || window.pageYOffset),
});
