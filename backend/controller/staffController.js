import catchAsynError from "../middleware/catchAsynError.js";
import Subjects from "../model/subjects.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getSubjectReview = catchAsynError(async(req,res,next)=>{
    const {subject} = req.params
    const data = await Subjects.findOne({subject})

    if(!data){
        return next(new ErrorHandler("Not find subject"))
    }

    //get the average rating
    const total = []
    const {ratings} = data
    ratings.forEach(e=>{
        total.push(e.rating)
    })
    const totalRating = Math.round(total.reduce((acc,curr)=> acc+curr ,0)/total.length)


    res.status(200).json({
        totalRating,
        data

    })
})

