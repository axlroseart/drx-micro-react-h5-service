import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Loading from '../index';
import '@testing-library/jest-dom';

it('render without crash - Loading', () => {
  render(<Loading label={''} />);
  // screen.debug();
});

it('render loading component correctly', () => {
  render(<Loading label={'loading component'} />);
  const loading = screen.getByTestId('loading-div-test');
  expect(loading.textContent).toBe('loading component');
});

// show how to use cleanup
it('render loading component correctly', () => {
  const { getByTestId } = render(<Loading label={'loading component 2'} />);
  expect(getByTestId('loading-div-test').textContent).toBe('loading component 2');
});

it('shoud be in the document', () => {
  render(<Loading label="" />);
  const pagenotfound = screen.queryByText('404 Not Found.');
  expect(pagenotfound).not.toBeNull();
});

it('should render error tip when button clicked', () => {
  render(<Loading label="" />);
  const button = screen.getByTestId('loading-button');
  const onClick = jest.fn();

  button.onclick = onClick;
  userEvent.click(button);
  expect(onClick).toHaveBeenCalled();

  const tipDiv = screen.getByText('something went wrong');
  expect(tipDiv).toBeInTheDocument();
});
