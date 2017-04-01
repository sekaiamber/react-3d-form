import React from 'react';
import classnames from 'classnames';
import { defaultProps } from '../../utils/box';
import { getValue, NOOP, unit, unitCompute } from '../../utils';
import boxWrapper from '../../utils/boxWrapper';
import './radio.scss';

class RadioLabel extends React.Component {
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
    const { composedComponent } = this.props.dataMap;
    composedComponent.handleClick();
  }
  render() {
    const styles = this.getStyles();
    return (
      <div className="radio-label-factor" style={styles.label} onClick={this.handleClick.bind(this)}>
        <div className="radio-label">{this.props.children}</div>
      </div>
    );
  }
}

@boxWrapper({ addonAfter: [RadioLabel] })
export default class Radio extends React.Component {
  constructor(props) {
    super(props);
    const { checked, defaultChecked } = this.props;
    this.state = {
      checked: getValue(checked, defaultChecked, false),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { checked } = nextProps;
    this.setState({
      checked: getValue(checked, this.state.checked),
    });
  }
  getStyles() {
    const styles = { ...this.props.styles };
    return { ...styles };
  }
  handleClick() {
    const checked = !this.state.checked;
    this.setState({
      checked,
    });
    this.props.onChange(checked);
  }
  render() {
    const styles = this.getStyles();
    const cls = classnames('bar', { checked: this.state.checked });
    return (
      <div className={cls} style={styles.bar} onClick={this.handleClick.bind(this)}>&nbsp;
        <div className="bar-face roof surface" style={styles.roof} />
        <div className="bar-face back surface" style={styles.back} />
        <div className="bar-face front surface" style={styles.front} />
        <div className="bar-face left" style={styles.left} />
        <div className="bar-face right" style={styles.right} />
        <div className="bar-face floor surface" style={styles.floor} />
      </div>
    );
  }
}

Radio.defaultProps = {
  ...defaultProps,
  value: null,
  checked: null,
  defaultChecked: null,
  onChange: NOOP,
};
