import React, { useState } from 'react';
import { useGetAllSubjectsReviewQuery } from '../redux/api/staffApi';

const Onestaffreview = () => {
  const { data, error, isLoading } = useGetAllSubjectsReviewQuery();
  const [selectedSection, setSelectedSection] = useState('A');

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  if (isLoading) return <p className="text-center my-4">Loading subject reviews...</p>;
  if (error) return <p className="text-center text-danger my-4">Error loading reviews.</p>;
  if (!data || !data.data) return <p className="text-center text-muted my-4">No data available.</p>;

  const filteredSubjects = data.data.map(subject => {
    const facultyMap = {};

    subject.ratings.forEach(rating => {
      if (rating.student.section === selectedSection) {
        if (!facultyMap[rating.faculty]) {
          facultyMap[rating.faculty] = {
            faculty: rating.faculty,
            ratings: [],
          };
        }
        facultyMap[rating.faculty].ratings.push(rating);
      }
    });

    const facultyRatings = Object.values(facultyMap).map(fac => {
      const avg = fac.ratings.reduce((sum, r) => sum + r.rating, 0) / fac.ratings.length;
      return {
        ...fac,
        avgRating: parseFloat(avg.toFixed(1)),
      };
    });

    return {
      ...subject,
      facultyRatings,
    };
  }).filter(subject => subject.facultyRatings.length > 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary text-center fw-bold">
        Subject Reviews - Section {selectedSection}
      </h2>

      <div className="mb-4 text-center">
        <label className="me-2 fw-semibold">Filter by Section:</label>
        <select
          className="form-select d-inline w-auto"
          value={selectedSection}
          onChange={handleSectionChange}
        >
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
      </div>

      {/* Table View (Desktop) */}
      <div className="table-responsive shadow rounded d-none d-md-block">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Subject</th>
              <th>Faculty</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map(subject =>
              subject.facultyRatings.map((fac, index) => (
                <tr key={`${subject._id}-${fac.faculty}-${index}`}>
                  <td>{subject.subject}</td>
                  <td>{fac.faculty}</td>
                  <td><span className="badge bg-success">{fac.avgRating}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card View (Mobile) */}
      <div className="d-md-none">
        {filteredSubjects.map(subject => (
          <div key={subject._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">{subject.subject}</h5>
              {subject.facultyRatings.map((fac, i) => (
                <div key={i} className="mb-3">
                  <h6 className="fw-bold">Faculty: {fac.faculty}</h6>
                  <p>
                    Average Rating:{" "}
                    <span className="badge bg-success">{fac.avgRating}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Onestaffreview;
