import React, { useState } from 'react';
import { useGetAllSubjectsReviewQuery } from '../redux/api/staffApi';

const Onestaffreview = () => {
  const { data, error, isLoading } = useGetAllSubjectsReviewQuery();
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  if (isLoading) return <p className="text-center my-4">Loading subject reviews...</p>;
  if (error) return <p className="text-center text-danger my-4">Error loading reviews.</p>;
  if (!data || !data.data) return <p className="text-center text-muted my-4">No data available.</p>;

  const filteredSubjects = data.data.map(subject => {
    const sectionMap = {};

    subject.ratings.forEach(rating => {
      if (rating.semester === selectedSemester) {
        const section = rating.student?.section || 'Unknown';
        if (!sectionMap[section]) sectionMap[section] = {};

        if (!sectionMap[section][rating.faculty]) {
          sectionMap[section][rating.faculty] = {
            faculty: rating.faculty,
            ratings: [],
          };
        }

        sectionMap[section][rating.faculty].ratings.push(rating);
      }
    });

    const sectionRatings = Object.entries(sectionMap).map(([section, facultyMap]) => {
      const facultyRatings = Object.values(facultyMap).map(fac => {
        const avg = fac.ratings.reduce((sum, r) => sum + r.rating, 0) / fac.ratings.length;
        return {
          ...fac,
          avgRating: parseFloat(avg.toFixed(1)),
        };
      });

      return {
        section,
        facultyRatings,
      };
    });

    return {
      ...subject,
      sectionRatings,
    };
  }).filter(subject => subject.sectionRatings.length > 0);

  const renderTableBySection = (sectionName) => (
    <div className="table-responsive shadow rounded mb-4">
      <h4 className="text-center bg-light py-2 fw-bold">Section {sectionName}</h4>
      <table className="table table-bordered table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>Subject</th>
            <th>Faculty</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map(subject => {
            const sectionData = subject.sectionRatings.find(sec => sec.section === sectionName);
            if (!sectionData) return null;

            return sectionData.facultyRatings.map((fac, index) => (
              <tr key={`${subject._id}-${sectionName}-${fac.faculty}-${index}`}>
                <td>{subject.subject}</td>
                <td>{fac.faculty}</td>
                <td><span className="badge bg-success">{fac.avgRating}</span></td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMobileCardsBySection = (sectionName) => {
    const sectionData = filteredSubjects.flatMap(subject => {
      const sec = subject.sectionRatings.find(s => s.section === sectionName);
      if (!sec) return [];
      return sec.facultyRatings.map(fac => ({
        subject: subject.subject,
        faculty: fac.faculty,
        avgRating: fac.avgRating,
      }));
    });

    if (sectionData.length === 0) return null;

    return (
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold text-primary text-center">Section {sectionName}</h5>
          {sectionData.map((item, index) => (
            <div key={index} className="mb-3">
              <p className="mb-1">Subject: <strong>{item.subject}</strong></p>
              <p className="mb-1">Faculty: {item.faculty}</p>
              <p>
                Avg Rating: <span className="badge bg-success">{item.avgRating}</span>
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary text-center fw-bold">
        Subject Reviews {selectedSemester && `- Semester ${selectedSemester}`}
      </h2>

      <div className="mb-4 text-center">
        <label className="me-2 fw-semibold">Filter by Semester:</label>
        <select
          className="form-select d-inline w-auto"
          value={selectedSemester}
          onChange={handleSemesterChange}
        >
          <option value="">-- Select Semester --</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
          <option value="7">Semester 7</option>
          <option value="8">Semester 8</option>
        </select>
      </div>

      {/* Table View (Desktop) */}
      <div className="d-none d-md-block">
        {renderTableBySection('A')}
        {renderTableBySection('B')}
      </div>

      {/* Card View (Mobile) */}
      <div className="d-md-none">
        {renderMobileCardsBySection('A')}
        {renderMobileCardsBySection('B')}
      </div>
    </div>
  );
};

export default Onestaffreview;
