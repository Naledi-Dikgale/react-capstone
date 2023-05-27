import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Detail from '../pages/Details/Detail';

// Mock the Redux store
const mockState = {
  stocks: {
    selectedStock: 1,
    stocks: [
      {
        id: 1,
        companyName: 'Example Company',
        price: 100,
        volume: 1000,
        beta: 1.5,
        lad: 0.5,
        marketCap: 1000000,
      },
    ],
  },
};
const mockStore = {
  getState: () => mockState,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

describe('Detail', () => {
  test('renders stock details when selectedStockId is set', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Detail />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Example Company')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('1.5')).toBeInTheDocument();
    expect(screen.getByText('Dividend')).toBeInTheDocument();
    expect(screen.getByText('0.5')).toBeInTheDocument();
    expect(screen.getByText('Market Cap')).toBeInTheDocument();
    expect(screen.getByText('1000000')).toBeInTheDocument();
  });

  test('renders "Data not loaded" when selectedStockId is not set', () => {
    mockState.stocks.selectedStock = null;

    render(
      <Provider store={mockStore}>
        <Router>
          <Detail />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Data not loaded')).toBeInTheDocument();
  });
});
