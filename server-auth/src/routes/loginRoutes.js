import express from "express";

import loginController from "../controller/loginController.js";

const router = express.Router();

// router.post("/auth/login", loginController.postLogin);
router.post("/login", loginController.postLogin);
router.post("/issue-token", loginController.issueToken);

export default router;
