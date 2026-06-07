const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")
const userRouter = express.Router()

// post /api/unfollow/:username
userRouter.post("/follow/:username", identifyUser, userController.userFollowController)

// post /api/unfollow/:username
userRouter.post("/unfollow/:username", identifyUser, userController.userUnfollowController)


module.exports = userRouter