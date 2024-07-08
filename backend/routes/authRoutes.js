import express from 'express'
import { loginUser, logout, signUpUser } from '../controllers/auth.controller.js'
const router = express.Router()

router.post("/login",loginUser)

router.post("/signup",signUpUser)
router.get("/logout",logout)
export default router;