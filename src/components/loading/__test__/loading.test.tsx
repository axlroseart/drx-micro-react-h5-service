import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import Loading from '../index';

afterEach(cleanup);

it('render without crash - Loading', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loading label={''} />, div);
});

it('render loading component correctly', () => {
  const { getByTestId } = render(<Loading label={'loading component'} />);
  expect(getByTestId('loading-div-test').textContent).toBe('loading component');
});

// show how to use cleanup
it('render loading component correctly', () => {
  const { getByTestId } = render(<Loading label={'loading component 2'} />);
  expect(getByTestId('loading-div-test').textContent).toBe('loading component 2');
});
