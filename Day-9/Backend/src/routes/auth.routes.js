const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")

//Register Api - Post - api/auth/register

authRouter.post("/register", authController.registerUser)

//Login Api - Post - api/auth/login

authRouter.post("/login", authController.loginUser)


module.exports = authRouter