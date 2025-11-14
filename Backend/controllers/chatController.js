import Thread from "../models/thread.js";
import askGroq from "../utils/aiClient.js";

export const createThread=async(req,res)=>{
    try{
      const thread =new Thread({
        threadId:"ds",
        tittle:"testing new thread 5",
      });
      const response = await thread.save();
      res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to save in DB"})
    }
}

export const getThread=async(req,res)=>{
    try{
    const threads=await Thread.find({}).sort({updatedAt:-1}); //-1 means descending order
    //descending order of updated at
    res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});
    }
}


export const getThreadByID=async(req,res)=>{
    const {threadId}= req.params;
    try{
      const thread=await Thread.findOne({threadId});
      if(!thread){
       res.status(404).json({error:"thread not found"});
      }
      res.json(thread.messages);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to thread by ID"});
    }
}

export const deleteThreadByID=async(req,res)=>{
    const {threadId}=req.params;
    try{
        const deletedThread =await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error:"thread not found"});
        }
        res.status(200).json({sucess:"Thread deleted sucessfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to delete thread"});
    }
}

export const handleChat=async(req,res)=>{
    const {threadId,message}=req.body;
    
    if(!threadId|| !message){
        res.status(400).json({error:"missing required fields"});
    }
     try{
        let thread = await Thread.findOne({threadId});
        if(!thread){
            //create a new thread since it doesnt exist
            thread= new Thread({
                threadId,
                tittle:message,
                messages:[{role:"user", content:message}]
            })
        }
        else{
            thread.messages.push({role:"user", content:message})
        }

        const aiReply =await askGroq(message);
        thread.messages.push({role:"assistant", content:aiReply});
        thread.updatedAt=new Date();
        await thread.save();

        res.json({reply:aiReply});

     }catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong"});
     }
}