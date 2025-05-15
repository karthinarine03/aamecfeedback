import React from 'react'
import { useRegisterStudentMutation } from '../redux/api/studentApi'

const RegisterStudent = () => {

    const [registerStudent,{data,error,isLoading,isSuccess}] = useRegisterStudentMutation()

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
    console.log(data,error);
  return (
    <div>
      <button  onClick={handle}>click</button>
    </div>
  )
}

export default RegisterStudent