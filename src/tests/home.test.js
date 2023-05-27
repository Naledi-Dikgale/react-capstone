import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home/Home';

// Mock the Redux store
const mockState = {
  stocks: {
    stocks: [
      {
        id: 1,
        companyName: 'PTC Inc',
        price: 100,
      },
      {
        id: 2,
        companyName: 'Example Company 2',
        price: 200,
      },
    ],
    loading: false,
    searchTerm: '',
  },
};
const mockStore = {
  getState: () => mockState,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

describe('Home', () => {
  test('renders the component and shows company list', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Stocks')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toHaveValue('');

    expect(screen.getByText('PTC Inc')).toBeInTheDocument();
    expect(screen.getByText('Price: $100')).toBeInTheDocument();
    expect(screen.getByText('Example Company 2')).toBeInTheDocument();
    expect(screen.getByText('Price: $200')).toBeInTheDocument();
  });

  test('displays loading indicator while loading', () => {
    const loadingState = {
      ...mockState,
      stocks: {
        ...mockState.stocks,
        loading: true,
      },
    };

    render(
      <Provider store={{ ...mockStore, getState: () => loadingState }}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('...Loading...')).toBeInTheDocument();
  });

  test('updates search term on input change', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'Example' } });

    expect(searchInput).toHaveValue('Example');
  });

  test('filters company list based on search term', () => {
    const searchTermState = {
      ...mockState,
      stocks: {
        ...mockState.stocks,
        searchTerm: 'Example 1',
      },
    };

    render(
      <Provider store={{ ...mockStore, getState: () => searchTermState }}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Example Company 2')).not.toBeInTheDocument();
  });
});
