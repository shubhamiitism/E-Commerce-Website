const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const fs=require('fs');
const multer=require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose=require('mongoose');
const Image=require('./DB/imageschema');
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT,()=>{
    console.log("Your server is listening on port ",process.env.PORT);
})
mongoose.connect('mongodb://127.0.0.1:27017/world')
.then(()=>{
  console.log("Connected to the database");
})
.catch((err)=>{
  console.log("error connecting to the database");
})
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
app.use(express.static('uploads'));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
  
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async(req, res) => {

  try{
  const { originalname, path,mimetype } = req.file;

 let result=await run(path,mimetype);
  const newImage=new Image({
    data:originalname,
    description:result,
    type:mimetype
  });
  newImage.save()
  .then((img)=>{

    res.send("Image uploaded successfully");
  })
  .catch((err)=>{
    console.log("There is an error uploading the image");
  })
  }
  catch(error){
    console.log("There is an error "+error);
    res.json('Error');
  }
});
app.post('/query',(req,res)=>{
  let {searchString}=req.body;
const regex = new RegExp(searchString, 'i');
  Image.find({'description':regex})
  .then((ele)=>{
    res.json(ele);
  })
  .catch((err)=>{
    res.json('Error in fetching elements');
  })

})
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}
async function run(filepath,filename) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Describe about this image";

  const imageParts = [
    fileToGenerativePart(filepath, filename),
    
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  return text;
}
  

