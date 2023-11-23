import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import"./Style.css"
export const Channels = () => {
    const [channels,setChannels] = useState([]);
    const [newChannel,setNewChannel] = useState('');

    useEffect(() => {
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
      }, []); 


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
        .catch(error => console.error(error)) 
         setNewChannel("");
        setChannels([...channels,newChannel])  
        console.log(" all the channels:", channels); 
        
        }

return (
    
<div className="p">

<div>
{channels.map(channel => (
        <ul key={channel.ID}>  
       {channel.ID}      
        channel:{channel.channel}        
          <Link to={`/channels/${channel.ID}/${channel.channel}`}>Go to this channel</Link>
        
        </ul>
      ))}
   <input className="input"type="text" placeholder="name your channel" value={newChannel} 
   onChange={(e) => setNewChannel(e.target.value)} />
 <button  className="button"onClick={createChannel}>Create Channel</button>
                </div>


</div>)


}
export default Channels;