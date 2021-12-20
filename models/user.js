const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    birthday: String,
    password: String,
    username: String,
    profileImg: String,
    instagramLink: String,
    youtubeLink: String,
    bio: String,
    followers: [String],
    videos: [Array]
});

module.exports = mongoose.model("User", UserSchema);