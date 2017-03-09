import React from 'react';
import Box from '../lib/utils/box';
import {
  Progress,
} from '../lib';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processValue: 0,
    };
  }
  handleProcessChange() {
    const processValue = this.state.processValue === 90 ? 0 : 90;
    this.setState({
      processValue,
    });
  }
  render() {
    return (
      <div>
        <Box />
        <Progress width={300} value={this.state.processValue} />
        <button onClick={this.handleProcessChange.bind(this)} >Change</button>
      </div>
    );
  }
}
