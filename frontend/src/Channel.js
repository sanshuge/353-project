import React from 'react';
import {useState,useEffect} from 'react';
import Message from './Message';
import axios from 'axios'
/**
 * this component is for showing all the messages in this channel and allow user to create channel
 */
import "./Style.css"
function Channel(){

  const [posts, setPosts] = useState([]);
  const [data, setData] = useState('');
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect (()=>{
    refresh();
  },[])
const refresh=async()=>{
  const res = await axios.get("http://localhost:3000/getposts",
  {
    headers:{
      "Content-Type":"application/json"
    }
  }
  );
  if (res.data.status==201) {
    console.log(res)

    setPosts(res.data.data)
  }
  else {console.log('error')}
}


  const handleNewPost=async(e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image",image);
    formdata.append("data",data);

    const config = {headers:{
      "Content-Type":"multipart/form-data"
    }}
    const res = await axios.post('http://localhost:3000/addpost',formdata,config);
    console.log(res);
    alert("new post is added")
    setData('');
    setImage('');
    setImagePreview('');
    refresh();
  }
  


  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }}


  
   
    return ( <div className="container">
      <div className='form'>
      <p>you can post here</p>
      <br></br>
   
      <input className = "input"type="text" placeholder="content" value={data} 
      onChange={e => setData(e.target.value)} />  

      <input type="file" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px' }} />}


      <button className= "button"onClick={handleNewPost}>submit</button>


      </div>
   
         <div className='container'>

     <ul>
      {posts.map(post => (
        <li key={post.postID}>
           {post.post} 
           <br></br>

         <img src={`http://localhost:3000/images/${post.image}` } style={{ maxWidth: '200px' }} ></img>
           <Message/>
        </li>
        
      
      ))}

      
    </ul> 
    </div>

    
  

  </div>);

}
export default Channel;