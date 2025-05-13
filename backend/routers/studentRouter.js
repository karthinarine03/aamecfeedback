import express from 'express';
import { addRating, deletestudent, updatesubjects } from '../controller/studentController.js';

const router=express.Router();

router.route('/addRating').post(addRating);
router.route('/updatefeedback/:id').put(updatesubjects);
router.route("/deletestudent/:id").delete(deletestudent)

export default router;