import express from "express";

import boardController from "../controller/boardController.js";

const router = express.Router();

router.post("/getPages", boardController.getPages);
router.post("/createContent", boardController.createContent);
router.post("/updateContent", boardController.updateContent);
router.post("/deleteContent", boardController.deleteContent);
router.post("/getContents", boardController.getContents);

export default router;
