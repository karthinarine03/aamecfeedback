import mongoose from "mongoose";

const Subjects = new mongoose.Schema({
    subject : {
        type : String
    },
    ratings : [
        {
            student : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Student"
            },
            rating : {
                type : Number
            }
        }
    ]
})

export default (mongoose.model("Subjects",Subjects))