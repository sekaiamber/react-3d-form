import React from 'react';
import classnames from 'classnames';
import { unit, unitCompute } from './index';
import './box.scss';

export default class Box extends React.Component {
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

  render() {
    const styles = this.getStyles();
    const barCls = classnames('bar', { [this.props.skin]: true });
    return (
      <div className="react-3d-form-factor">
        <div className="react-3d-form">
          <div className={barCls} style={styles.bar}>
            <div className="bar-face roof" style={styles.roof} />
            <div className="bar-face back" style={styles.back} />
            <div className="bar-face front" style={styles.front} />
            <div className="bar-face left" style={styles.left} />
            <div className="bar-face right" style={styles.right} />
            <div className="bar-face floor" style={styles.floor} />
          </div>
        </div>
      </div>
    );
  }
}

const defaultProps = {
  width: '1em',
  height: '1em',
  thickness: '1em',
  rotate: {
    x: 60,
    y: 0,
    z: 0,
  },
};

Box.defaultProps = defaultProps;

export {
  defaultProps,
};
