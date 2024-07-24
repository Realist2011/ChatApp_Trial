import express from 'express'

import { getMessages, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router()
router.post("/send/:id",sendMessage)
router.post("/:id",getMessages)



export default router;