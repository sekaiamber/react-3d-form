import React from 'react';
import Box from '../lib/utils/box';
import {
  Progress,
  Slider,
} from '../lib';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processValue: 0,
      sliderValue: [1, 5],
    };
  }
  handleProcessChange() {
    const processValue = this.state.processValue === 90 ? 0 : 90;
    this.setState({
      processValue,
    });
  }
  handleSliderChange(sliderValue) {
    this.setState({
      sliderValue,
    });
  }
  render() {
    return (
      <div>
        <Box />
        <Progress width={300} value={this.state.processValue} />
        <button onClick={this.handleProcessChange.bind(this)} >Change</button>
        <Slider range width={300} height={30} thickness={40} max={42} value={this.state.sliderValue} onChange={this.handleSliderChange.bind(this)} />
      </div>
    );
  }
}
