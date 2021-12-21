const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    videoUrl: String,
    audioId: String,
    hashtags: String,
    userId: String,
    description: String,
    views: {
        type: Number,
        default: 0
    },
    likes: [String],
    comments: [{
        type: Map,
        of: String
    }]
});

module.exports = mongoose.model("Video", VideoSchema);