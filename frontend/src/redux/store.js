import { configureStore } from '@reduxjs/toolkit'
import { studentApi } from './api/studentApi'
import { courseApi } from './api/courseApi'

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath] : studentApi.reducer,
    [courseApi.reducerPath] : courseApi.reducer
  },
  middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([studentApi.middleware],[courseApi.middleware])
})