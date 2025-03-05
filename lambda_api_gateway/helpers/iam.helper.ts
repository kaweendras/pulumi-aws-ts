import * as aws from "@pulumi/aws";

/**
 * Creates an IAM role that allows Lambda functions to upload objects to S3 buckets
 */
export function createLambdaS3UploadRole(name: string) {
  // Create an IAM role that Lambda will assume
  const role = new aws.iam.Role(name, {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
      Service: "lambda.amazonaws.com",
    }),
  });

  // Attach the AWSLambdaBasicExecutionRole managed policy to allow basic Lambda execution
  new aws.iam.RolePolicyAttachment(`${name}-basic-execution`, {
    role: role.name,
    policyArn:
      "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
  });

  // Create a custom policy for S3 upload permissions
  const s3UploadPolicy = new aws.iam.Policy(`${name}-s3-upload`, {
    description: "Allow Lambda to upload objects to S3 buckets",
    policy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: ["s3:PutObject", "s3:GetObject", "s3:ListBucket"],
          Resource: [
            "arn:aws:s3:::*/*", // Access to objects in any bucket
            "arn:aws:s3:::*", // Access to the buckets themselves
          ],
        },
      ],
    }),
  });

  // Attach the S3 upload policy to the role
  new aws.iam.RolePolicyAttachment(`${name}-s3-upload-attachment`, {
    role: role.name,
    policyArn: s3UploadPolicy.arn,
  });

  return role;
}
