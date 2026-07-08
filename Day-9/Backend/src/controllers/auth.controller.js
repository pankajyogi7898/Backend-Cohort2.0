const express = require("express");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


async function registerUser(req, res) {
    const { username, email, password, bio, profilePic } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User is already exist" + (isUserAlreadyExist.email === email ? "with this email" : "with this username")
        })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profilePic
    })
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        token: token
    })

}

async function loginUser(req, res) {
    const { email, username, password } = req.body
    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    if (!user) {
        res.status(404).json({
            message: "user  not found " + (email ? "with this email" : "with this username")
        })
    }
    const ispasswordMatch = await bcrypt.compare(password, user.password)
    if (!ispasswordMatch) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User Logged in Sucessfully",
        user: user
    })

}

module.exports = {
    registerUser,
    loginUser
}