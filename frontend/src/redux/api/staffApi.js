import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const staffApi = createApi({
    reducerPath : "staffApi",
    baseQuery : fetchBaseQuery({baseUrl:"http://localhost:3000/api/v1"}),
    keepUnusedDataFor: 60,
    endpoints : (builder)=>({
        getStaffReview : builder.query({
            query(body){
                return {
                    url :"/getSubjectReview",
                    method : "GET",
                    body
                }
            }
        })
    })
})

export const {useGetStaffReviewQuery} = staffApi