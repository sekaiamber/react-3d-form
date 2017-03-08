import React from 'react';
import classnames from 'classnames';
import './box.scss';

function unit(number, defaultUnit = 'px') {
  return typeof number === 'number' ? number + defaultUnit : number;
}

function unitCompute(value, computer) {
  const number = parseFloat(value);
  return computer(number) + value.split(number.toString())[1];
}

export default class Box extends React.Component {
  getStyles() {
    const bar = {};
    const roof = {};
    const front = {};
    const left = {};
    const right = {};
    const back = {};
    const floor = {};

    let { width, height, thickness, rotate } = this.props;
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

  render() {
    const styles = this.getStyles();
    const barCls = classnames('bar', { [this.props.skin]: true }, { 'has-rotation': true });
    return (
      <div className="react-3d-form-factor">
        <div className="react-3d-form">
          <div className={barCls} style={styles.bar} role="progressbar" aria-valuenow={this.props.value} aria-valuemin="0" aria-valuemax="100">
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

Box.defaultProps = {
  width: '1em',
  height: '1em',
  thickness: '1em',
  rotate: {
    x: 60,
    y: 0,
    z: 0,
  },
};
