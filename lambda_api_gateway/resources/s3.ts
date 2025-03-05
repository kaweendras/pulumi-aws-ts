import * as aws from "@pulumi/aws";

const createS3Bucket = () => {
  return new aws.s3.BucketV2("my-bucket");
};

export { createS3Bucket };
