import React from 'react';
import { useGetAllSubjectsReviewQuery } from '../redux/api/staffApi';

const Onestaffreview = () => {
  const { data, error, isLoading } = useGetAllSubjectsReviewQuery();

  if (isLoading) return <p>Loading subject reviews...</p>;
  if (error) return <p>Error loading reviews.</p>;

  return (
    <div>
      <h2>All Subject Reviews</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Average Rating</th>
            <th>Ratings Details</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.subject}</td>
              <td>{subject.avgRating}</td>
              <td>
                <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
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
                        <td>{rating.rating}</td>
                        <td>{rating.comment}</td>
                        <td>{rating.faculty}</td>
                        <td>{rating.student.section}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Onestaffreview;
