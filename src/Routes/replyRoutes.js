import { Router } from "express";

import { postReply,getReply } from "../Controllers/reply.js";

const router=Router();

router.post("/addReply",postReply);
router.get("/getReply",getReply)


const RepRouter=router;

export default RepRouter;