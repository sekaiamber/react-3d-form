import React from 'react';
import { defaultProps } from '../../utils/box';
import boxWrapper from '../../utils/boxWrapper';
import './progress.scss';

@boxWrapper
export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    const { value, min, max } = this.props;
    this.state = {
      percentage: Math.round(((value - min) / (max - min)) * 100),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { value, min, max } = nextProps;
    const percentage = Math.round(((value - min) / (max - min)) * 100);
    this.setState({
      percentage,
    });
  }

  getStyles() {
    const styles = { ...this.props.styles };
    const tooltip = {};

    const { percentage } = this.state;
    // tooltip
    tooltip.width = `${percentage}%`;

    return { ...styles, tooltip };
  }
  render() {
    const styles = this.getStyles();
    return (
      <div className="bar" style={styles.bar} aria-valuenow={this.state.percentage}>
        <div className="bar-tooltip" style={styles.tooltip}>
          <div className="bar-tooltip-container">
            <div className="bar-tooltip-text">{this.props.format(this.state.percentage)}</div>
          </div>
        </div>
        <div className="bar-face roof percentage" style={styles.roof} />
        <div className="bar-face back percentage" style={styles.back} />
        <div className="bar-face front percentage" style={styles.front} />
        <div className="bar-face left" style={styles.left} />
        <div className="bar-face right" style={styles.right} />
        <div className="bar-face floor percentage" style={styles.floor} />
      </div>
    );
  }
}

Progress.defaultProps = {
  ...defaultProps,
  value: undefined,
  defaultValue: 0,
  min: 0,
  max: 100,
  format: percentage => `${percentage}%`,
};
