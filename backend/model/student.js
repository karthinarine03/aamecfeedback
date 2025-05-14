import mongoose from "mongoose";

// const Student = new mongoose.Schema({
//     userId : {
//         type : mongoose.Schema.Types.ObjectId,
//     },
//     registerNumber : {
//         type : Number,
//         required : true
//     },
//     section :{
//         type : String,
        
//     },
//     score :{
//         type : Number,
//         required : true
//     },
//     comment : {
//         type : String,
//         required : true
//     }
// })

// const Subjects = new mongoose.Schema({
//     subject : {
//         type : String,
//         required : true
//     },
//     students: [Student]
// })

// const Sem = new mongoose.Schema({
//     subject :[Subjects]
// })

// const Dept = new mongoose.Schema({
//     semester : [Sem]
// })

// export default (mongoose.model("Dept",Dept))

const Students  = new mongoose.Schema({
    reg :{
        type : String,
        required : true
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
                type : String
            },
            rating : {
                type : Number
            }
        }
    ]
})

export default (mongoose.model("Student",Students))
