import { useNavigate, useParams } from "react-router-dom";
import { Questions } from "./questions"
import {Rate} from "antd";
import { useState } from "react";

import axios from 'axios';

function Questionspage(){
    const navi=useNavigate();
    // const {stu_details,Setstu_details}=useContext(subjectdata);
    const tips=['VERY POOR','BAD','NORMAL','GOOD','EXCELLENT']
    const [score,Setscore]=useState([0,0,0,0,0,0,0,0,0,0]);
    const [comments,Setcomments]=useState('');
    const {code,subname}=useParams();
    function res_func(data){
        console.log(data);
        alert("Submission Successfully");
        navi('/lists');
    }
    function score_submit(){
        let sum=0.0;
        if(score.includes(0.0)){
            alert("Fill The Feedback");
            return ;
        }
        score.forEach((num,index)=>{
            sum+=num
        });
        // const {reg,name,section,dept,sem}=stu_details;
        const stu_details=JSON.parse(localStorage.getItem('details'));
        stu_details.rating=sum;
        stu_details.comments=comments;
        stu_details.subject=subname;
        console.log(stu_details);
        axios.post('http://localhost:3000/api/v1/addRating', stu_details)
            .then(res => {res_func(res.data)})
            .catch(err => alert('Error : Connection Failure'));
    }
    return (
        <>
            <div className="subjectList">
            <h1>FEEDBACK FOR {code} - {subname}</h1>
            <div className="subjectcards">
                {
                    Questions.map((question,index)=>(
                        <div className='queslist' key={index}>
                            <h2>{index+1} . {question.ques}</h2>
                            <div className="rating_board">
                                <center>
                                    <Rate tooltips={tips} className="ratingstar" allowClear={false} allowHalf onChange={(count)=>{score[index]=parseFloat(count);Setscore(score)}} size={5}></Rate>
                                </center>
                            </div>

                        </div>
                        
                    ))
                }
                <div className="comments">
                <h2>**comments**</h2><br></br>
                <textarea value={comments} onChange={(e)=>{Setcomments(e.target.value)}} placeholder="**Comments**"></textarea>
                </div>
                <center>
                <button type="submit" onClick={score_submit}>submit</button>
                </center>
            </div>
        </div>
        </>
    )
}

export default Questionspage;