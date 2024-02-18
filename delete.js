const mongoose=require('mongoose');
const Image=require('./DB/imageschema');
const express=require('express');
const app=express();
app.listen(6000,()=>{
    console.log("runnnig");
})
mongoose.connect('mongodb://127.0.0.1:27017/world')
.then(()=>{
  console.log("Connected to the database");
})
.catch((err)=>{
  console.log("error connecting to the database");
})
Image.deleteMany({})
.then(()=>{
    console.log("All images deleted succesfully");
})
.catch((err)=>{
    console.error("There is an error");
})