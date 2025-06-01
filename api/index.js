import express from 'express'
import mongoose from 'mongoose';
import 'dotenv/config'

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to mongoDB');
    
}).catch((err)=>{
    console.log(err);
    
})

const app = express()

app.listen(3000,()=>{
    console.log('Server is listennig on port 3000!');
    
})

