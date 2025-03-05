import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

//create s3

const createS3Bucket = (bucketName: string) => {
  return new aws.s3.BucketV2(bucketName);
};

export { createS3Bucket };
