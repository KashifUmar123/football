const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

// username and password are same: football123
const MONGODB_URI = `mongodb+srv://football123:football123@football.wuanq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/", (req, res, next) => {
    res.send("App is live");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(result => {
        app.listen(3000, () => {
            console.log("App is listening on port 3000 and MongoDB is connected!");
        });
    }).catch(err => {
        console.log(err);
    })