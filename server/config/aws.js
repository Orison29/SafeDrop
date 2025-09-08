const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_Access_Key_ID,
    secretAccessKey: process.env.AWS_Secret_Access_Key,
    region: process.env.AWS_REGION
});

module.exports = s3;