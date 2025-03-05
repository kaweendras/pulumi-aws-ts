import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

//add a file to s3
const addFileToS3 = (
  bucketName: string,
  fileName: string,
  fileContent: string
) => {
  const bucket = aws.s3.getBucket({ bucket: bucketName });
  const object = new aws.s3.BucketObject(fileName, {
    bucket: bucketName,
    acl: "public-read",
    content: fileContent,
  });
  return object;
};

export { addFileToS3 };
