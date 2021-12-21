const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const Video = require("../models/video");
const Audio = require("../models/audio");

const secretKey = "SuperSecretKeyForTheFootballApp";

exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({
            email: email
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid Creds"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid Creds"
            });
        }

        const jwtToken = jwt.sign({
            email: email,
            userId: user._id.toString(),
        }, secretKey);

        res.status(200).json({
            success: true,
            token: jwtToken,
            userId: user._id.toString(),
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }


}

exports.signup = async(req, res, next) => {
    const name = req.body.name;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    try {
        hasedPassword = await bcrypt.hash(password, 12);

        const data = {
            name: name,
            email: email,
            password: hasedPassword,
            birthday: birthday,
            username: username,
        };

        const newUser = new User(data);

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "user registered"
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            res.status(500).json({
                success: false,
                message: "server error"
            });
        }
    }
}

exports.checkUsername = async(req, res, next) => {
    const username = req.body.username;

    const user = await User.findOne({
        username: username
    });

    if (user != null) {
        res.status(200).json({
            success: false,
            message: "Username not available"
        });
    } else {
        res.status(200).json({
            success: true,
            message: "Username available"
        });
    }
}

exports.checkEmail = async(req, res, next) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email
    });

    console.log(user);

    if (user != null) {
        res.status(200).json({
            success: false,
            message: "Email not available"
        });
    } else {
        res.status(200).json({
            success: true,
            message: "Email available"
        });
    }
}