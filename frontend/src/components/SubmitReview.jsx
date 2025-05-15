import React from 'react'
import { useAddSubjectReviewMutation } from '../redux/api/studentApi'
import { useParams, useSearchParams } from 'react-router-dom'

const SubmitReview = () => {

  const params = useParams()

  const id = params.id
  console.log(id);

    const [addReview , {data,error,isLoading,isSuccess}] = useAddSubjectReviewMutation()

    function handleClick(){
      const value = {
        id,
        body: {
          subjects: [
            {
              subject: "Networks",
              rating: 5,
              comment: "Excellent course"
            }
          ]
        }
      }

      addReview(value)
    }
    console.log(error);
    console.log(data);

  return (
    <div>SubmitReview
      <button onClick={handleClick}>click</button>
    </div>
    
  )
}

export default SubmitReview