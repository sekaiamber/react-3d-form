import React from 'react';
import classnames from 'classnames';
import Box, { defaultProps } from '../../utils/box';
import './progress.scss';

export default class Progress extends Box {
  constructor(props) {
    super(props);
    const { value, minValue, maxValue } = this.props;
    this.state = {
      percentage: Math.round(((value - minValue) / (maxValue - minValue)) * 100),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { value, minValue, maxValue } = nextProps;
    const percentage = Math.round(((value - minValue) / (maxValue - minValue)) * 100);
    this.setState({
      percentage,
    });
  }

  getStyles() {
    const styles = super.getStyles();
    const tooltip = {};

    const { percentage } = this.state;
    // tooltip
    tooltip.width = `${percentage}%`;

    return { ...styles, tooltip };
  }
  render() {
    const styles = this.getStyles();
    const barCls = classnames('bar', { [this.props.skin]: true });
    return (
      <div className="react-3d-form-factor">
        <div className="react-3d-form react-3d-form-progress">
          <div className={barCls} style={styles.bar} aria-valuenow={this.state.percentage}>
            <div className="bar-tooltip" style={styles.tooltip}>
              <div className="bar-tooltip-container">
                <div className="bar-tooltip-text">{this.state.percentage}%</div>
              </div>
            </div>
            <div className="bar-face roof percentage" style={styles.roof} />
            <div className="bar-face back percentage" style={styles.back} />
            <div className="bar-face front percentage" style={styles.front} />
            <div className="bar-face left" style={styles.left} />
            <div className="bar-face right" style={styles.right} />
            <div className="bar-face floor percentage" style={styles.floor} />
          </div>
        </div>
      </div>
    );
  }
}

Progress.defaultProps = {
  ...defaultProps,
  value: 0,
  minValue: 0,
  maxValue: 100,
};
