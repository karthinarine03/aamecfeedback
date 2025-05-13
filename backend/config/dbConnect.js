import mongoose from "mongoose";

const connectDatabase = ()=>{
    mongoose.connect('mongodb+srv://thiruvenkatasamyiyya:thiruvenkatam@cluster0.i16j9.mongodb.net/feedback')
    .then((con)=>{
        console.log(`Mongodb is conntected successfully in ${con.connection.host}`);
    })
}

export default connectDatabase