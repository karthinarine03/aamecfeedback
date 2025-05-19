import express from 'express';
import { coursecontroller,staffDept } from '../controller/coursecontroller.js';

const router=express.Router();

router.route('/subjects').post(coursecontroller);
router.route('/facultyDept').post(staffDept);

export default router;