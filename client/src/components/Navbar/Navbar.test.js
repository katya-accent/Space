import { render, screen } from '@testing-library/react';
import Navbar from './Navbar.js';
import {BrowserRouter as Router} from 'react-router-dom'

test('renders the contact us link', () => {
  render(<Router><Navbar/></Router>);
  const linkElement = screen.getByText("Booking Lookup");
  expect(linkElement).toBeInTheDocument();
});


