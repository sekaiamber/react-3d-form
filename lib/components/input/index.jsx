import React from 'react';
import classnames from 'classnames';
import { NOOP, unit, unitCompute } from '../../utils';
import Box, { defaultProps } from '../../utils/box';
import './input.scss';

export default class Progress extends Box {

  handleClick() {
    this.input.focus();
  }

  getStyles() {
    const styles = super.getStyles();

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

  render() {
    const styles = this.getStyles();
    const barCls = classnames('bar', { [this.props.skin]: true });
    return (
      <div className="react-3d-form-factor">
        <div className="react-3d-form react-3d-form-input">
          <div className={barCls} style={styles.bar}>
            <div className="bar-face roof percentage" style={styles.roof} onClick={this.handleClick.bind(this)} />
            <div className="bar-face back percentage" style={styles.back} />
            <div className="bar-face front percentage" style={styles.front} onClick={this.handleClick.bind(this)} />
            <div className="bar-face left" style={styles.left} />
            <div className="bar-face right" style={styles.right} />
            <div className="bar-face floor percentage" style={styles.floor} />
            <div className="input-container" style={styles.input} >
              <input type="text" ref={c => this.input = c} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Progress.defaultProps = {
  ...defaultProps,
  value: 0,
  onChange: NOOP,
};
