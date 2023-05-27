import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  stocks: [],
  loading: false,
  selectedStock: '',
  searchTerm: '',
  error: '',
};
export const fetchStocks = createAsyncThunk('stocks/fetchStocks', () => (
  axios.get('https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=3f7205f92b9c527789e0f4f9fa03d36a')
    .then((response) => response.data.map((stock) => ({
      id: stock.symbol,
      companyName: stock.companyName,
      price: stock.price,
      volume: stock.volume,
      beta: stock.beta,
      lad: stock.lastAnnualDividend,
      marketCap: stock.marketCap,
    })))
));

export const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    select: (state, action) => ({ ...state, selectedStock: action.payload }),
    search: (state, action) => ({ ...state, searchTerm: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStocks.pending, (state) => ({ ...state, loading: true }));
    builder.addCase(fetchStocks.fulfilled, (state, action) => ({
      ...state, loading: false, stocks: action.payload, error: '',
    }));
  },
});

export const { select, search } = stockSlice.actions;
export default stockSlice.reducer;
