import "./Sidebar.css";
import {useContext, useEffect} from "react";
import { MyContext } from "./MyContext";
import { v4 as uuidv4 } from 'uuid';

function Sidebar(){

  const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChats}=useContext(MyContext);

  const getALLThreads =async()=>{
    try{
      const response= await fetch("https://chatbot-ujeo.onrender.com/api/thread");
      const res = await response.json(); 
      const filterData = res.map(thread=>({threadId: thread.threadId ,tittle: thread.tittle}));
      //console.log(filterData);
      setAllThreads(filterData);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getALLThreads();
  },[currThreadId]);

  const createNewChat=()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
    
  }

  const changeThread=async(newThreadId)=>{
     setCurrThreadId(newThreadId);
     try{
      const response=await fetch(`https://chatbot-ujeo.onrender.com/api/thread/${newThreadId}`);
      const res =await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);

     }catch(err){
      console.log(err);
     }
  }

  const deleteThread=async(threadId)=>{
    try{
      const response=await fetch(`https://chatbot-ujeo.onrender.com/api/thread/${threadId}`,{method:"DELETE"});
      const res =await response.json();
      console.log(res);

      //updated threads re-render
      setAllThreads(prev=>prev.filter(thread=>thread.threadId !=threadId));

      if(threadId==currThreadId){
        createNewChat();
      }

    }catch(err){
      console.log(err);
    }
  }

    return(
      <section className="sidebar">
         <button onClick={createNewChat}>
          <img src="src/assets/blacklogo.png" alt="gptlogo" className="logo"></img>
          <span><i className="fa-solid fa-pen-to-square"></i></span>
         </button>

         <ul className="history">
          {
            allThreads?.map((thread,idx)=>(
              <li key={idx} 
                onClick={()=>changeThread(thread.threadId)}
                className={thread.threadId==currThreadId?"highlighted":""}
                >
                  {thread.tittle}
                  <i className="fa-solid fa-trash"
                  onClick={(e)=>{
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}
                  ></i>
              </li>
            ))

          }
         </ul>
         <div className="sign">
          <p>Created By Sunny 😎</p>
         </div>
      </section>
    )
}
export default Sidebar;