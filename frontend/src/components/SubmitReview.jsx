import React, { useEffect, useState } from "react";
import { useAddSubjectReviewMutation } from "../redux/api/studentApi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Questions } from "./helper/Question";
import { Rate } from "antd";

const SubmitReview = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const params = useParams();
  const tips=['VERY POOR','BAD','NORMAL','GOOD','EXCELLENT']
  const [score,Setscore]=useState([0,0,0,0,0,0,0,0,0,0]);
  const [comments,Setcomments]=useState('');

  const subject = searchParams.get("sub");

  console.log(subject);
  const id = params.id;
  console.log(id);

  const [addReview, { data, error, isLoading, isSuccess }] =
    useAddSubjectReviewMutation();


  useEffect(()=>{
    if(isSuccess){
      toast.success("Successfully submitted")
      navigate('/')
    }
  },[isSuccess])
  function score_submit(e){
    e.preventDefault()
    let sum=0.0;
    if(score.includes(0.0)){
        toast.error("Fill all questions")
        return ;
    }
    score.forEach((num,index)=>{
        sum+=num
    });

    //add to review

    const value = {
      id,
      body: {
        subjects: [
          {
            subject: subject,
            rating: sum,
            comment: comments,
          },
        ],
      },
    };

    addReview(value);

  }

  // function handleClick() {
  //   const value = {
  //     id,
  //     body: {
  //       subjects: [
  //         {
  //           subject: subject,
  //           rating: 5,
  //           comment: "Excellent course",
  //         },
  //       ],
  //     },
  //   };

  //   addReview(value);
  // }
  console.log(error);
  console.log(data);

  return (
    <div>
      <div className="subjectList">
        <h1>
          FEEDBACK FOR  {subject}
        </h1>
        <div className="subjectcards">
          {Questions.map((question, index) => (
            <div className="queslist" key={index}>
              <h2>
                {index + 1} . {question.ques}
              </h2>
              <div className="rating_board">
                <center>
                  <Rate
                    tooltips={tips}
                    className="ratingstar"
                    allowClear={false}
                    allowHalf
                    onChange={(count) => {
                      score[index] = parseFloat(count);
                      Setscore(score);
                    }}
                    size={5}
                  ></Rate>
                </center>
              </div>
            </div>
          ))}
          <div className="comments">
            <h2>**comments**</h2>
            <br></br>
            <textarea
              value={comments}
              onChange={(e) => {
                Setcomments(e.target.value);
              }}
              placeholder="**Comments**"
            ></textarea>
          </div>
          <center>
            <button type="submit" onClick={score_submit}>
              submit
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;
