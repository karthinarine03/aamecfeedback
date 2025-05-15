import React from 'react'
import { useAddSubjectReviewMutation } from '../redux/api/studentApi'

const SubmitReview = () => {

    const [addReview , {data,error,isLoading,isSuccess}] = useAddSubjectReviewMutation()

    

  return (
    <div>SubmitReview</div>
  )
}

export default SubmitReview