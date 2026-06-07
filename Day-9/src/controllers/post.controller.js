const express = require('express');
const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const middleware = require("../middlewares/auth.middleware")



const imagekit = new ImageKit({
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
});

async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort",
    })
    console.log(req.user);
    // console.log(decoded);

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        userId: req.user.id
    })

    res.status(201).json({
        message: "post created sucessfully"
    })
}

async function getPostController(req, res) {

    const posts = await postModel.find({
        userId: req.user.id
    })

    res.status(200)
        .json({
            message: "Post Fetched Sucessfully",
            posts
        })
}

async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if (!post) {
        return res.status(404).json({
            message: "post not found"
        })
    }
    const isValidUser = post.userId.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "forbidden content"
        })
    }
    return res.status(200).json({
        message: "fetched successfuly",
        post
    })
}
module.exports = { createPostController, getPostController, getPostDetailsController }