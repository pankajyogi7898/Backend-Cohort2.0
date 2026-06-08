const express = require("express")
const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function userFollowController(req, res) {

    const followerUserName = req.user.username
    const followeeUserName = req.params.username

    if (followerUserName === followeeUserName) {
        return res.status(400).json({
            message: "you can not follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUserName
    })

    if (!isFolloweeExists) {
        res.status(400).json({
            message: "followee username not exists"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUserName,
        followee: followeeUserName,
    })
    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `you have already following ${followeeUserName}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUserName,
        followee: followeeUserName,
        status: "pending"
    })

    res.status(201).json({
        message: `you are following ${followeeUserName}`,
        follow: followRecord
    })


}

async function acceptFollowRequest(req, res) {
    const followerUserName = req.user.username
    const followeeUserName = req.params.username

    const isFolloweeExists = await userModel.findOne({
        username: followeeUserName
    })

    if (!isFolloweeExists) {
        res.status(400).json({
            message: "followee username not exists"
        })
    }

    const request = await followModel.findOneAndUpdate(
        {
            follower: followerUserName,
            followee: followeeUserName,
            status: "pending"
        },
        {
            status: "accepted"
        },
        {
            new: true
        }
    )
    console.log(request)

    if (!request) {
        return res.status(404).json({
            message: "request not found"
        })
    }

    res.status(200).json({
        message: "follow request accepted",
        follow: request
    })


}

async function rejectFollowRequest(req, res) {

    const followerUserName = req.user.username
    const followeeUserName = req.params.username

    const isFolloweeExists = await userModel.findOne({
        username: followeeUserName
    })

    if (!isFolloweeExists) {
        res.status(400).json({
            message: "followee username not exists"
        })
    }

    const request = await followModel.findOneAndUpdate(
        {
            follower: followerUserName,
            followee: followeeUserName,
            status: "rejected"
        },
        {
            new: true
        }
    )

    if (!request) {
        return res.status(404).json({
            message: "request not found"
        })
    }

    res.status(200).json({
        message: "follow request rejected"
    })
}


async function userUnfollowController(req, res) {
    const followerUserName = req.user.username
    const followeeUserName = req.params.username

    const isFollowing = await followModel.findOne({
        follower: followerUserName,
        followee: followeeUserName
    })

    if (!isFollowing) {
        return res.status(400).json({
            message: `you can not follow ${followeeUserName}`
        })

    }

    await followModel.findByIdAndDelete(isFollowing._id)

    res.status(200).json({
        message: `you have unfollow ${followeeUserName}`
    })


}




module.exports = { userFollowController, acceptFollowRequest, rejectFollowRequest, userUnfollowController }