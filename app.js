const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require("path");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const videoRoutes = require("./routes/video");
const audioRoutes = require("./routes/audio");
const adminRoutes = require("./routes/admin");
const homeRoutes = require("./routes/home");

// username and password are same: football123
const MONGODB_URI = `mongodb+srv://football123:football123@football.wuanq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});

app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

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

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/video", videoRoutes);
app.use("/audio", audioRoutes);
app.use("/admin", adminRoutes);
app.use(homeRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(result => {
        app.listen(3000, () => {
            console.log("App is listening on port 3000 and MongoDB is connected!");
        });
    }).catch(err => {
        console.log(err);
    })