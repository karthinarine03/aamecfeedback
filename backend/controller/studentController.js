import catchAsynError from "../middleware/catchAsynError.js"
import Student from "../model/student.js"
import Subjects from "../model/subjects.js"
import ErrorHandler from "../utils/ErrorHandler.js"

export const addRating = catchAsynError(async(req,res,next)=>{
    const detail = req.body

    const data = await Student.find({reg : req.body.reg})
    if(data.length == 0){
        const data = await Student.create(req.body)

        return res.status(200).json({
            data
        })
    }

    if(!data){
        return next(new ErrorHandler("cannot create",400))
    }
    res.status(200).json({
        data
    })
})

export const updatesubjects = catchAsynError(async (req, res, next) => {
  try {
    const { subjects } = req.body;

    if (!Array.isArray(subjects)) {
      return next(new ErrorHandler("Subjects must be an array", 400));
    }

    if (subjects.length === 0) {
      return next(new ErrorHandler("Subjects array is empty", 400));
    }

    // Get student by ID from URL param
    const student = await Student.findById({_id:req.params.id});
    if (!student) {
      return next(new ErrorHandler("Student not found", 404));
    }

    // Extract the first subject rating (you can modify this to support multiple ratings at once)
    const subToAdd = subjects[0];
    const { subject, rating, comment, faculty, semester } = subToAdd;

    if (!subject || !semester) {
      return next(new ErrorHandler("Subject and semester are required", 400));
    }

    // Check if this subject is already rated by student
    const isExist = student.subjects.some((s) => s.subject === subject);
    if (isExist) {
      return next(new ErrorHandler("Subject already rated", 400));
    }

    // Add the new subject rating to the student's record
    student.subjects.push(subToAdd);
    await student.save();

    // Prepare new rating object including semester
    const newRating = {
      student: student._id,
      rating,
      comment,
      faculty,
      semester, // ✅ include semester inside the rating
    };

    // Check if subject already exists in the Subjects collection
    let subDoc = await Subjects.findOne({ subject, semester });

    if (subDoc) {
      subDoc.ratings.push(newRating);
      await subDoc.save();
    } else {
      // Create new subject document with initial rating
      subDoc = await Subjects.create({
        subject,
        semester,
        ratings: [newRating],
      });
    }

    res.status(200).json({
      student,
      subjectCollection: subDoc,
    });

  } catch (error) {
    console.error("Error in updatesubjects:", error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const getStudent=catchAsynError(async(req,res,next)=>{
    const data=await Student.findById({_id:req.params.id});
    if(!data){
        return next(new ErrorHandler("no student",400))
    }
    res.json({
        data
    })
})
