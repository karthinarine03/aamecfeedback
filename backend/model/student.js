import mongoose from "mongoose";

const Students  = new mongoose.Schema({
    reg :{
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    section : {
        type : String,
        required : true
    },
    sem : {
        type : Number,
        required : true
    },
    dept : {
        type : String
    },
    subjects : [
        {
            subject : {
                type : String,
            },
            rating : {
                type : Number
            },
            comment : {
                type : String
            }
        }
    ]
},{timestamps: true})

export default (mongoose.model("Student",Students))
