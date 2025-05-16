import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to data.json
const rawData = fs.readFileSync(path.join(__dirname, '../data/data.json'));
const data = JSON.parse(rawData);
export const coursecontroller = (req, res) => {
  const { semester, section } = req.body; // <-- Add section from request
  console.log("Semester:", semester);
  console.log("Section:", section);

  const filtered = data
    .filter(entry => entry.semester == semester)
    .flatMap(entry =>
      entry.sections.filter(sec => sec.section === section)
    );

  res.json({
    filtered
  });
};
