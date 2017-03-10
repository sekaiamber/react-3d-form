const NOOP = () => {};

function unit(number, defaultUnit = 'px') {
  return typeof number === 'number' ? number + defaultUnit : number;
}

function unitCompute(value, computer) {
  const number = parseFloat(value);
  return computer(number) + value.split(number.toString())[1];
}

export {
  NOOP,
  unit,
  unitCompute,
};
