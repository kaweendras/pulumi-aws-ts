import * as aws from "@pulumi/aws";
import * as bucketHelpers from "../../helpers/s3.helper";
import { createLambdaS3UploadRole } from "../../helpers/iam.helper";

// Create IAM role with S3 upload permissions for the Lambda
const s3UploadRole = createLambdaS3UploadRole("lambda-s3-upload-role");

// A Lambda function to invoke.
const uploadToBuckeBase64 = new aws.lambda.CallbackFunction(
  "BucketBase64Handler",
  {
    role: s3UploadRole.arn,
    callback: async (event: any, context, callback) => {
      const body = event.body;

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Hello from API Gateway!",
        }),
      };
    },
  }
);

export { uploadToBuckeBase64 };
