import {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterStudent from './components/RegisterStudent';

function Home(){
    const [registerStudent,{data,error,isLoading,isSuccess}] = useRegisterStudentMutation();
    const [name, setName] = useState('');
    const [register, setRegister] = useState('');
    const [year, setYear] = useState('--');
    const [department, setDept] = useState('--');
    const [section, setSection] = useState('--');
    const [semester, setSemester] = useState('--');
    const navi=useNavigate();

    useEffect(()=>{
        if(isSuccess){
        localStorage.setItem('sub_list',JSON.stringify(res.data));
        navi(`/lists`);
        }
        if(error){
            alert('Error : Connection Failure');
        }
      },[isSuccess])
    async function check(){
        
        if(name === ''){
            alert("Enter Student Name");
        }
        else if(register.length!=12){
            alert("Invalid Register Number");
        }
        else if(year==='--' || department==='--' || section==='--' || semester==='--'){
            alert("Fill The Above Details");
        }
        else{
            const value = {
                reg: register,
                name: name,
                year: year,
                section: section,
                sem: semester,
                dept: department,
            }
            registerStudent(value);
            // await axios.post('http://localhost:3000/api/subjects', {year,semester,section,department})
            // .then(res => {localStorage.setItem('sub_list',JSON.stringify(res.data));navi('/lists')})
            // .catch(err => alert('Error : Connection Failure'));
            localStorage.setItem('details',JSON.stringify({reg:register,name:name,section:section,dept:department,sem:semester,rating:'',subject:'',comments:''}))
            // Setstu_details({reg:register,name:name,section:section,dept:department,sem:semester,rating:'',subject:'',comments:''});
        }
    }


    return (
        <>
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
                <button type='submit' onClick={check}>submit</button>
                </center>
        </>
    )
}

export default Home;