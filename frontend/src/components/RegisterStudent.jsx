import React, { useEffect, useState } from 'react'
import { useRegisterStudentMutation } from '../redux/api/studentApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'


const RegisterStudent = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [register, setRegister] = useState('');
  const [year, setYear] = useState('--');
  const [department, setDept] = useState('--');
  const [section, setSection] = useState('--');
  const [semester, setSemester] = useState('--');

    const [registerStudent,{data,error,isLoading,isSuccess}] = useRegisterStudentMutation()

    useEffect(()=>{
      if(isSuccess){
        navigate(`/subjectList/${data?.data[0]?._id}?sem=${semester}&sec=${section}`)
      }
    },[isSuccess])

    //check is empty



  function handleSubmit(e){
    e.preventDefault()

    if(name === '' ||register.length!=12 || year==='--' || department==='--' || section==='--' || semester==='--'){
      return toast.error("Fill all fields")
    }

    const value =  {
      reg: register,
      name,
      section,
      sem: semester,
      dept: department,
      subjects: [ ]
    }


    registerStudent(value)

  }
  // function handle(e){
  //   e.preventDefault()
  //   const value = {
  //     reg: "23CS004",
  //     name: "thiru Johnson",
  //     section: "B",
  //     sem: 4,
  //     dept: "Computer Science",
  //     subjects: [ ]
  // }
  // registerStudent(value)
  

  // }

  console.log(data);



  return (
    <div>
      <form onSubmit={handleSubmit}>
          <p>STUDENT NAME</p><br/>
                <input type='text' id='name' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter The Name'></input><br></br>
                <p>REGISTER NUMBER</p><br/>
                <input type='text' id='reg_no' value={register} onChange={(e)=>{setRegister(e.target.value)}} placeholder='Enter The Name'></input><br></br>
                <p>DEPARTMENT</p><br/>
                <select id='dept' onChange={(e)=>{setDept(e.target.value)}}>
                    <option hidden>--</option>
                    <option>CSE</option>
                    <option>IT</option>
                    <option>ECE</option>
                    <option>EEE</option>
                    <option>MECH</option>
                    <option>CIVIL</option>
                    <option>CHEMICAL</option>
                </select><br></br>
                <p>YEAR</p><br/>
                <select id='year' onChange={(e)=>{setYear(e.target.value)}}>
                    <option hidden>--</option>
                    <option value='1'>I</option>
                    <option value='2'>II</option>
                    <option value='3'>III</option>
                    <option value='4'>IV</option>
                </select><br></br>
                <p>SECTION</p><br/>
                <select id='sec' onChange={(e)=>{setSection(e.target.value)}}>
                    <option hidden>--</option>
                    <option value='A'>A SECTION</option>
                    <option value='B'>B SECTION</option>
                </select><br></br>
                <p>SEMESTER</p><br/>
                <select id='sem' onChange={(e)=>{setSemester(e.target.value)}}>
                    <option hidden>--</option>
                    <option value='1'>I</option>
                    <option value='2'>II</option>
                    <option value='3'>III</option>
                    <option value='4'>IV</option>
                    <option value='5'>V</option>
                    <option value='6'>VI</option>
                    <option value='7'>VII</option>
                    <option value='8'>VIII</option>
                </select><br></br>
                <center>
                <button type='submit'>submit</button>
                </center>
      </form>
    </div>
  )
}

export default RegisterStudent