import express from "express";

import pageController from "../controller/pageController.js";

const router = express.Router();

router.post("/getPages", pageController.getPages);

export default router;
