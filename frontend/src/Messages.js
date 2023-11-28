import React from 'react';
import {useState,useEffect} from 'react';
import "./Style.css"
function Messages(){
    const [posts, setPosts] = useState([]);
  const [data, setData] = useState('');

  useEffect(() => {
    refresh();
}, []);

const refresh  = () =>  {
    fetch('http://localhost:3000/getposts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })


      .then(data => {
        setPosts(data.posts)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        
      });
  }; 

  const handleNewPost = () => {
    fetch('http://localhost:3000/addpost', {
      method: 'POST', 
      body: new URLSearchParams ({data:data}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
    .then(alert(`new post added`))
    .then(refresh())
    .catch(error => console.error(error)) 
    setPosts([...posts,{data}])  
    setData("");
   
    // console.log(posts)

    
    }

    return ( <div className="container">
      <div className='form'>
      <p>you can post here</p>
      <br></br>
   
      <input className = "input"type="text" placeholder="content" value={data} 
      onChange={e => setData(e.target.value)} />   
      <button className= "button"onClick={handleNewPost}>submit</button>
      </div>
   
         <div className='container'>
     <ul>
      {posts.map(post => (
        <li key={post.ID}>
          {post.ID} {post.post}
        </li>

      ))}
    </ul> 
    </div>

    
  

  </div>);

}
export default Messages;