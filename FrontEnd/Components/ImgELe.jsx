import './imgELe.css';
function ImgELe(props){
    
    let blob = new Blob(props.array, { type: 'image/jpeg' });
   console.log(blob);
    const imgUrl = URL.createObjectURL(blob);
  
   return (
    <div className="img-element">
        <img src={'http://localhost:5000/'+props.data} alt='Error showing the image'></img>
    </div>
   );
}
export default ImgELe;