import React from 'react';
import Box from '../lib/utils/box';
import {
  Progress,
  Slider,
} from '../lib';

const sliderMarks = {
  11: '11°C',
  23: <strong>23°C</strong>,
  36: {
    style: { color: 'red' },
    label: <strong>36°C</strong>,
  },
};

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processValue: 0,
      sliderValue: [1, 28],
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
        <Slider range dots width={300} max={42} value={this.state.sliderValue} onChange={this.handleSliderChange.bind(this)} marks={sliderMarks} tipFormatter={value => `${value}°C`} />
      </div>
    );
  }
}
