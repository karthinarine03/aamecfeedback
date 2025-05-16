import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useGetSubjectsMutation } from "../redux/api/courseApi";
import { useGetStudentsQuery, useRegisterStudentMutation } from "../redux/api/studentApi";
import "../SubjectsList.css";

const SubjectsList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();

  const semester = searchParams.get("sem");
  const section = searchParams.get("sec");
  const id = params.id;

  const {data,error,isLoading,isSuccess} = useGetStudentsQuery(id)
  const [getSubjects, { data: subjectData }] = useGetSubjectsMutation();

  useEffect(() => {
    if (semester) {
      getSubjects({ semester });
    }
  }, [semester]);

  const subjects = subjectData?.filtered?.[0]?.subjects;
  console.log(data);
  console.log(error);
  
  return (
    <div className="container py-5">
      <h1 className="text-center text-gradient mb-5">Subjects</h1>

      <div className="row g-4">
        {subjects ? (
          subjects.map((subject, index) => (
            <div className="col-12 col-sm-6 col-lg-4 d-flex" key={index}>
              <div
                className="card subject-card w-100"
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
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <h5 className="card-title fw-bold">
                    {subject.subjectCode} - {subject.subjectTitle}
                  </h5>
                  <p className="text-muted mb-0">{subject.faculty}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center w-100">
            <div className="spinner-border text-primary" role="status" />
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectsList;
