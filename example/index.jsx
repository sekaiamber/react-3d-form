import React from 'react';
import Box from '../lib/utils/box';
import {
  Progress,
  Slider,
  Input,
  RadioGroup,
} from '../lib';

const Radio = RadioGroup.Radio;
const RadioButton = RadioGroup.RadioButton;

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
      inputValue: '2,000,000',
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
  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }
  render() {
    return (
      <div>
        <Box height={50} />
        <Progress width={300} value={this.state.processValue} />
        <button onClick={this.handleProcessChange.bind(this)} >Change</button>
        <Slider range dots width={300} max={42} value={this.state.sliderValue} onChange={this.handleSliderChange.bind(this)} marks={sliderMarks} tipFormatter={value => `${value}°C`} />
        <Input width={300} height={40} thickness={50} value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} prefix="$" />
        <RadioGroup defaultValue="beijing">
          <Radio value="hangzhou">Hangzhou</Radio>
          <Radio value="beijing">Beijing</Radio>
          <Radio value="shanghai">Shanghai</Radio>
        </RadioGroup>
        <RadioGroup defaultValue="beijing">
          <RadioButton value="hangzhou">Hangzhou</RadioButton>
          <RadioButton value="beijing">Beijing</RadioButton>
          <RadioButton value="shanghai">Shanghai</RadioButton>
        </RadioGroup>
      </div>
    );
  }
}
