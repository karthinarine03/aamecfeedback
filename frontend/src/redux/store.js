// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { studentApi } from './api/studentApi';
import { courseApi } from './api/courseApi';
import { staffApi } from './api/staffApi';

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studentApi.middleware,
      courseApi.middleware,
      staffApi.middleware
    ),
});
