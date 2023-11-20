import { Router } from "express";

import { deletePost, getPost, getPosts, updatePost, uploadAndCreatePost } from "../Controllers/post.js";



const router=Router();

router.post("/createPost",uploadAndCreatePost);
router.get("/getPost/:id",getPost);
router.get("/getPosts",getPosts)
router.put("/updatePost/:id",updatePost);
router.delete("/deletePost/:id",deletePost);


const postRoutes=router;
export default postRoutes;