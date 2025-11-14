import express from "express";
import Thread from "../models/thread.js"
const router = express.Router();

router.post("/test",async(req,res)=>{
    try{
      const thread =new Thread({
        threadId:"xyz",
        tittle:"testing new thread",
      });
      const response =await thread.save();
      res.send(response);
    }catch(err){
       console.log(err);
       res.status(500).json({error:"failed to save in DB"});
    }
});

export default router;
