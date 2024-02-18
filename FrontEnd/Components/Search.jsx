import './Search.css';
import ImgELe from './ImgELe';
import axios from 'axios';
import { useState,useEffect } from 'react';
function Search(){
    const[input,setinput]=useState("");
    const[imgelements,setimgelements]=useState([]);
   function handleInput(e){
    setinput(e.target.value);
   }
   async function handleSearch(){
          let response=await axios.post("http://localhost:5000/query",{'searchString':input});
          
          setimgelements(()=>{
            return response.data;
          });
         
   }
   useEffect(()=>{
    console.log(imgelements);
  },[imgelements]);
  
    return(
       <>
        <div className="search-container">
     <input type="text" id="search-input" placeholder="Search..."  onChange={handleInput} value={input}/>
     <button id="search-button" onClick={handleSearch}>Search</button>
     </div>
     <div className='img-container'>
        {imgelements.map((ele)=>{
            return <ImgELe key={ele._id} data={ele.data}></ImgELe>
        })}
     </div> 
     </>
    )
}
export default Search;