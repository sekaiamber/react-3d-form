import React from 'react';
import classnames from 'classnames';
import { NOOP, unit, unitCompute } from '../../utils';
import './radioButton.scss';

export default class RadioButton extends React.Component {
  getStyles() {
    const styles = { ...this.props.styles };
    styles.bar.width = 'auto';
    let { height, thickness } = this.props;
    height = unit(height);
    thickness = unit(thickness);
    const halfThickness = unitCompute(thickness, v => v / 2);

    const label = {
      height: styles.bar.height,
      lineHeight: styles.bar.height,
      transform: `translateY(${halfThickness}) translateZ(${height}) rotateX(-90deg)`,
    };
    return { ...styles, label };
  }
  handleClick() {
    this.props.onChange(this.props.value);
  }
  render() {
    const styles = this.getStyles();
    const cls = classnames('bar', 'react-3d-form-radiobutton', { checked: this.props.checked });
    return (
      <div className={cls} style={styles.bar} onClick={this.handleClick.bind(this)}>
        <div className="bar-face floor surface" style={styles.floor} />
        <div className="bar-face back surface" style={styles.back} />
        <div className="radio-label" style={styles.label}>{this.props.children}</div>
        <div className="bar-face left" style={styles.left} />
        <div className="bar-face right" style={styles.right} />
        <div className="bar-face roof surface" style={styles.roof} />
        <div className="bar-face front surface" style={styles.front} />
      </div>
    );
  }
}

RadioButton.defaultProps = {
  checked: false,
  value: undefined,
  onChange: NOOP,
};
