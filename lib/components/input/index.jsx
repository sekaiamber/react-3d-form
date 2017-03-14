import React from 'react';
import classnames from 'classnames';
import { unit, unitCompute, getAllReactEvent } from '../../utils';
import { defaultProps } from '../../utils/box';
import boxWrapper from '../../utils/boxWrapper';
import './input.scss';

@boxWrapper
export default class Input extends React.Component {
  getStyles() {
    const styles = { ...this.props.styles };

    let { width, height } = this.props;
    height = unit(height);
    width = unit(width);
    const halfHeight = unitCompute(height, v => v / 2);
    // input
    const input = {};
    input.transform = `translateZ(${halfHeight}) rotateX(-90deg)`;
    input.height = height;
    input.width = width;
    return { ...styles, input };
  }

  handleClick() {
    this.input.focus();
  }

  render() {
    const styles = this.getStyles();
    const barCls = classnames('bar', { [this.props.skin]: true });
    const props = this.props;
    let inputProps = getAllReactEvent(props);
    inputProps = {
      ...inputProps,
      value: props.value,
      defaultValue: props.defaultValue,
      id: props.id,
    };
    return (
      <div className={barCls} style={styles.bar}>
        <div className="bar-face roof percentage" style={styles.roof} onClick={this.handleClick.bind(this)} />
        <div className="bar-face back percentage" style={styles.back} />
        <div className="bar-face front percentage" style={styles.front} onClick={this.handleClick.bind(this)} />
        <div className="bar-face left" style={styles.left} />
        <div className="bar-face right" style={styles.right} />
        <div className="bar-face floor percentage" style={styles.floor} />
        <div className="input-container" style={styles.input} >
          <input type="text" ref={c => this.input = c} {...inputProps} />
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  ...defaultProps,
  value: undefined,
  defaultValue: undefined,
  id: undefined,
  addonBefore: undefined,
  addonAfter: undefined,
  prefix: undefined,
  suffix: undefined,
};
