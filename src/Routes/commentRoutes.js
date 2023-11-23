import { Router } from "express";

import { postComment,getComment,updateComment,deleteComment } from "../Controllers/comment.js";





const router=Router();


router.post("/postComment",postComment);
router.get("/getComment",getComment);
router.put("/updateComment",updateComment);
router.delete("/deleteComment",deleteComment)


const CommentPipes=router
export default CommentPipes;