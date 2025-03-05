import pulumi from "@pulumi/pulumi";
import aws from "@pulumi/aws";

// Create an S3 Bucket object

const uploadObject = (
  bucketId: string,
  objectName: string,
  filePath: string
) => {
  const bucketObject = new aws.s3.BucketObject(objectName, {
    bucket: bucketId,
    source: new pulumi.asset.FileAsset(filePath),
  });
};

export { uploadObject };
