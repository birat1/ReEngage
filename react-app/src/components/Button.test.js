import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';


const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

describe('Button component', () => {
  test('render with the correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 