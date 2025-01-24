import express from "express";

import authController from "../controller/authController.js";

const router = express.Router();

router.post("/login", authController.postLogin);
router.post("/renewAccessToken", authController.renewAccessToken);

export default router;
