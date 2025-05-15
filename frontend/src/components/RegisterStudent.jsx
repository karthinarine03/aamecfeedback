import React, { useEffect } from 'react'
import { useRegisterStudentMutation } from '../redux/api/studentApi'
import { useNavigate } from 'react-router-dom'


const RegisterStudent = () => {
  const navigate = useNavigate()

    const [registerStudent,{data,error,isLoading,isSuccess}] = useRegisterStudentMutation()

    useEffect(()=>{
      if(isSuccess){
        navigate(`/submitReview/${data?.data?._id}`)
      }
    },[isSuccess])
  function handle(e){
    e.preventDefault()
    const value = {
      reg: "23CS004",
      name: "thiru Johnson",
      section: "B",
      sem: 4,
      dept: "Computer Science",
      subjects: [ ]
  }
  registerStudent(value)
  

  }

  console.log(data);

 

    
  return (
    <div>
      <button  onClick={handle}>click</button>
    </div>
  )
}

export default RegisterStudent