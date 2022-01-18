const AWS = require("aws-sdk");
const ACCESS_KEY = "AKIAQ56376SBIG3L4CWB";
const SECRET_KEY = "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";

const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
});

module.exports = s3;