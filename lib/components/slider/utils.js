/* eslint no-param-reassign: 0 */
function getOffsetOfCurrentTarget(event, target, currentTarget) {
  let { offsetX, offsetY } = event;
  while (target !== currentTarget) {
    offsetX += target.offsetLeft;
    offsetY += target.offsetTop;
    target = target.parentNode;
  }
  return {
    x: offsetX,
    y: offsetY,
  };
}

function getNearestMark(percentage, marks) {
  if (percentage <= marks[0]) return marks[0];
  if (percentage >= marks[marks.length - 1]) return marks[marks.length - 1];
  // TODO: 可以优化，二分查找
  for (let i = 1; i < marks.length; i += 1) {
    const prev = marks[i - 1];
    const next = marks[i];
    if (percentage >= prev && percentage <= next) {
      if (prev === percentage) return prev;
      if (next === percentage) return next;
      return (percentage - prev) * 2 <= next - prev ? prev : next;
    }
  }
  return marks[marks.length - 1];
}

export {
  getOffsetOfCurrentTarget,
  getNearestMark,
};
