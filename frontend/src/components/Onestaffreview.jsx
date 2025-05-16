import React from 'react';
import { useGetAllSubjectsReviewQuery } from '../redux/api/staffApi';

const Onestaffreview = () => {
  const { data, error, isLoading } = useGetAllSubjectsReviewQuery();

  if (isLoading) return <p className="text-center my-4">Loading subject reviews...</p>;
  if (error) return <p className="text-center text-danger my-4">Error loading reviews.</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary text-center fw-bold">All Subject Reviews</h2>
      
      {/* Table view for medium and larger screens */}
      <div className="table-responsive shadow rounded d-none d-md-block">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Subject</th>
              <th>Average Rating</th>
              <th>Ratings Details</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((subject) => (
              <tr key={subject._id}>
                <td className="fw-semibold">{subject.subject}</td>
                <td>
                  <span className="badge bg-success fs-6">{subject.avgRating.toFixed(1)}</span>
                </td>
                <td>
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered mb-0">
                      <thead className="table-secondary">
                        <tr>
                          <th>Rating</th>
                          <th>Comment</th>
                          <th>Faculty</th>
                          <th>Student Section</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subject.ratings.map((rating, index) => (
                          <tr key={index}>
                            <td>
                              <span className="badge bg-info text-dark">{rating.rating}</span>
                            </td>
                            <td>{rating.comment || <em className="text-muted">No comment</em>}</td>
                            <td>{rating.faculty}</td>
                            <td>{rating.student.section}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="d-md-none">
        {data.data.map((subject) => (
          <div key={subject._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">{subject.subject}</h5>
              <p>
                Average Rating: <span className="badge bg-success">{subject.avgRating.toFixed(1)}</span>
              </p>
              <div>
                {subject.ratings.map((rating, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <p>
                      <strong>Rating:</strong> <span className="badge bg-info text-dark">{rating.rating}</span>
                    </p>
                    <p>
                      <strong>Comment:</strong> {rating.comment || <em className="text-muted">No comment</em>}
                    </p>
                    <p><strong>Faculty:</strong> {rating.faculty}</p>
                    <p><strong>Student Section:</strong> {rating.student.section}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Onestaffreview;
