import Reply from "../Models/reply.js";

import { replySchema } from "../Utils/validations/commonValidations.js";
import reportJoiError from "../Utils/functions/reportError.js";



const postReply=async(req,res)=>{
  try {
    const validation=replySchema.validate(req.body)
    if(validation.error)return reportJoiError(validation,res)

    const addReply=await Reply.create(req.body);
    if(addReply){
        res.status(200).json({
            message:"reply added on comment",
            result: addReply
        })
    }else{
        res.status(404).send("failed")
    }
  } catch (error) {
    console.log("internal server error",error);
  }
}

const getReply=async (req,res)=>{
    try {
        const id=req.params.id;
        const viewReply=await Reply.findById(id);
        if(viewReply){
          res.status(200).json({
            result: viewReply,
           
          })
        }else{
          res.status(404).send("reply not found")
        }
       } catch (error) {
        res.status(500).send("internal server error")
        console.log("internal server error",error);
    
       }
    
}
export {postReply,getReply}