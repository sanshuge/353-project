import React from 'react';
import {useState,useEffect} from 'react';

function Messages(){
    const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState('');
  const [data, setData] = useState('');
  useEffect(() => {
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
  }, []); 

  const handleNewPost = () => {
    fetch('http://localhost:3000/addpost', {
      method: 'POST', 
      body: new URLSearchParams ({topic : topic,data:data}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      
    })
    .then(response => response.json())
    .then(alert(`new post added`))
    .catch(error => console.error(error))
    setData("");
    setTopic("");  
    setPosts([...posts,{topic,data}])  
    console.log(posts)

    
    }

    return ( <div className="p">
    <h3> AddPosts </h3>
      <div>
      
      {/* <input type="text" placeholder="topic" value={topic} 
      onChange={e => setTopic(e.target.value)} /><br/> */}
      <input className="input" type="text" placeholder="content" value={data} 
      onChange={e => setData(e.target.value)} />
      </div>
      <button className="button" onClick={handleNewPost}>submit</button>
         
    <h3>all my posts:</h3> 
     <ul>
      {posts.map(post => (
        <ul key={post.ID}>
          {post.ID}  data:{post.data}
        </ul>
      ))}
    </ul> 

    
  

  </div>);

}
export default Messages;