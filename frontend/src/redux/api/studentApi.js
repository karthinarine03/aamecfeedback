import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const studentApi = createApi({
    reducerPath : "studentApi",
    baseQuery : fetchBaseQuery({baseUrl:"http://localhost:3000/api/v1"}),
    keepUnusedDataFor: 60,
    endpoints : (builder)=>({
        registerStudent : builder.mutation({
            query(body){
                return {
                    url :"/addRating",
                    method : "POST",
                    body
                }
            }
        })
    })
})

export const {useRegisterStudentMutation} = studentApi