import { useState } from "react";

function Message(){
    const [reply,setReply] = useState('');
    const [likes,setLikes]= useState(0);
    const [dislikes,setDislikes] = useState(0);

    const handleLikes=()=>{
        setLikes(likes+1) ;

    }
    const handleDislikes =()=>{
        setDislikes ( dislikes+1);

    }
    const handleSubmit =()=>{
        setReply("")

    }
        

    return (

        <div>
    <input className = "input"type="text" placeholder="reply" value={reply} 
    onChange={e => setReply(e.target.reply)}/>   
      <button className= "button" onClick={handleSubmit} >submit</button>

      <button onClick={handleLikes}>{likes}likes</button>
      <button onClick={handleDislikes}>{dislikes}dislikes</button>
      {reply}
        </div>
    );

}
export default Message;