const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    videoUrl: String,
    hashtags: String,
    userId: String,
    description: String,
    views: Number,
    likes: [String],
    comments: {
        type: Map,
        of: String
    },
});

module.exports = mongoose.model("Video", VideoSchema);