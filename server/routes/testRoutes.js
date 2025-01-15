import express from "express";

import testController from "../controller/testController.js";

const router = express.Router();

// URL: /sample/test
router.get("/test", testController.getTestMethod);

export default router;
