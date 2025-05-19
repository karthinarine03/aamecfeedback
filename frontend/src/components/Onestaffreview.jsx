import React, { useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useGetAllSubjectsReviewQuery } from '../redux/api/staffApi';
import { useGetFacultyDeptMutation } from '../redux/api/courseApi';

const Onestaffreview = () => {
  const tableRef = useRef(null)
  const { data, error, isLoading } = useGetAllSubjectsReviewQuery();
  const [getFacultyDept,{data:facultyData,error:facultError}] = useGetFacultyDeptMutation()
  const [selectedSemester, setSelectedSemester] = useState('');

  console.log(data);
  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  if (isLoading) return <p className="text-center my-4">Loading subject reviews...</p>;
  if (error) return <p className="text-center text-danger my-4">Error loading reviews.</p>;
  if (!data || !data.data) return <p className="text-center text-muted my-4">No data available.</p>;

  const getDept =(faculty) =>{
    // e.preventDefault()
    const value = {
      faculty
    }
    getFacultyDept(value)
  }

  console.log(facultError);
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
        const avgRating = parseFloat(avg.toFixed(1));
        const avgPercentage = Math.round((avgRating / 5) * 10); // percentage from rating out of 5
        return {
          ...fac,
          avgRating,
          avgPercentage,
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
    <div className="table-responsive shadow rounded mb-5">

      <DownloadTableExcel
          filename="staff table"
          sheet="staff"
          currentTableRef={tableRef.current}
      >

          <button> Export excel </button>

      </DownloadTableExcel>
      <h4 className="text-center bg-light py-3 fw-bold rounded-top" >Section {sectionName}</h4>
      <table  className="table table-bordered table-hover align-middle mb-0" >
        <thead className="table-dark text-center">
          <tr>
            <th className="text-start px-4">Subject</th>
            <th className="text-start px-4">Faculty</th>
            <th className="text-start px-4">Department</th>
            <th className="text-center">Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map(subject => {
            const sectionData = subject.sectionRatings.find(sec => sec.section === sectionName);
            if (!sectionData) return null;

            return sectionData.facultyRatings.map((fac, index) => (
              <tr key={`${subject._id}-${sectionName}-${fac.faculty}-${index}`}>
                <td className="text-start px-4">{subject.subject}</td>
                <td className="text-start px-4">{fac.faculty}</td>
                <td className="text-start px-4">{}</td>
                <td className="text-center">
                  <span className="badge bg-success fs-6 me-2">{fac.avgPercentage}%</span>
                  <i className="bi bi-star-fill me-1 text-warning"></i>
                  <small>{fac.avgRating}</small>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
      {/* table for excel */}
      <table ref={tableRef} style={{ display: 'none' }}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Faculty</th>
            <th>Avg Percentage</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map(subject =>
            subject.sectionRatings.map(section =>
              section.facultyRatings.map(fac => (
                <tr key={`export-${subject._id}-${section.section}-${fac.faculty}`}>
                  <td>{subject.subject}</td>
                  <td>{fac.faculty}</td>
                  <td>{fac.avgPercentage}%</td>
                </tr>
              ))
            )
          )}
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
        avgPercentage: fac.avgPercentage,
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
              <p className="mb-0">
                <span className="badge bg-success">{item.avgPercentage}%</span>{' '}
                <i className="bi bi-star-fill me-1 text-warning"></i>
                <span>{item.avgRating}</span>
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
          {[3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>{`Semester ${sem}`}</option>
          ))}
        </select>
      </div>

      {/* Desktop Table View */}
      <div className="d-none d-md-block">
        {renderTableBySection('A')}
        {renderTableBySection('B')}
      </div>

      {/* Mobile Card View */}
      <div className="d-md-none">
        {renderMobileCardsBySection('A')}
        {renderMobileCardsBySection('B')}
      </div>
    </div>
  );
};

export default Onestaffreview;
