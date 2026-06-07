const express = require("express")
const userModel = require("../models/register.model")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


// Register api - api/auth/register
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })
    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "Email already exist"
        })
    }
    const hashPassword = crypto
        .createHash("md5")
        .update(password)
        .digest("hex")
    const user = await userModel.create({
        name, email,
        password: hashPassword
    })
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET_KEY
    )
    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User register successfully",
        user,
        token
    })


})

//login api - api/auth/login

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(401).json({
            message: "user not found"
        })
    }

    const isPasswordMatched = user.password === crypto
        .createHash("md5")
        .update(password)
        .digest("hex")

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }


    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET_KEY
    )
    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User Logged-in",
        user,
    })

})
module.exports = authRouter