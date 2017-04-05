import React from 'react';
import classnames from 'classnames';
import { unit, unitCompute, getValue, NOOP } from './index';
import './box.scss';

const factory = (ComposedComponent, confObj) => class extends React.Component {
  dataMap = {}

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props.value, typeof props.defaultValue === 'function' ? props.defaultValue(props) : props.defaultValue),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({
      value: getValue(value, this.state.value),
    });
  }

  getStyles() {
    const bar = {};
    const roof = {};
    const front = {};
    const left = {};
    const right = {};
    const back = {};
    const floor = {};

    let { width, height, thickness } = this.props;
    const { rotate } = this.props;
    width = unit(width);
    height = unit(height);
    thickness = unit(thickness);

    // set width
    bar.width = width;

    // set height
    roof.transform = `translateZ(${height})`;
    front.height = height;
    left.height = height;
    right.height = height;
    back.height = height;

    // set thickness
    bar.height = thickness;
    const halfThickness = unitCompute(thickness, v => v / 2);
    roof.height = thickness;
    floor.height = thickness;
    left.width = thickness;
    left.transform = `rotateX(-90deg) rotateY(-90deg) translateX(-${halfThickness}) translateZ(${halfThickness})`;
    right.width = thickness;
    right.transform = `rotateX(-90deg) rotateY(90deg) translateX(${halfThickness}) translateZ(${halfThickness})`;
    back.transform = `rotateX(-90deg) rotateY(0deg) translateZ(-${thickness})`;

    // set rotate
    bar.transform = `rotateX(${unit(rotate.x || 0, 'deg')}) rotateY(${unit(rotate.y || 0, 'deg')}) rotateZ(${unit(rotate.z || 0, 'deg')})`;

    return { bar, roof, front, left, right, back, floor };
  }

  handleChange(value) {
    if (this.props.value !== undefined && this.props.value !== null) {
      // controlled
      this.props.onChange(value);
    } else {
      const newValue = value.target ? value.target.value : value;
      this.setState({ value: newValue }, () => {
        this.props.onChange(newValue);
      });
    }
  }

  render() {
    const styles = this.getStyles();
    const cls = classnames('react-3d-form', 'react-3d-form-' + ComposedComponent.name.toLowerCase(), { [this.props.skin]: true });
    const { addonBefore, addonAfter } = confObj;
    return (
      <div className="react-3d-form-factor">
        <div className={cls}>
          {addonBefore.map((Addon, i) => (
            <Addon key={'addonBefore' + i} {...this.props} styles={styles} dataMap={this.dataMap} >{this.props.children}</Addon>
          ))}
          <ComposedComponent
            {...this.props}
            styles={styles}
            ref={c => this.dataMap.composedComponent = c}
            onChange={this.handleChange.bind(this)}
            value={this.state.value}
          >{this.props.children}</ComposedComponent>
          {addonAfter.map((Addon, i) => (
            <Addon key={'addonBefore' + i} {...this.props} styles={styles} dataMap={this.dataMap} >{this.props.children}</Addon>
          ))}
        </div>
      </div>
    );
  }
};

export default (obj = {}) => {
  // @boxWrapper
  if (React.Component.isPrototypeOf(obj)) {
    return factory(obj, {
      addonBefore: [],
      addonAfter: [],
    });
  }
  let { addonBefore, addonAfter } = obj;
  addonBefore = addonBefore || [];
  addonAfter = addonAfter || [];
  const confObj = {
    addonBefore,
    addonAfter,
  };
  // @boxWrapper({
  //   addonBefore: [],
  //   addonAfter: [],
  // })
  return ComposedComponent => factory(ComposedComponent, confObj);
};
