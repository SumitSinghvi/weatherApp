import { render, screen } from '@testing-library/react';
import MyNavbar from './Navbar';
import '@testing-library/jest-dom';

describe('MyNavbar', () => {
  it('renders the navbar with correct elements', () => {
    render(<MyNavbar setNav={() => {}} nav="today"/>);

    // Check for the Navbar element
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();

    // Check for the brand element
    const brandElement = screen.getByText('My Navbar');
    expect(brandElement).toBeInTheDocument();

    // Check for the buttons
    const loginButton = screen.getByRole('button', { name: 'Today' });
    expect(loginButton).toBeInTheDocument();
    const signUpButton = screen.getByRole('button', { name: 'Week' });
    expect(signUpButton).toBeInTheDocument();

    // Check for the icon
    const searchIcon = screen.getByRole('img');
    expect(searchIcon).toBeInTheDocument();
  });
});