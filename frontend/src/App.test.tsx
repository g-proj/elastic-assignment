import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the search page heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /חיפוש רחובות/i });
  expect(heading).toBeInTheDocument();
});
