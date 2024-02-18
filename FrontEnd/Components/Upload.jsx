import { useState } from "react";
import './Upload.css';
import image from '../../Images/image4.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function Upload(){
    const [filehandler,setFilehandler]=useState({});
     async function fileuploader  (file){
        const formData=new FormData();
        formData.append('file',file);
    const response=await axios.post('http://localhost:5000/upload',formData,{headers : {
        'Content-Type': 'multipart/form-data'
    }
})
    console.log(response.data);
    }
     const handleFormSubmit= async (e)=>{
        e.preventDefault();
        try{
            console.log(filehandler);
            for (let a of filehandler){
            fileuploader(a);
    }
    }
        catch(error){
            console.log("There is an error uploading a image "+error);
        }
        

     }
     const handleFileInput =(e)=>{
        
         setFilehandler(e.target.files);
     }
    return(
        <div className="upload_container">
    <form onSubmit={handleFormSubmit} className="form_container">

        <label htmlFor="fileinput">
            <img src={image} alt="Error loading image"></img>
        </label>
        <input type='file'  id="fileinput" onChange={handleFileInput} webkitdirectory="true"></input>
        <button type='submit' className="btn btn-primary" >Submit</button>
    </form>
    </div>
    );
}
export default Upload;