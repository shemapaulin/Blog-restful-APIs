import Comment from "../Models/comment.js";

import { commentSchema } from "../Utils/validations/commonValidations.js";
import reportJoiError from "../Utils/functions/reportError.js";


const postComment=async(req,res)=>{
   try {
    const validation=commentSchema.validate(req.body);
    if(validation.error) return reportJoiError(validation,res)

    const addComment= await Comment.create(req.body);

    if(addComment){
        res.status(200).json({
            message:"comment added!",
            result: addComment
        })
    }else{
        res.status(404).send("commenting failed!")
    }
   } catch (error) {
    res.status(500).send("internal server error")
    console.log("internal server error",error);
   }
}

const getComment=async(req,res)=>{
    try {
        const id=req.params.id
        const comment = await  Comment.findOne({ _id: id });
        if (comment ) {
          res.status(200).json({
            result: comment 
          });
        } else {
          res.status(404).json({
            message: "comment not found"
          });
        }
      } catch (error) {
        console.error("Error while fetching comment:", error);
        res.status(500).json({
          message: "Internal server error"
        });
      }
}

const updateComment=async(req,res)=>{
    try {
        const id=req.params.id;
        const inputValidation = commentSchema.validate(req.body);
        if (inputValidation.error) return reportJoiError(inputValidation, res);
        const commentUpdate = await Comment.updateOne({ _id: id },req.body);
    
        if ( commentUpdate) {
          res.status(200).json({
            result: req.body,
            message: "updating comment successful",
          });
        } else {
          res.status(404).json({
            message: "updating comment failed",
          });
        }
      } catch (error) {
        console.log("internal server error", error);
      } 
}
const deleteComment=async(req,res)=>{

    try{
      const id=req.params.id;
      const comment = await Comment.deleteOne({ _id: id });
      if (comment) {
        res.status(200).json({
          result: comment
        });
      } else {
        res.status(404).json({
          message: "comment not found"
        });
      }
    } catch (error) {
      console.error("Error while deleting comment:", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
     }

export {postComment,getComment,updateComment,deleteComment}