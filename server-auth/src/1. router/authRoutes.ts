import express from "express";

import authController from "../2. controller/authController";
import asyscRequestHandler from "../0. util/context/asyncRequestHandler";

const router = express.Router();

router.post("/login", asyscRequestHandler(authController.doLogin));
router.post(
	"/renewAccessToken",
	asyscRequestHandler(authController.renewAccessToken)
);

export default router;
