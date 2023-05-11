const express=require('express')
const connectDB = require('./config/db')
const testRouter=require('./Router/testRouter')
const cors=require('cors')


const app=express()

app.use(express.json())

connectDB();
app.use(
    cors({
    origin:"http://localhost:3000",
   credentials:true, 
}))

app.use('/',testRouter)

app.get('/',(req,res)=>{
    res.json('Server is Running')
    console.log('Server is Running');
}) 

const PORT=process.env.PORT || 8000

app.listen(PORT,console.log(`port is running at${PORT}`))