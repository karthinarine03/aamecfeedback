import catchAsynError from "../middleware/catchAsynError.js";
import Subjects from "../model/subjects.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getSubjectReview = catchAsynError(async(req,res,next)=>{
  

    const { section, subject } = req.body;

    const data = await Subjects.aggregate([
      // 1️⃣ Filter by subject name (if provided)
      ...(subject ? [{ $match: { subject: {$in: subject} } }] : []),
    
      // 2️⃣ Unwind the ratings array
      { $unwind: "$ratings" },
    
      // 3️⃣ Join student details using $lookup
      {
        $lookup: {
          from: "students", // collection name in MongoDB
          localField: "ratings.student",
          foreignField: "_id",
          as: "student"
        }
      },
    
      // 4️⃣ Flatten the joined student array
      { $unwind: "$student" },
    
      // 5️⃣ Filter by student.section (if provided)
      ...(section ? [{ $match: { "student.section": section } }] : []),
    
      // 6️⃣ Group back the ratings per subject
      {
        $group: {
          _id: "$_id",
          subject: { $first: "$subject" },
          ratings: {
            $push: {
              rating: "$ratings.rating",
              comment: "$ratings.comment",
              student: {
                _id: "$student._id",
                section: "$student.section"
              }
            }
          }
        }
      },
    
      // 7️⃣ Calculate average rating
      {
        $addFields: {
          avgRating: {
            $round: [{ $avg: "$ratings.rating" }, 0]
          }
        }
      }
    ]);

    if(data.length == 0){
        return next(new ErrorHandler("Not found subject or section",400))
    }
    
    res.status(200).json({
        data

    })
})

export const allSubjectReview = catchAsynError(async(req,res,next)=>{

})
