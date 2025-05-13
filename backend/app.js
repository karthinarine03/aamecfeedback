import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './config/dbConnect.js'
const app = express()

dotenv.config({path : 'backend/config/config.env'})


//connect to db
connectDatabase()

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`It's running on the ${port} port`);
})