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
const updateReply=async (req,res)=>{
    try {
        const id=req.params.id;
        const inputValidation = replySchema.validate(req.body);
        if (inputValidation.error) return reportJoiError(inputValidation, res);
        const ReplyUpdate = await Reply.updateOne({ _id: id },req.body);
    
        if ( ReplyUpdate) {
          res.status(200).json({
            result: ReplyUpdate,
            message: "updating Reply successful",
          });
        } else {
          res.status(404).json({
            message: "updating Reply failed",
          });
        }
      } catch (error) {
        console.log("internal server error", error);
      } 
}
const deleteReply=async(req,res)=>{
    try{
        const id=req.params.id;
        const reply= await Reply.deleteOne({ _id: id });
        if (reply) {
          res.status(200).json({
            result: reply
          });
        } else {
          res.status(404).json({
            message: "reply not found"
          });
        }
      } catch (error) {
        console.error("Error while deleting reply:", error);
        res.status(500).json({
          message: "Internal server error"
        });
      }
}
export {postReply,getReply,updateReply,deleteReply}