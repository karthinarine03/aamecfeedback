import React, { useEffect, useState } from "react";
import { useAddSubjectReviewMutation } from "../redux/api/studentApi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Questions } from "./helper/Question";
import { Rate } from "antd";

const SubmitReview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const tips = ['VERY POOR', 'BAD', 'NORMAL', 'GOOD', 'EXCELLENT'];
  const [score, setScore] = useState(new Array(Questions.length).fill(0));
  const [comments, setComments] = useState('');

  const subject = searchParams.get("sub");
  const semester = searchParams.get("sem");
  const section = searchParams.get("sec");
  const faculty = searchParams.get("faculty");
  const id = params.id;

  console.log("Faculty:", faculty);
  console.log("Subject:", subject);
  console.log("Student ID:", id);

  const [addReview, { data, error, isLoading, isSuccess }] = useAddSubjectReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully submitted");
      navigate(`/`);
    }
  }, [isSuccess, navigate]);

  const score_submit = (e) => {
    e.preventDefault();

    if (score.includes(0)) {
      toast.error("Please rate all questions");
      return;
    }

    const totalRating = score.reduce((sum, val) => sum + val, 0);

    const value = {
      id,
      body: {
        subjects: [
          {
            subject: subject,
            rating: totalRating,
            comment: comments,
            faculty: faculty
          },
        ],
      },
    };

    addReview(value);
  };

  return (
    <div>
      <div className="subjectList">
        <h1>FEEDBACK FOR {subject}</h1>
        <div className="subjectcards">
          {Questions.map((question, index) => (
            <div className="queslist" key={index}>
              <h2>{index + 1}. {question.ques}</h2>
              <div className="rating_board">
                <center>
                  <Rate
                    tooltips={tips}
                    className="ratingstar"
                    allowClear={false}
                    allowHalf
                    onChange={(count) => {
                      const updatedScores = [...score];
                      updatedScores[index] = parseFloat(count);
                      setScore(updatedScores);
                    }}
                  />
                </center>
              </div>
            </div>
          ))}

          <div className="comments">
            <h2>**Comments**</h2>
            <br />
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="**Comments**"
            />
          </div>

          <center>
            <button type="submit" onClick={score_submit} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </center>

          {error && <p style={{ color: "red" }}>Error: {error.message || "Submission failed"}</p>}
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;
