import React from 'react';
import classnames from 'classnames';
import Box, { defaultProps } from '../../utils/box';
import { NOOP, unit } from '../../utils';
import { getOffsetOfCurrentTarget, getNearestMark, addEventListener, getValue } from './utils';
import SliderMark from './mark';
import './slider.scss';

export default class Slider extends Box {
  constructor(props) {
    super(props);
    this.state = {
      hoverStart: false,
      hoverEnd: false,
      value: props.value || (props.range ? [0, 0] : 0),
    };
    this.state = {
      ...this.state,
      ...this.buildMarks(props),
      ...this.processProps(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { step, min, max, value } = nextProps;
    const props = this.props;
    let nextState = {};
    // 如果需要重算marks
    if (
      step !== props.step ||
      min !== props.min ||
      max !== props.max
    ) {
      nextState = this.buildMarks(nextProps);
    }
    // 如果在受控模式下
    if (value !== null) {
      this.setState({
        ...nextState,
        ...this.processProps(nextProps),
      });
    }
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
    const { step, min, max } = props;
    const diff = max - min;
    const allStep = diff / step;
    // 建立所有marks
    const marks = [0];
    for (let i = 1; i < allStep + 1; i += 1) {
      marks.push(i * step);
    }
    const percentageMarks = marks.map(m => (m - min) / diff);

    return { marks, percentageMarks };
  }

  handleMouseUp(e) {
    const offset = getOffsetOfCurrentTarget(e.nativeEvent, e.target, e.currentTarget);
    const nearestPercentageMark = getNearestMark(offset.x / e.currentTarget.offsetWidth, this.state.percentageMarks);
    const nearestMark = this.state.marks[this.state.percentageMarks.indexOf(nearestPercentageMark)];
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
    const startPercentageValue = this.state.percentageMarks[this.state.marks.indexOf(startValue)];
    const changePercentageValue = startPercentageValue + (dPosition.x / this.bar.offsetWidth);
    const nearestPercentageMark = getNearestMark(changePercentageValue, this.state.percentageMarks);
    const nearestMark = this.state.marks[this.state.percentageMarks.indexOf(nearestPercentageMark)];
    let value;
    if (this.props.range) {
      value = lockValue < nearestMark ? [lockValue, nearestMark] : [nearestMark, lockValue];
    } else {
      value = nearestMark;
    }

    this.props.onChange(value);
    this.setState(this.processProps(this.props, value));
  }
  handleMouseMoveEnd() {
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

  getStyles() {
    const styles = super.getStyles();
    const barActive = {};
    const triggerStart = {};
    const triggerEnd = {};
    const markBorder = {
      roof: {},
      back: {},
      front: {},
      floor: {},
    };

    const { percentage } = this.state;
    const { range } = this.props;
    let { height, thickness } = this.props;
    height = unit(height);
    thickness = unit(thickness);

    if (range) {
      // barActive
      barActive.width = `${(percentage[1] * 100) - (percentage[0] * 100)}%`;
      barActive.marginLeft = `${percentage[0] * 100}%`;

      // trigger
      triggerStart.left = `${percentage[0] * 100}%`;
      triggerEnd.left = `${percentage[1] * 100}%`;
    } else {
      // barActive
      barActive.width = `${percentage * 100}%`;

      // trigger
      triggerEnd.left = `${percentage * 100}%`;
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

    return { ...styles, barActive, triggerStart, triggerEnd, markBorder };
  }

  render() {
    const styles = this.getStyles();
    const barCls = classnames('bar', { [this.props.skin]: true, 'hover-start': this.state.hoverStart, 'hover-end': this.state.hoverEnd });
    return (
      <div className="react-3d-form-factor">
        <div className="react-3d-form react-3d-form-slider">
          <div className={barCls} style={styles.bar} ref={c => this.bar = c}>
            <div className="bar-tooltip" style={styles.tooltip}>
              <div className="bar-tooltip-container">
                <div className="bar-tooltip-text">{this.props.tipFormatter(this.state.value)}</div>
              </div>
            </div>
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
              {this.props.range ? (
                <SliderMark className="trigger-start" style={styles.triggerStart} borderStyle={styles.markBorder} onMouseDown={this.handleMouseDown.bind(this, 'start')} />
              ) : null}
              <SliderMark className="trigger-end" style={styles.triggerEnd} borderStyle={styles.markBorder} onMouseDown={this.handleMouseDown.bind(this, 'end')} />
            </div>
          </div>
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
  marks: [], // 刻度
  dots: false, // 是否只能移动到刻度上
  value: null,
  defaultValue: 0,
  onChange: NOOP,
  onAfterChange: NOOP,
  tipFormatter: value => `${value}`,
};
