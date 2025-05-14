import catchAsynError from "../middleware/catchAsynError.js"
import Student from "../model/student.js"
import Subjects from "../model/subjects.js"
import ErrorHandler from "../utils/ErrorHandler.js"

export const addRating = catchAsynError(async(req,res,next)=>{
    const detail = req.body

    const data = await Student.create(req.body)

    if(!data){
        return next(new ErrorHandler("cannot create",400))
    }
    res.status(200).json({
        data
    })
})

export const updatesubjects = catchAsynError(async (req, res, next) => {

    const {subjects} = req.body

    if(!Array.isArray(req.body.subjects)){
        return next(new ErrorHandler("SUBJECT IS ONLY IN ARRAY",404))
    }

    const data=await Student.findByIdAndUpdate(
        {_id:req.params.id},
        {$push:{subjects:{$each:req.body.subjects}}},
        {new:true,runValidators:true})
    
    if(!data){
        return next (new(ErrorHandler("CANNOT UPDATE",404)))
    }
    
    // add to Subjects collection
    const {subject,rating} = subjects[0]
    const sub = await Subjects.findOne({subject : subject})

    if(sub){
        sub.ratings.push({
            student : data._id,
            rating
        })
    }

    await sub.save()

    const subcoll = await Subjects.create({
        subject,
        ratings : [{
            student : data._id,
            rating
        }]
    })

    res.json({
        data,
        subcoll,
        sub
    })
});

export const deletestudent=catchAsynError(async(req,res,next)=>{
    const data=await Student.findByIdAndDelete({_id:req.params.id});
    if(!data){
        return next(new ErrorHandler("no student",400))
    }
    res.json({
        data
    })
})
