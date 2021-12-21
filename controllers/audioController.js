const Audio = require("../models/audio");

exports.uploadAudio = async(req, res, next) => {
    try {
        const audioUrl = req.body.audioUrl;
        const audioName = req.body.audioName;
        const audioType = req.body.audioType;

        let data = {
            audioUrl,
            audioName,
            audioType,
        }

        console.log(data);
        const newAudio = new Audio(data);
        await newAudio.save();
        res.status(200).json({
            success: true,
            message: "success!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "failed!"
        });
    }
}

exports.getAudios = async(req, res, next) => {
    try {
        Audio.find({}, (err, audios) => {
            console.log(audios);
            if (!err) {
                res.status(200).json({
                    data: audios,
                    success: true,
                    message: "success"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "failed"
                });
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "failed",
            error: error
        });
    }
}