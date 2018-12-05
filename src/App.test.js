import React from 'react';
import App from './App';

import { render } from 'react-testing-library';

it('renders without crashing with react testing library', () => {
  const { getByText } = render(<App/>);
});