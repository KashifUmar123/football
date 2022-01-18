const s3 = require("../config/amazonConfig");
const uuid = require("uuid");
const Audio = require("../models/audio");

exports.getLogin = (req, res, next) => {
    if (req.session.adminLoggedIn) {
        res.redirect('/admin/home');
    } else {
        res.render('adminLogin', {
            msg: ""
        });
    }
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email === "kashifumar349@gmail.com" && password === "portal123$%") {
        req.session.adminLoggedIn = true;
        return req.session.save(err => {
            res.redirect('/admin/home');
        });
    } else {
        res.render("/admin/login", {
            msg: "Wrong Credintials!"
        });
    }

}

exports.getHome = (req, res, next) => {
    res.render("adminHome");
}

exports.getAudios = async(req, res, next) => {
    let audios = await Audio.find({});

    res.render("audios", {
        audios
    });
}

exports.getAudioUpload = (req, res, next) => {
    res.render("audioUpload", {
        msg: ""
    });
}

async function uploadAudio(file) {
    const bucketName = "football-audio-bucket";
    const filename = uuid.v4();
    const body = file.buffer;
    const contentType = file.mimetype;

    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketName,
            Body: body,
            ContentType: contentType,
            ACL: "public-read"
        };

        s3.upload(params, (err, data) => {
            if (err) { reject(err) } else { resolve(data) }
        });
    });
}

exports.postAudio = async(req, res, next) => {
    const audioName = req.body.name;
    const duration = req.body.duration;
    const file = req.file;

    const result = await uploadAudio(req.file);
    let data = {
        audioName: audioName,
        audioUrl: result.Location,
        audioKey: result.Key,
        audioType: duration
    };

    let newAudio = new Audio(data);
    await newAudio.save();

    res.render("audioUpload", {
        msg: "Audio uploaded successfully!"
    });
}

async function deleteAudioFile(key) {

    return new Promise((resolve, reject) => {
        const params = {
            Bucket: "football-audio-bucket",
            Key: key
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                // console.log(err);
                reject(err);
            } else {
                // console.log(data);
                resolve(data);
            }
        });
    })
}

exports.deleteAudio = async(req, res, next) => {
    const key = req.params.key;

    let result = await deleteAudioFile(key);
    console.log(result);

    await Audio.findOneAndDelete({
        audioKey: key
    });

    res.redirect("/admin/audios");
}