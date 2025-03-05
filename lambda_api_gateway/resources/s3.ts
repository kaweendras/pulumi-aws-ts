import * as aws from "@pulumi/aws";

const createS3Bucket = (bucketName: string) => {
  return new aws.s3.BucketV2(bucketName);
};

export { createS3Bucket };
