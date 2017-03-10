import React from 'react';
import classnames from 'classnames';

export default class SliderMark extends React.Component {
  render() {
    const clsnames = classnames('bar-mark', this.props.className);
    return (
      <div className={clsnames} style={this.props.style}>
        <div className="mark-border-container">
          <div className="mark-border roof" style={this.props.borderStyle.roof} onMouseDown={this.props.onMouseDown} />
          <div className="mark-border back" style={this.props.borderStyle.back} />
          <div className="mark-border front" style={this.props.borderStyle.front} onMouseDown={this.props.onMouseDown} />
          <div className="mark-border floor" style={this.props.borderStyle.floor} />
        </div>
      </div>
    );
  }
}
