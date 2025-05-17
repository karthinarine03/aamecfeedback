import express from 'express';
import { addRating, getStudent, updatesubjects } from '../controller/studentController.js';

const router=express.Router();

router.route('/addRating').post(addRating);
router.route('/updatefeedback/:id').put(updatesubjects);
router.route("/getStudent/:id").get(getStudent)

export default router;