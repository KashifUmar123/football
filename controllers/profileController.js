const User = require("../models/user");
const Video = require("../models/video");

exports.updateImage = async(req, res, next) => {
    console.log(req.user);
    try {
        req.user.profileImg = req.body.imageUrl;
        await req.user.save();
        res.status(200).json({
            success: true,
            message: "profile Image updated!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "profile Image updation failed!"
        });
    }
};

exports.updateBio = async(req, res, next) => {
    console.log(req.user);
    try {
        req.user.bio = req.body.bio;
        await req.user.save();
        res.status(200).json({
            success: true,
            message: "profile Bio updated!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "profile Bio updation failed!"
        });
    }
};

exports.updateInstagram = async(req, res, next) => {
    console.log(req.user);
    try {
        req.user.instagramLink = req.body.instagramLink;
        await req.user.save();
        res.status(200).json({
            success: true,
            message: "profile instagram Link updated!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "profile instagram Link updation failed!"
        });
    }
};

exports.updateYoutube = async(req, res, next) => {
    console.log(req.user);
    try {
        req.user.youtubeLink = req.body.youtubeLink;
        await req.user.save();
        res.status(200).json({
            success: true,
            message: "profile Youtube Link updated!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "profile Youtube Link updation failed!",
            error: error
        });
    }
};

exports.follow = async(req, res, next) => {
    const toFollowId = req.body.toFollowId;

    try {
        let userToFollow = await User.findById(toFollowId);
        userToFollow.followers.push(req.user._id.toString());
        await userToFollow.save();

        res.status(200).json({
            success: true,
            message: "user followed successfully!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "user following failed!",
            error: error
        });
    }
}

exports.getUserDetails = async(req, res, next) => {
    try {
        let user = req.user;
        res.status(200).json({
            data: user,
            success: true,
            message: "user data successfull"
        });

    } catch (error) {
        res.status(400).json({
            data: user,
            success: false,
            message: "getting user data failed"
        });
    }
}

exports.getUserVideos = async(req, res, next) => {
    try {
        let user = req.user;
        let videoIds = user.videos;
        videosArray = [].concat.apply([], videoIds);
        console.log(videosArray);

        const videos = await Video.find({
            '_id': { $in: videosArray }
        });

        res.status(200).json({
            data: videos,
            success: true,
            message: "successfull!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "failed!"
        });
    }
}