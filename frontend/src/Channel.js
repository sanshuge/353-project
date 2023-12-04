import React from 'react';
import {useState,useEffect} from 'react';
import Message from './Message';
import axios from 'axios'
/**
 * this component is for showing all the messages in this channel and allow user to create channel
 */
import "./Style.css"
function Channel(){
  // const { channelID, channel } = useParams();

  const [posts, setPosts] = useState([]);
  const [data, setData] = useState('');
  // const [replies,setReplies] = useState([]);
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


// const refresh  = () =>  {
//     fetch('http://localhost:3000/getposts')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setPosts(data.posts)
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
        
//       });
//   }; 
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
  // const handleNewImage =()=>{
  //   const formdata  = new FormData();
  //   formdata.append('image',image);
  //   axios.post("http://localhost:3000/upload",formdata)
  //   .then(res=>{
  //     if (res.data.Status === "success"){console.log("good job")}
  //     else{console.log("failed")}
  //   })
  //   .catch(err=>console.log(err))

  // }
// const getImage =()=>{
//   axios.get("http://localhost:3000/getposts")
//   .then(res=>{setImage(res.image[0])})
//   .catch(err=>console.log(err))}


  // const handleNewPost = () => {

  //   fetch('http://localhost:3000/addpost', {
  //     method: 'POST', 
  //     body: new URLSearchParams ({data:data}),
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },     
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  // })
  //   .then(alert(`new post added`))
  //   .then(refresh())
  //   .catch(error => console.error(error)) 
  //   setPosts([...posts,{data,image}])  
  //   setData("");
  //   // setImage(null)
  //   setImagePreview(null)
    
  // }


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
      {/* <button onClick={handleImageUpload}>upload</button> */}
      {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px' }} />}


      <button className= "button"onClick={handleNewPost}>submit</button>


      </div>
   
         <div className='container'>




     <ul>
      {posts.map(post => (
        <li key={post.postID}>
           {post.post} 
           <br></br>
         {/* {<img src={`images\image_1701705362273.jpg` }  style={{ maxWidth: '200px' }} />} */}

         <img src={`http://localhost:3000/images/${post.image}` } style={{ maxWidth: '200px' }} ></img>
           <Message/>
        </li>
        
      
      ))}

      
    </ul> 
    </div>

    
  

  </div>);

}
export default Channel;