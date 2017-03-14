import React from 'react';
import boxWrapper from './boxWrapper';

@boxWrapper
export default class Box extends React.Component {
  render() {
    const { styles } = this.props;
    return (
      <div className="bar" style={styles.bar}>
        <div className="bar-face roof" style={styles.roof} />
        <div className="bar-face back" style={styles.back} />
        <div className="bar-face front" style={styles.front} />
        <div className="bar-face left" style={styles.left} />
        <div className="bar-face right" style={styles.right} />
        <div className="bar-face floor" style={styles.floor} />
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
  skin: 'default',
};

Box.defaultProps = defaultProps;

export {
  defaultProps,
};
