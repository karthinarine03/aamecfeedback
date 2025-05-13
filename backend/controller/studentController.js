import catchAsynError from "../middleware/catchAsynError.js"
import Student from "../model/student.js"
import ErrorHandler from "../utils/ErrorHandler.js"

export const addRating = catchAsynError(async(req,res,next)=>{
    const detail = req.body
    console.log(detail);
    const data = await Student.create(req.body)

    if(!data){
        return next(new ErrorHandler("cannot create",400))
    }
    res.status(200).json({
        data
    })
})

