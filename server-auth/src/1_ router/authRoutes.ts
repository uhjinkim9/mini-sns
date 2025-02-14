import express from "express";

import authController from "../2_controller/authController";
import asyscRequestHandler from "../0_util/context/asyncRequestHandler";

const router = express.Router();

router.post("/login", asyscRequestHandler(authController.doLogin));
router.post(
	"/renewAccessToken",
	asyscRequestHandler(authController.renewAccessToken)
);

export default router;
