import express from "express"
import { getSubjectReview } from "../controller/staffController.js"

const router = express.Router()

router.route('/getSubjectReview/:subject').get(getSubjectReview)

export default router