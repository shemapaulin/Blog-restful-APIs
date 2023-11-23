
import Post from "../Models/post.js";
import reportJoiError from "../Utils/functions/reportError.js";
import {imagePostSchema}from "../Utils/validations/commonValidations.js";
import { updateUser } from "./user.js";


const uploadAndCreatePost = async (req, res) => {
    try {
          const { user, caption, image } = req.body;
          const dataToValidate = { user, image, caption };
          const validation = imagePostSchema.validate(dataToValidate);
  
          if (validation.error) return reportJoiError(validation)
  
          const postCreate = await Post.create(dataToValidate);
  
          if (postCreate) {
            res.status(200).json({
              result: postCreate,
              message: "Post created successfully",
            });
          } else {
            res.status(404).send("Creating post totally failed");
          }
        }
      
     catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  const getPost=async(req,res)=>{
   try {
    const id=req.params.id;
    const viewPost=await Post.findById(id);
    if(viewPost){
      res.status(200).json({
        result: viewPost,
       
      })
    }else{
      res.status(404).send("post not found")
    }
   } catch (error) {
    res.status(500).send("internal server error")
    console.log("internal server error",error);

   }

  }
  const updatePost=async (req,res)=>{
    try {
      const id=req.params.id;
      const { user, caption, image } = req.body;
      const dataToValidate = { user, image, caption };
      const validation = imagePostSchema.validate(dataToValidate);
      if (validation.error) return reportJoiError(validation)
      const postUpdate = await Post.updateOne({ _id: id },req.body);
    if(postUpdate){
      res.status(200).json({
        result: postUpdate,
        message:"you've succesfully updated post"
      })
    }else{
      res.status(404).send("failed not update the post")
    }
    } catch (error) {
      res.status(500).send("internal server error")
      console.log("internal server error",error);
    }
   

  }
  const getPosts=async(req,res)=>{
    try {
      const getAll=await Post.find()
      if(getAll) return res.status(200).send("post deleted")
      else{
    return res.status(404).send("post not found")
    }
    } catch (error) {
      console.log("internal server error",error);
    }
  }
  const deletePost=async(req,res)=>{
    try{
      const id=req.params.id;
      const popPost = await Post.deleteOne({ _id: id });
      if (popPost) {
        res.status(200).json({
          message: "post deleted"
        });
      } else {
        res.status(404).json({
          message: "post not found"
        });
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  }
export {uploadAndCreatePost,getPost,updatePost,deletePost,getPosts}  
