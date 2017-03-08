import React from 'react';
import Box from '../lib/utils/box';
import {
  Progress,
} from '../lib';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <Box />
        <Progress width={300} value={90} skin="cyan" />
      </div>
    );
  }
}
