import { configureStore } from '@reduxjs/toolkit';
import { stockSlice } from '../pages/Home/homeSlice';

export default configureStore({
  reducer: {
    stocks: stockSlice.reducer,
  },
});
