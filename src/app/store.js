import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import loaderModalReducer from '../features/loaderModalSlice';
import serviceModalReducer from '../features/serviceModalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loaderModal: loaderModalReducer,
    serviceModal: serviceModalReducer,
  },
});
