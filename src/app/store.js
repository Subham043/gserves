import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import loaderModalReducer from '../features/loaderModalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loaderModal: loaderModalReducer,
  },
});
