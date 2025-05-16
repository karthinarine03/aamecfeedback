import express from "express"
import { allSubjectReview, getSubjectReview } from "../controller/staffController.js"

const router = express.Router()

router.route('/getSubjectReview').get(getSubjectReview)
router.route('/getallSubjectsReview').get(allSubjectReview)
export default router