import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

const BASE_URL = 'http://localhost:3000/api/v1';
const STUDENT_ID = '682c988705d96c9746995b7a';

export default function () {
  const headers = {
    'Content-Type': 'application/json',
  };

  // 1. Test POST /subjects (fetch subjects filtered by semester & department)
  group('POST /subjects', () => {
    const payload = JSON.stringify({
      department: "IT",
      semester: 4,
    });

    const res = http.post(`${BASE_URL}/subjects`, payload, { headers });

    check(res, {
      'POST /subjects status is 200': (r) => r.status === 200,
      'POST /subjects returns filtered data': (r) => {
        try {
          const data = r.json();
          return Array.isArray(data.filtered);
        } catch {
          return false;
        }
      },
    });
  });

  // 2. Test GET /getallSubjectsReview (fetch all subject reviews)
  group('GET /getallSubjectsReview', () => {
    const res = http.get(`${BASE_URL}/getallSubjectsReview`);

    check(res, {
      'GET /getallSubjectsReview status is 200': (r) => r.status === 200,
      'GET /getallSubjectsReview returns data': (r) => {
        try {
          const data = r.json();
          return data.success === true && Array.isArray(data.data);
        } catch {
          return false;
        }
      },
    });
  });

  // 3. Test PUT /updatefeedback/:id (add/update rating for a student)
  group('PUT /updatefeedback/:id', () => {
    const payload = JSON.stringify({
      subjects: [
        {
          subject: "CS3452",
          rating: 4,
          comment: "Good explanation.",
          faculty: "Mrs. R. Priya",
          semester: 4
        }
      ]
    });

    const res = http.put(`${BASE_URL}/updatefeedback/${STUDENT_ID}`, payload, { headers });

    check(res, {
      'PUT /updatefeedback/:id status is 200': (r) => r.status === 200,
      'PUT /updatefeedback/:id returns student and subjectCollection': (r) => {
        try {
          const json = r.json();
          return json.student != null && json.subjectCollection != null;
        } catch {
          return false;
        }
      },
    });
  });
}
