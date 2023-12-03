import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import"./Style.css"


/**
 * 
 * this is channels component where user can see or create channel
 */
export const Channels = (props) => {
    const [channels,setChannels] = useState([]);
    const [newChannel,setNewChannel] = useState('');
    useEffect(() => {
      refresh();
  }, []);


    const refresh  = () =>  {
        fetch('http://localhost:3000/getChannels')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          
          .then(data => {
            setChannels(data)
          })
          
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            
          });
      }; 


      const createChannel = () => {
        // console.log("New channel before fetch:", newChannel); 
        fetch('http://localhost:3000/addNewChannel', {
          method: 'POST', 
          body: new URLSearchParams ({newChannel : newChannel
        }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          
        })
      
        .then(response => response.json())
        .then(alert(`new channel added`))
        .then(refresh())
        .catch(error => console.error(error)) 
         setNewChannel("");
        setChannels([...channels,newChannel])  
        console.log(" all the channels:", channels); 
        
        }

return (
    
<div className="container">
{/* <p>hello {props.user.username}</p> */}
<div className='form'>
<p>Join the channels or create your own channel!</p>

<input className = "input"type="text" placeholder="name your channel" value={newChannel} 
   onChange={(e) => setNewChannel(e.target.value)} />
 <button className= "button"  onClick={createChannel}>Create Channel</button>
</div>
<div className='channels'>
{channels.map(channel => (
        <ul key={channel.channelID}>  
     
        
          <Link to={`/channels/${channel.channelID}/${channel.channel}`}> {channel.channel}       </Link>
        
        </ul>
      ))}
   
                </div>

                </div>
)


}
export default Channels;