import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to data.json
const rawData = fs.readFileSync(path.join(__dirname, '../data/data.json'));
const data = JSON.parse(rawData);
export const coursecontroller=(req,res)=>{
  const { semester } = req.body;
  console.log(semester);
  console.log(data);
  const filtered = data.filter(subject =>
    subject.semester == semester 
  );

  res.json({
    filtered
  });
  
}