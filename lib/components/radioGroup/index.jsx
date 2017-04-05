import React from 'react';
import { defaultProps } from '../../utils/box';
import { NOOP } from '../../utils';
import boxWrapper from '../../utils/boxWrapper';
import Radio from './radio';
import RadioButton from './radioButton';
import './radiogroup.scss';

@boxWrapper
export default class RadioGroup extends React.Component {
  render() {
    const styles = this.props.styles;
    return (
      <div>
        {React.Children.map(this.props.children, child => React.cloneElement(child, {
          height: this.props.height,
          thickness: this.props.thickness,
          checked: this.props.value === child.props.value,
          onChange: this.props.onChange,
          styles,
        }))}
      </div>
    );
  }
}

RadioGroup.defaultProps = {
  ...defaultProps,
  value: undefined,
  onChange: NOOP,
};

RadioGroup.Radio = Radio;
RadioGroup.RadioButton = RadioButton;
