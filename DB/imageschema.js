
const mongoose=require('mongoose');

const imgschema=new mongoose.Schema({
    
    
    data : String,
    description:String,
    type:String
})

const Image=mongoose.model('Image',imgschema);

module.exports=Image;