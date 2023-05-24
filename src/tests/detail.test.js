import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Detail from '../pages/Details/Detail';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Detail component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      stocks: [
        {
          id: 1,
          companyName: 'Apple',
          price: 150,
          volume: 1000000,
          beta: 1.2,
          lad: 2.5,
          marketCap: 1000000000,
        },
      ],
      selectedStock: 1,
    });
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Detail />
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
