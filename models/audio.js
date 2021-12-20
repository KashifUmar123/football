const mongoose = require("mongoose");

const AudioSchema = new mongoose.Schema({
    audioUrl: String,
    audioName: String,
    audioType: String,
});

module.exports = mongoose.model("Audio", AudioSchema);