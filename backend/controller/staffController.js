import catchAsynError from "../middleware/catchAsynError.js";
import Subjects from "../model/subjects.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getSubjectReview = catchAsynError(async (req, res, next) => {
  const { section, subject } = req.body;

  const data = await Subjects.aggregate([
    // 1️⃣ Match by subject if provided
    ...(subject ? [{ $match: { subject: { $in: subject } } }] : []),

    // 2️⃣ Unwind ratings array
    { $unwind: "$ratings" },

    // 3️⃣ Join with student collection
    {
      $lookup: {
        from: "students",
        localField: "ratings.student",
        foreignField: "_id",
        as: "student"
      }
    },

    // 4️⃣ Flatten the joined student array
    { $unwind: "$student" },

    // 5️⃣ Match section if provided
    ...(section ? [{ $match: { "student.section": section } }] : []),

    // 6️⃣ Group back ratings with faculty included
    {
      $group: {
        _id: "$_id",
        subject: { $first: "$subject" },
        ratings: {
          $push: {
            rating: "$ratings.rating",
            comment: "$ratings.comment",
            faculty: "$ratings.faculty", // ✅ Add this line
            student: {
              _id: "$student._id",
              section: "$student.section"
            }
          }
        }
      }
    },

    // 7️⃣ Add average rating
    {
      $addFields: {
        avgRating: {
          $round: [{ $avg: "$ratings.rating" }, 0]
        }
      }
    }
  ]);

  if (data.length === 0) {
    return next(new ErrorHandler("Not found subject or section", 400));
  }

  res.status(200).json({
    data
  });
});

export const allSubjectReview = catchAsynError(async (req, res, next) => {
  const data = await Subjects.aggregate([
    // 1️⃣ Unwind the ratings array
    { $unwind: "$ratings" },

    // 2️⃣ Join student details
    {
      $lookup: {
        from: "students",
        localField: "ratings.student",
        foreignField: "_id",
        as: "student"
      }
    },

    // 3️⃣ Unwind joined student array
    { $unwind: "$student" },

    // 4️⃣ Group all reviews by subject
    {
      $group: {
        _id: "$_id",
        subject: { $first: "$subject" },
        ratings: {
          $push: {
            rating: "$ratings.rating",
            comment: "$ratings.comment",
            faculty: "$ratings.faculty",
            student: {
              _id: "$student._id",
              section: "$student.section"
            }
          }
        }
      }
    },

    // 5️⃣ Add average rating
    {
      $addFields: {
        avgRating: {
          $round: [{ $avg: "$ratings.rating" }, 1]
        }
      }
    }
  ]);

  if (data.length === 0) {
    return next(new ErrorHandler("No subject reviews found", 404));
  }

  res.status(200).json({ success: true, data });
});
