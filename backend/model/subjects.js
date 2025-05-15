import mongoose from "mongoose";

const Subjects = new mongoose.Schema({
    subject : {
        type : String
    },
    ratings : [
        {
            student : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Student",
                unique : true
            },
            rating : {
                type : Number
            },
            comment : {
                type : String
            },
            faculty:{
                type:String
            }
        }
    ]
},{timestamps : true})

export default (mongoose.model("Subjects",Subjects))