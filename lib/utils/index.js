import addDOMEventListener from 'add-dom-event-listener';
import ReactDOM from 'react-dom';

const NOOP = () => {};

function unit(number, defaultUnit = 'px') {
  return typeof number === 'number' ? number + defaultUnit : number;
}

function unitCompute(value, computer) {
  const number = parseFloat(value);
  return computer(number) + value.split(number.toString())[1];
}

function addEventListener(target, eventType, cb) {
  /* eslint camelcase: 2 */
  const callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
    ReactDOM.unstable_batchedUpdates(cb, e);
  } : cb;
  return addDOMEventListener(target, eventType, callback);
}

function getValue(...values) {
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (value !== null && value !== undefined) {
      return value;
    }
  }
  return null;
}

export {
  NOOP,
  unit,
  unitCompute,
  addEventListener,
  getValue,
};
