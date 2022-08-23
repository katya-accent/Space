import { render, screen } from '@testing-library/react';
import Home from './Home.js';
import { BrowserRouter } from 'react-router-dom'

test('renders the home component', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>);
  const linkElement = screen.getByText(/Welcome to InfiniSpace/);
  expect(linkElement).toBeInTheDocument();
});

test('renders the start journey button', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});
