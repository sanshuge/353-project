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

    return ( 
      
      <div className='container'>

        <div className='form'>
      <h3> share your thoughts here </h3>

      <input className="input" type="text" placeholder="content" value={data} 
      onChange={e => setData(e.target.value)} />
      
      <button  onClick={handleNewPost}>submit</button>
      </div>
    
    <div className='messages'>
     <ul>
      {posts.map(post => (
        <ul key={post.ID}>
          {post.ID}  {post.data}
        </ul>
      ))}
    </ul> 
    </div>



</div>
    
  

 );

}
export default Messages;