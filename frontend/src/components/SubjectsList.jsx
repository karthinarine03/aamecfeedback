import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetSubjectsMutation } from "../redux/api/courseApi";
import { useNavigate } from "react-router-dom";
const SubjectsList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const params = useParams();

  const semester = searchParams.get("sem");
  const section = searchParams.get("sec");
  console.log(semester);
  const id = params.id;
  console.log(id);

  const [
    getSubjects,
    { data: subjectData, error: subjectError, isSuccess: subjectSuccess },
  ] = useGetSubjectsMutation();

  useEffect(()=>{
    const value = {
        semester
    }

    getSubjects(value)
  },[semester])

  console.log(subjectError,subjectData);
  console.log(subjectData?.filtered[0]?.subjects);

  const subjects = subjectData?.filtered[0]?.subjects
  return (
    <div>
      <div className="subjectList">
        <h1>SUBJECTS</h1>
        <div className="subjectcards">
          {subjects ? subjects.map((subject, index) => (
            <div
              className="sublist"
              key={index}
              onClick={() =>
                navigate(
                  `/submitReview/${id}?sub=${encodeURIComponent(subject.subjectTitle)}`
                )
              }
            >
              <h2>
                {subject.subjectCode} - {subject.subjectTitle}
              </h2>
            </div>
          )) : console.log("loaddingggg...")}
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
