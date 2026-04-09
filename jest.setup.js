/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

jest.mock('react-native-svg', () => {
  const React = require('react');
  const Svg = ({ children, ...props }) =>
    React.createElement('Svg', props, children);
  const Path = (props) => React.createElement('Path', props);
  return { __esModule: true, default: Svg, Svg, Path };
});
