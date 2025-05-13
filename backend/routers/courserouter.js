import express from 'express';
import { coursecontroller } from '../controller/coursecontroller.js';

const router=express.Router();

router.route('/subjects').post(coursecontroller);

export default router;