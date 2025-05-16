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
        }),
        addSubjectReview : builder.mutation({
            query({id,body}){
                return {
                    url :`/updatefeedback/${id}`,
                    method : "PUT",
                    body
                }
            }
        }),
        getStudents: builder.query({
            query: (id) => ({
            url: `/getstudent/${id}`,
            method: 'GET'
        })
        })
    })
})

export const {useRegisterStudentMutation, useAddSubjectReviewMutation,useGetStudentsQuery} = studentApi