import express from 'express'
import dotenv from 'dotenv'
const app = express()

dotenv.config({path : 'backend/config/config.env'})


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`It's running on the ${port} port`);
})