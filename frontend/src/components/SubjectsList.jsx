import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useGetSubjectsMutation } from "../redux/api/courseApi";
import { useRegisterStudentMutation } from "../redux/api/studentApi";

const SubjectsList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();

  const semester = searchParams.get("sem");
  const section = searchParams.get("sec");
  const id = params.id;

  const [registerStudent, { registerdata, error, isLoading, isSuccess }] =
    useRegisterStudentMutation();

  const [
    getSubjects,
    { data: subjectData, error: subjectError, isSuccess: subjectSuccess },
  ] = useGetSubjectsMutation();

  useEffect(() => {
    if (semester) {
      getSubjects({ semester });
    }
  }, [semester]);

  const subjects = subjectData?.filtered?.[0]?.subjects;

  return (
    <div>
      <div className="subjectList">
        <h1>SUBJECTS</h1>
        <div className="subjectcards">
          {subjects ? (
            subjects.map((subject, index) => (
              <div
                className="sublist"
                key={index}
                onClick={() =>
                  navigate(
                    `/submitReview/${id}?sub=${encodeURIComponent(
                      subject.subjectTitle
                    )}&sem=${semester}&sec=${section}&faculty=${encodeURIComponent(
                      subject.faculty
                    )}`
                  )
                }
              >
                <h2>
                  {subject.subjectCode} - {subject.subjectTitle}
                </h2>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
