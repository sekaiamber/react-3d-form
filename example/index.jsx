import React from 'react';
import {
  Progress,
} from '../lib';

export default class Index extends React.Component {
  render() {
    return (
      <Progress width={300} value={30} skin="cyan" />
    );
  }
}
