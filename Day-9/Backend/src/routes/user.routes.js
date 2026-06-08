const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")
const userRouter = express.Router()

// post /api/users/unfollow/:username
userRouter.post("/follow/:username", identifyUser, userController.userFollowController)

// post /api/users/accept/:username
userRouter.post("/accept/:username", identifyUser, userController.acceptFollowRequest)

// post /api/users/reject/:username
userRouter.post("/reject/:username", identifyUser, userController.rejectFollowRequest)

// post /api/users/unfollow/:username
userRouter.post("/unfollow/:username", identifyUser, userController.userUnfollowController)


module.exports = userRouter