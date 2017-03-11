import React from 'react';
import classnames from 'classnames';
import { getValue } from '../../utils';

export default class SliderMark extends React.Component {
  render() {
    const clsnames = classnames('bar-mark', this.props.className);
    const style = {
      ...this.props.style,
    };
    const value = getValue(this.props.value);
    if (value !== null) {
      style.left = `${value * 100}%`;
    }
    const tooltipStyle = this.props.tooltipStyle;
    let data = this.props.data || '';
    let dataStyle;
    if (this.props.data.label) {
      data = this.props.data.label;
    }
    if (this.props.data.style) {
      dataStyle = this.props.data.style;
    }
    return (
      <div className={clsnames} style={style}>
        <div className="mark-border-container">
          <div className="mark-border back" style={this.props.borderStyle.back} />
          <div className="mark-border floor" style={this.props.borderStyle.floor} />
          <div className="mark-border front" style={this.props.borderStyle.front} onMouseDown={this.props.onMouseDown} />
          <div className="mark-border roof" style={this.props.borderStyle.roof} onMouseDown={this.props.onMouseDown} />
          <div className="bar-tooltip" style={tooltipStyle}>
            <div className="bar-tooltip-container">
              <div className="bar-tooltip-text" style={dataStyle}>{data}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
