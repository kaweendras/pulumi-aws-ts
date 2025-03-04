
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log("Event: ", event);
    const bucketName = process.env.BUCKET_NAME;
    const body = JSON.parse(event.body);
    const key = `data-${Date.now()}.json`;

    const params = {
        Bucket: bucketName,
        Key: key,
        Body: JSON.stringify(body),
        ContentType: "application/json",
    };

    try {
        await s3.putObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data added to S3 bucket" ,
                data: {
                    bucketName,
                    key,
                }
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error adding data to S3 bucket", error }),
        };
    }
};