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

export const updatesubjects = catchAsynError(async (req, res, next) => {
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
res.json({
    data
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
