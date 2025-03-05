import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an S3 Bucket object

const uploadObject = (
  bucket: aws.s3.BucketV2,

  objectName: string,
  filePath: string
) => {
  const bucketObject = new aws.s3.BucketObject(objectName, {
    bucket: bucket.id,
    source: new pulumi.asset.FileAsset(filePath),
  });
  return bucketObject;
};

//upload an object to the S3 bucket as a base64 encoded string
const uploadObjectBase64 = (
  bucket: aws.s3.BucketV2,
  objectName: string,
  base64String: string
) => {
  const bucketObject = new aws.s3.BucketObject(objectName, {
    bucket: bucket.id,
    source: new pulumi.asset.StringAsset(base64String),
  });

  return bucketObject;
};

export { uploadObject, uploadObjectBase64 };
