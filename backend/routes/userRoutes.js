import express from 'express'
import { getUsersForSideBar } from '../controllers/users.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router()

router.post('/',getUsersForSideBar)
export default router;

