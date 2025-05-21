import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const staffApi = createApi({
  reducerPath: 'staffApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://aamecfeedback-6m9o.onrender.com/api/v1',
  }),
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getAllSubjectsReview: builder.query({
      query: () => ({
        url: '/getallSubjectsReview',
        method: 'GET',
      }),
    }),
    getStaffReview: builder.query({
      query: (body) => ({
        url: '/getSubjectReview',
        method: 'GET',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllSubjectsReviewQuery,
  useGetStaffReviewQuery,
} = staffApi;
