import React from 'react';
import classnames from 'classnames';
import { NOOP, unit, unitCompute } from '../../utils';
import './radio.scss';

export default class Radio extends React.Component {
  getStyles() {
    const styles = { ...this.props.styles };

    let { height } = this.props;
    height = unit(height);
    const halfHeight = unitCompute(height, v => v / 2);

    const label = {
      height: styles.bar.height,
      transform: styles.bar.transform + ` translateZ(${halfHeight})`,
    };
    return { ...styles, label };
  }
  handleClick() {
    this.props.onChange(this.props.value);
  }
  render() {
    const styles = this.getStyles();
    const cls = classnames('bar', { checked: this.props.checked });
    return (
      <div className="react-3d-form-radio" onClick={this.handleClick.bind(this)}>
        <div className={cls} style={styles.bar}>&nbsp;
          <div className="bar-face roof surface" style={styles.roof} />
          <div className="bar-face back surface" style={styles.back} />
          <div className="bar-face front surface" style={styles.front} />
          <div className="bar-face left" style={styles.left} />
          <div className="bar-face right" style={styles.right} />
          <div className="bar-face floor surface" style={styles.floor} />
        </div>
        <div className="radio-label-factor" style={styles.label}>
          <div className="radio-label">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Radio.defaultProps = {
  checked: false,
  value: undefined,
  onChange: NOOP,
};
