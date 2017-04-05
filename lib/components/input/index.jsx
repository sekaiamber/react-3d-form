import React from 'react';
import classnames from 'classnames';
import { unit, unitCompute, getAllReactEvent, NOOP } from '../../utils';
import { defaultProps } from '../../utils/box';
import boxWrapper from '../../utils/boxWrapper';
import './input.scss';

@boxWrapper
export default class Input extends React.Component {
  getStyles() {
    const styles = { ...this.props.styles };

    let { height, thickness } = this.props;
    height = unit(height);
    thickness = unit(thickness);
    const halfHeight = unitCompute(height, v => v / 2);
    const halfThickness = unitCompute(thickness, v => v / 2);
    // input
    const fixContainer = {};
    fixContainer.transform = `translateZ(${halfHeight}) rotateX(-90deg)`;
    fixContainer.height = height;
    const addonContentContainer = {};
    addonContentContainer.transform = `translateY(${halfThickness}) translateZ(${height}) rotateX(-90deg)`;
    addonContentContainer.height = height;
    return { ...styles, fixContainer, addonContentContainer };
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
      id: props.id,
      style: {
        ...props.inputStyle,
        ...styles.input,
      },
    };
    const fixCls = classnames('fix-container', { 'has-prefix': props.prefix, 'has-suffix': props.suffix });
    return (
      <div className={barCls} style={styles.bar}>
        <div className="bar-face back percentage" style={styles.back} />
        <div className="bar-face floor percentage" style={styles.floor} />
        <div className="bar-face left" style={styles.left} />
        <div className="bar-face right" style={styles.right} />
        <div className="bar-face roof percentage" style={styles.roof} onClick={this.handleClick.bind(this)} />
        <div className="bar-face front percentage" style={styles.front} onClick={this.handleClick.bind(this)} />
        <div className="addon-container">
          {props.addonBefore ? (
            <div className="addon-before">
              <div className="addon-face back" style={styles.back} />
              <div className="addon-face floor" style={styles.floor} />
              <div className="addon-content-container" style={styles.addonContentContainer}><div className="addon-content">{props.addonBefore}</div></div>
              <div className="addon-face front" style={styles.front} />
              <div className="addon-face roof" style={styles.roof} />
            </div>
          ) : null}
          <div className={fixCls} style={styles.fixContainer} >
            {props.prefix ? (
              <div className="prefix">{props.prefix}</div>
            ) : null}
            <div className="input-container">
              <input type="text" ref={c => this.input = c} {...inputProps} />
            </div>
            {props.suffix ? (
              <div className="suffix">{props.suffix}</div>
            ) : null}
          </div>
          {props.addonAfter ? (
            <div className="addon-after">
              <div className="addon-face back" style={styles.back} />
              <div className="addon-face floor" style={styles.floor} />
              <div className="addon-content-container" style={styles.addonContentContainer}><div className="addon-content">{props.addonAfter}</div></div>
              <div className="addon-face front" style={styles.front} />
              <div className="addon-face roof" style={styles.roof} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  ...defaultProps,
  value: undefined,
  defaultValue: '',
  onChange: NOOP,
  id: undefined,
  addonBefore: undefined,
  addonAfter: undefined,
  prefix: undefined,
  suffix: undefined,
  inputStyle: {},
};
