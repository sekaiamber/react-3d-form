import React from 'react';
import classnames from 'classnames';
import { defaultProps } from '../../utils/box';
import boxWrapper from '../../utils/boxWrapper';
import { NOOP, unit, addEventListener, getValue } from '../../utils';
import { getOffsetOfCurrentTarget, getNearestMark } from './utils';
import SliderMark from './mark';
import './slider.scss';

@boxWrapper
export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStart: false,
      activeEnd: false,
      value: getValue(props.value, props.defaultValue),
    };
    this.state = {
      ...this.state,
      ...this.processProps(props, this.state.value),
    };
    this.state = {
      ...this.state,
      ...this.buildMarks(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { step, min, max, value, dots, marks } = nextProps;
    const props = this.props;
    let nextState = {};
    // 如果在受控模式下
    if (value !== null) {
      nextState = {
        ...nextState,
        ...this.processProps(nextProps),
      };
    }
    // 如果需要重算marks
    if (
      step !== props.step ||
      min !== props.min ||
      max !== props.max
    ) {
      nextState = {
        ...nextState,
        ...this.buildMarks(nextProps),
      };
    }
    // 如果受控模式下`dots = true`时value不在mark上需重算value
    if (dots && Object.keys(marks).length && !this.isStateValueEqualTo(value)) {
      nextState = {
        ...nextState,
        ...this.computeValue(nextState.value, nextState.percentage),
      };
    }
    this.setState(nextState);
  }
  getMarkByPercentage = percentage => this.state.marks[this.state.percentageMarks.indexOf(percentage)]
  getPercentageByMark = mark => this.state.percentageMarks[this.state.marks.indexOf(mark)]
  /* eslint-disable */
  isStateValueEqualTo = compare => this.props.range ? compare[0] === this.state.value[0] && compare[1] === this.state.value[1] : compare === this.state.value;
  /* eslint-enable */

  getStyles() {
    const styles = { ...this.props.styles };
    const { percentage } = this.state;
    const { range } = this.props;
    let { height, thickness } = this.props;
    height = unit(height);
    thickness = unit(thickness);

    const barActive = {};
    const markBorder = {
      roof: {},
      back: {},
      front: {},
      floor: {},
    };
    const triggerTooltip = {};

    if (range) {
      // barActive
      barActive.width = `${(percentage[1] * 100) - (percentage[0] * 100)}%`;
      barActive.marginLeft = `${percentage[0] * 100}%`;
    } else {
      // barActive
      barActive.width = `${percentage * 100}%`;
    }

    // mark border
    // height
    markBorder.roof.transform = `translateZ(${height})`;
    markBorder.front.height = height;
    markBorder.back.height = height;
    // thickness
    markBorder.roof.height = thickness;
    markBorder.floor.height = thickness;
    markBorder.back.transform = `rotateX(-90deg) rotateY(0deg) translateZ(-${thickness})`;
    // trigger tooltip
    triggerTooltip.transform = `translateZ(${height}) translateY(-${thickness}) rotateX(-90deg)`;

    return { ...styles, barActive, markBorder, triggerTooltip };
  }

  processProps(props, useValue) {
    const { value, min, max, range } = props;
    // 设置state.value
    const stateValue = getValue(value, useValue, this.state.value);
    // 计算value
    let percentage;
    const diff = max - min;
    if (range) {
      stateValue.sort((a, b) => a - b);
      percentage = [
        (stateValue[0] - min) / diff,
        (stateValue[1] - min) / diff,
      ];
    } else {
      percentage = (stateValue - min) / diff;
    }

    return { percentage, value: stateValue };
  }

  buildMarks(props) {
    const { step, min, max, dots } = props;
    const diff = max - min;
    const allStep = diff / step;
    // 建立所有marks
    const marks = [0];
    for (let i = 1; i < allStep + 1; i += 1) {
      marks.push(i * step);
    }
    const percentageMarks = marks.map(m => (m - min) / diff);
    // 设置dots
    // 设置state.value
    const stateValue = this.state.value;
    const percentage = this.state.percentage;
    let newState = { marks, percentageMarks };
    if (dots && Object.keys(this.props.marks).length) {
      // 重建marks
      const dotMarks = [];
      const dotPercentageMarks = [];
      const keys = Object.keys(this.props.marks).map(k => parseFloat(k));
      for (let i = 0; i < keys.length; i += 1) {
        const dotMark = keys[i];
        const dotPercentageMark = percentageMarks[marks.indexOf(dotMark)];
        if (dotMark !== undefined && dotPercentageMark !== undefined) {
          dotMarks.push(dotMark);
          dotPercentageMarks.push(dotPercentageMark);
        }
      }
      // 重算value
      const newValueState = this.computeValue(stateValue, percentage, dotMarks, dotPercentageMarks);
      newState = {
        ...newValueState,
        marks: dotMarks,
        percentageMarks: dotPercentageMarks,
      };
    }

    return newState;
  }

  computeValue(useValue = this.state.value, usePercentage = this.state.percentage, useMarks = this.state.marks, usePercentageMarks = this.state.percentageMarks) {
    const { range } = this.props;
    let percentage;
    let value;
    if (range) {
      percentage = useValue.map((v, i) => getNearestMark(usePercentage[i], usePercentageMarks));
      value = percentage.map(v => useMarks[usePercentageMarks.indexOf(v)]);
    } else {
      percentage = getNearestMark(usePercentage, usePercentageMarks);
      value = useMarks[usePercentageMarks.indexOf(percentage)];
    }
    return { value, percentage };
  }

  handleMouseUp(e) {
    const offset = getOffsetOfCurrentTarget(e.nativeEvent, e.target, e.currentTarget);
    const nearestPercentageMark = getNearestMark(offset.x / e.currentTarget.offsetWidth, this.state.percentageMarks);
    const nearestMark = this.getMarkByPercentage(nearestPercentageMark);
    let value;
    if (this.props.range) {
      value = [this.state.value[0], this.state.value[1]];
      if (nearestMark <= value[0]) {
        value[0] = nearestMark;
      } else if (nearestMark >= value[1]) {
        value[1] = nearestMark;
      } else if ((nearestMark - value[0]) * 2 <= value[1] - value[0]) {
        value[0] = nearestMark;
      } else {
        value[1] = nearestMark;
      }
    } else {
      value = nearestMark;
    }
    this.props.onChange(value);
    this.props.onAfterChange(value);
    this.setState(this.processProps(this.props, value));
  }
  handleMouseDown(trigger, e) {
    e.preventDefault();
    // lock another trigger value
    let startValue;
    let lockValue;
    if (this.props.range) {
      if (trigger === 'start') {
        startValue = this.state.value[0];
        lockValue = this.state.value[1];
      } else {
        startValue = this.state.value[1];
        lockValue = this.state.value[0];
      }
    } else {
      startValue = this.state.value;
    }
    this.addDocumentMouseEvents({
      x: e.pageX,
      y: e.pageY,
    }, startValue, lockValue);
  }
  handleMouseMove(startPosition, startValue, lockValue, e) {
    const dPosition = {
      x: e.pageX - startPosition.x,
      y: e.pageY - startPosition.y,
    };
    const startPercentageValue = this.getPercentageByMark(startValue);
    const changePercentageValue = startPercentageValue + (dPosition.x / this.bar.offsetWidth);
    const nearestPercentageMark = getNearestMark(changePercentageValue, this.state.percentageMarks);
    const nearestMark = this.getMarkByPercentage(nearestPercentageMark);
    let value;
    let activeStart = false;
    let activeEnd = false;
    if (this.props.range) {
      value = lockValue < nearestMark ? [lockValue, nearestMark] : [nearestMark, lockValue];
      if (value[0] === lockValue) {
        activeEnd = true;
      } else {
        activeStart = true;
      }
    } else {
      value = nearestMark;
      activeEnd = true;
    }

    this.props.onChange(value);
    this.setState({
      activeStart,
      activeEnd,
      ...this.processProps(this.props, value),
    });
  }
  handleMouseMoveEnd() {
    this.setState({
      activeStart: false,
      activeEnd: false,
    });
    this.removeDocumentEvents();
  }

  addDocumentMouseEvents(startPosition, startValue, lockValue) {
    this.onMouseMoveListener = addEventListener(document, 'mousemove', this.handleMouseMove.bind(this, startPosition, startValue, lockValue));
    this.onMouseUpListener = addEventListener(document, 'mouseup', this.handleMouseMoveEnd.bind(this, startPosition, startValue, lockValue));
  }

  removeDocumentEvents() {
    /* eslint-disable no-unused-expressions */
    this.onMouseMoveListener && this.onMouseMoveListener.remove();
    this.onMouseUpListener && this.onMouseUpListener.remove();
    /* eslint-enable no-unused-expressions */
  }

  render() {
    const styles = this.getStyles();
    const { value, activeStart, activeEnd, hoverStart, hoverEnd } = this.state;
    const { range, tipFormatter, marks } = this.props;
    const barCls = classnames('bar', { 'hover-start': hoverStart, 'hover-end': hoverEnd });
    return (
      <div className={barCls} style={styles.bar} ref={c => this.bar = c}>
        <div className="bar-face roof" style={styles.roof} onMouseUp={this.handleMouseUp.bind(this)}>
          <div className="bar-active" style={styles.barActive} />
        </div>
        <div className="bar-face back" style={styles.back} >
          <div className="bar-active" style={styles.barActive} />
        </div>
        <div className="bar-face front" style={styles.front} onMouseUp={this.handleMouseUp.bind(this)}>
          <div className="bar-active" style={styles.barActive} />
        </div>
        <div className="bar-face left" style={styles.left} />
        <div className="bar-face right" style={styles.right} />
        <div className="bar-face floor" style={styles.floor} >
          <div className="bar-active" style={styles.barActive} />
        </div>
        {/* marks */}
        <div className="bar-marks">
          {Object.keys(marks).map((key, i) => {
            const markvalue = this.getPercentageByMark(parseFloat(key));
            return markvalue !== undefined ? (
              <SliderMark key={i} value={markvalue} borderStyle={styles.markBorder} data={marks[key]} />
            ) : null;
          })}
          {/* triggers */}
          {range ? (
            <SliderMark
              className={classnames('trigger-start trigger', { active: activeStart })}
              value={this.getPercentageByMark(value[0])}
              data={tipFormatter(value[0])}
              borderStyle={styles.markBorder}
              tooltipStyle={styles.triggerTooltip}
              onMouseDown={this.handleMouseDown.bind(this, 'start')}
            />
          ) : null}
          <SliderMark
            className={classnames('trigger-end trigger', { active: activeEnd })}
            value={this.getPercentageByMark(range ? value[1] : value)}
            data={tipFormatter(range ? value[1] : value)}
            borderStyle={styles.markBorder}
            tooltipStyle={styles.triggerTooltip}
            onMouseDown={this.handleMouseDown.bind(this, 'end')}
          />
        </div>
      </div>
    );
  }
}

Slider.defaultProps = {
  ...defaultProps,
  range: false,  // 双滑块模式
  min: 0,
  max: 100,
  step: 1,
  marks: {}, // 刻度
  dots: false, // 是否只能移动到刻度上
  value: undefined,
  /* eslint-disable */
  defaultValue: props => props.range ? [0, 0] : 0,
  /* eslint-enable */
  onChange: NOOP,
  onAfterChange: NOOP,
  tipFormatter: value => `${value}`,
};


// mark example:
// marks = {
//   0: '0°C',
//   15: '15°C',
//   43: '43°C',
//   100: {
//     style: { ... },
//     label: <strong>100°C</strong>,
//   },
// }
