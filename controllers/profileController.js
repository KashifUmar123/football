const User = require("../models/user");

exports.updateImage = async(req, res, next) => {
    console.log(req.user);
    try {
        req.user.profileImg = req.body.imageUrl;
        await req.user.save();
        res.status(200).json({
            message: "profile Image updated!"
        });
    } catch (error) {
        res.status(400).json({
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
            message: "profile Bio updated!"
        });
    } catch (error) {
        res.status(400).json({
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
            message: "profile instagram Link updated!"
        });
    } catch (error) {
        res.status(400).json({
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
            message: "profile Youtube Link updated!"
        });
    } catch (error) {
        res.status(400).json({
            message: "profile Youtube Link updation failed!"
        });
    }
};