import express from 'express';
import { addRating, getstudent, updatesubjects } from '../controller/studentController.js';

const router=express.Router();

router.route('/addRating').post(addRating);
router.route('/updatefeedback/:id').put(updatesubjects);
router.route("/getstudent/:id").get(getstudent)

export default router;