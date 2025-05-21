import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to data.json
const rawData = fs.readFileSync(path.join(__dirname, '../data/data.json'));
const data = JSON.parse(rawData);
export const coursecontroller = async(req, res) => {
  const { semester, section } = req.body; // <-- Add section from request
  console.log("Semester:", semester);
  console.log("Section:", section);
  console.log(data);

  const filtered =await  data
    .filter(entry => entry.semester == semester)
    .flatMap(entry =>
      entry.sections.filter(sec => sec.section == section)
    );

  res.status(200).json({
    filtered
  });
};
