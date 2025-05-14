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
            },
            comment : {
                type : String
            }
        }
    ]
})

export default (mongoose.model("Subjects",Subjects))