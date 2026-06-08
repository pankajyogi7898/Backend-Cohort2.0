const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")
// CREATE POST - POST - /api/posts/

postRouter.post("/", identifyUser, upload.single("image"), postController.createPostController)

//GETUSER POST - GET - /api/posts/
postRouter.get("/", identifyUser, postController.getPostController)

//GET details - get - /api/posts/details/:postId
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

//post likes - post - /api/posts/like/:postId

postRouter.post("/like/:postId",identifyUser,postController.likePostController)


module.exports = postRouter