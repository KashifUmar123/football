const Video = require("../models/video");

exports.uploadVideo = async(req, res, next) => {
    const videoUrl = req.body.videoUrl;
    const description = req.body.description;
    const hashtags = req.body.hashtags;
    const audioId = req.body.audioId;

    try {
        let videoData = {
            videoUrl: videoUrl,
            hashtags: hashtags,
            description: description,
            audioId: audioId,
            userId: req.user._id.toString(),
        };

        // create video instance
        const newVideo = new Video(videoData);
        await newVideo.save();
        // push video id to the user videos
        let vId = newVideo._id.toString();
        console.log(vId);
        req.user.videos.push(vId);
        await req.user.save();
        // if successfull
        res.status(200).json({
            success: true,
            message: "video created successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "video creation failed!"
        });
    }

}

exports.addComment = async(req, res, next) => {
    const videoId = req.body.videoId;
    const comment = req.body.comment;

    try {
        const video = await Video.findById(videoId);
        let userId = req.user._id.toString();
        console.log(userId);

        let data = new Map().set(userId, comment);
        video.comments.push(data);
        await video.save();

        res.status(200).json({
            success: true,
            message: "comment added!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "comment failed!",
            error: error
        });
    }
}
exports.incrementViews = async(req, res, next) => {
    const videoId = req.body.videoId;

    try {
        let video = await Video.findById(videoId);
        video.views = video.views + 1;
        await video.save();

        res.status(200).json({
            success: true,
            message: "View incerement successfull!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "view increment failed!",
            error: error
        });
    }

}
exports.likeVideo = async(req, res, next) => {
    const videoId = req.body.videoId;

    try {
        let video = await Video.findById(videoId);
        let userId = req.user._id.toString();
        console.log(userId);

        video.likes.push(userId);
        await video.save();

        res.status(200).json({
            success: true,
            message: "video like successfull!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "view like failed!",
            error: error
        });
    }
}
exports.deleteVideo = async(req, res, next) => {
    const videoId = req.body.videoId;

    try {
        await Video.findByIdAndDelete(videoId);
        req.user.videos.remove(videoId);
        await req.user.save();
        res.status(200).json({
            success: true,
            message: "video delete successfull!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "view delete failed!",
            error: error
        });
    }

}

exports.getLikes = async(req, res, next) => {
    try {
        const videoId = req.body.videoId;
        let video = await Video.findById(videoId);
        let likes = video.likes;
        res.status(200).json({
            data: likes,
            success: true,
            message: "success"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "failed"
        });
    }
}

exports.getComments = async(req, res, next) => {
    try {
        const videoId = req.body.videoId;
        let video = await Video.findById(videoId);
        let comments = video.comments;
        res.status(200).json({
            data: comments,
            success: true,
            message: "success"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "failed"
        });
    }
}

exports.getvideoDetails = async(req, res, next) => {
    try {
        const videoId = req.body.videoId;
        let video = await Video.findById(videoId);
        res.status(200).json({
            data: video,
            success: true,
            message: "success"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "failed"
        });
    }
}