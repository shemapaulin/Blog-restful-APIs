import { Router } from "express";

import { postReply,getReply, updateReply, deleteReply } from "../Controllers/reply.js";

const router=Router();

router.post("/addReply",postReply);
router.get("/getReply/:id",getReply);
router.put("/updateReply/:id",updateReply);
router.delete("/deleteReply/:id",deleteReply);


const RepRouter=router;

export default RepRouter;