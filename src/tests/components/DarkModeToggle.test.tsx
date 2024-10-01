import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DarkModeToggle from '../../components/DarkModeToggle';
import '@testing-library/jest-dom';

describe('DarkModeToggle Component', () => {
  beforeEach(() => {
    // Clear any previous localStorage values before each test
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should render the switch', () => {
    render(<DarkModeToggle />);
    const switchButton = screen.getByRole('switch');
    expect(switchButton).toBeInTheDocument();
  });

  it('should initialize with dark mode off if localStorage is empty', () => {
    render(<DarkModeToggle />);
    const switchButton = screen.getByRole('switch');
    
    // Dark mode should be off by default
    expect(switchButton).not.toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should initialize with dark mode on if localStorage has dark mode enabled', () => {
    // Simulate localStorage having dark mode enabled
    localStorage.setItem('darkMode', 'true');

    render(<DarkModeToggle />);
    const switchButton = screen.getByRole('switch');

    // Dark mode should be on based on localStorage
    expect(switchButton).toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle dark mode on click', () => {
    render(<DarkModeToggle />);
    const switchButton = screen.getByRole('switch');

    // Initially dark mode is off
    expect(switchButton).not.toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to enable dark mode
    fireEvent.click(switchButton);

    // Dark mode should now be enabled
    expect(switchButton).toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');

    // Click again to disable dark mode
    fireEvent.click(switchButton);

    // Dark mode should now be disabled
    expect(switchButton).not.toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });
});
