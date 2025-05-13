import express from 'express'
import dotenv from 'dotenv'
import courserouter from  './routers/courserouter.js'
const app = express()

dotenv.config({path : 'backend/config/config.env'})
app.use(express.json());

app.use('/api',courserouter);
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`It's running on the ${port} port`);
})