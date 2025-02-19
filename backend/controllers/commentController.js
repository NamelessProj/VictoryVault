const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Message = require("../models/messageModel");
const {sendEmail} = require("../utils/sendEmail");
const Notification = require("../models/notificationModel");

// @desc Getting a comment by his id
// @route GET /api/comment/:_id
// @access Public
const getCommentById = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params._id).populate('message').populate('user');
    if(!comment){
        res.status(404).json({message: "Comment not found."});
        throw new Error("Could not find comment with id " + req.params._id);
    }else{
        res.status(200).json({comment});
    }
});

// @desc Adding a comment
// @route POST /api/comment/messageId
// @access Private
const addComment = asyncHandler(async (req, res) => {
    const text = req.body.text;
    const messageId = req.params.messageId;

    if(!text || text === ''){
        res.status(400).json({message: "Please enter a valid text for comment."});
        throw new Error("Please enter a valid text for comment.");
    }

    // Getting the message
    const message = await Message.findById(messageId).populate('user');
    if(!message){
        res.status(400).json({message: "Message doesn't exist."});
        throw new Error("Message doesn't exist.");
    }

    // Getting the current number of comments for the message and adding 1
    let currentCommentNum = message.commentCount;
    currentCommentNum = currentCommentNum + 1;
    message.commentCount = currentCommentNum;
    const updatedMessage = await message.save();
    if(!updatedMessage){
        res.status(400).json({message: "An error occurred while attempting to update the message. Please retry later."});
        throw new Error("An error occurred while attempting to update the message. Please retry later.");
    }

    const comment = await Comment.create({
        text,
        user: req.user._id,
        message: messageId
    });

    if(comment){
        const comments = await Comment.find({message: messageId}).sort({'createdAt': -1}).populate('user');
        res.status(201).json(comments);
        if(message.user.notification.comment){
            await Notification.create({
                text: 'Comment your post.',
                message: messageId,
                from: req.user._id,
                user: message.user,
                type: 'comment'
            });
            await sendEmail(message.user.email, 'New comment on your post', `<p>Hello <b>${message.user.username}</b>,<br/>You have a new comment from <b>${req.user.username}</b>.</p><br/><p>${text}</p><br/><small><a href="${process.env.FRONTEND_URL}lock/${messageId}">Go checking the post.</a></small>`);
        }
    }else{
        res.status(400).json({message: "An error occur while attempting to create the comment. Please retry later."});
        throw new Error("An error occur while attempting to create the comment. Please retry later.");
    }
});

// @desc Deleting a comment
// @route DELETE /api/comment/:_id
// @access Private (admin)
const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params._id);
    if(!comment){
        res.status(400).json({message: "The comment doesn't exist."});
        throw new Error("The comment doesn't exist.");
    }

    const message = await Message.findById(comment.message);
    if(!message){
        res.status(400).json({message: "The message doesn't exist."});
        throw new Error("The message doesn't exist.");
    }

    const commentCount = message.commentCount;
    message.commentCount = commentCount <= 0 ? 0 : commentCount - 1;
    const updatedMessage = await message.save();
    if(!updatedMessage){
        res.status(400).json({message: "An error occur while attempting to update the message. Please retry later."});
        throw new Error("An error occur while attempting to update the comment. Please retry later.");
    }

    await Comment.findByIdAndDelete(req.params._id);

    res.status(200).json({message: `The comment has been deleted successfully.`});
});

module.exports = {
    getCommentById,
    addComment,
    deleteComment
}