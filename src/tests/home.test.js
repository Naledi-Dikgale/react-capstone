import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../pages/Home/Home';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Home component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      stocks: [
        {
          id: 1, companyName: 'Apple', price: 150, beta: 1.5,
        },
        {
          id: 2, companyName: 'Google', price: 300, beta: 2.0,
        },
      ],
      loading: false,
    });
  });

  test('renders company list correctly', () => {
    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(screen.getByText('Stocks')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  test('dispatches select action on NavLink click', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Router>
        <Home />
      </Router>,
    );

    const navLink = screen.getAllByRole('link')[0];
    navLink.click();

    expect(dispatch).toHaveBeenCalledWith({ type: 'home/select', payload: 1 });
  });
});
