import express from 'express'
import dotenv from 'dotenv'
import errorMiddleware from "./middleware/errorMiddleware.js"
import courserouter from  './routers/courserouter.js'
import studentRouter from './routers/studentRouter.js'
import connectDatabase from './config/dbConnect.js'
const app = express()
connectDatabase()
dotenv.config({path : 'backend/config/config.env'})
app.use(express.json());

//connect db
connectDatabase()

app.use('/api',courserouter);
app.use('/api/v1/',studentRouter)

//middleware 
app.use(errorMiddleware)
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`It's running on the ${port} port`);
})