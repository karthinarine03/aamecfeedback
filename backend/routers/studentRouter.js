import express from 'express';
import { addRating } from '../controller/studentController.js';

const router=express.Router();

router.route('/addRating').post(addRating);

export default router;