const AWS = require("aws-sdk");
const ACCESS_KEY = "fill";
const SECRET_KEY = "fill";

const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
});

module.exports = s3;
