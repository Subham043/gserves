import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import loaderModalReducer from '../features/loaderModalSlice';
import serviceModalReducer from '../features/serviceModalSlice';
import adminNavReducer from '../features/adminNavSlice';
import adminUserReducer from '../features/adminUserSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loaderModal: loaderModalReducer,
    serviceModal: serviceModalReducer,
    adminNav: adminNavReducer,
    adminUser: adminUserReducer,
  },
});
