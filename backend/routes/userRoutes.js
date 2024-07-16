import { createPlayer } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();
router.post("/create", createPlayer);

export default router;
