import express from "express";

import boardController from "../2. controller/boardController";
import asyscRequestHandler from "../0. util/context/asyncRequestHandler";

const router = express.Router();

router.post("/getPages", asyscRequestHandler(boardController.getPages));
router.post(
	"/createContent",
	asyscRequestHandler(boardController.createContent)
);
router.post(
	"/updateContent",
	asyscRequestHandler(boardController.updateContent)
);
router.post(
	"/deleteContent",
	asyscRequestHandler(boardController.deleteContent)
);
router.post("/getContents", asyscRequestHandler(boardController.getContents));

export default router;
