import React from 'react';
import App from './App';

import { render, waitForElement } from 'react-testing-library';

it('renders without crashing with react testing library', () => {
  const { getByText } = render(<App/>);
  expect( getByText( 'Learn React' ) ).toBeInTheDocument();
});