import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an S3 bucket
const bucket = new aws.s3.Bucket("my-bucket");

// Create a Lambda function
const role = new aws.iam.Role("lambdaRole", {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: "lambda.amazonaws.com",
  }),
});

const lambdaPolicy = new aws.iam.RolePolicy("lambdaPolicy", {
  role: role.id,
  policy: bucket.arn.apply((arn) =>
    JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Action: ["s3:PutObject"],
          Resource: [`${arn}/*`],
          Effect: "Allow",
        },
        {
          Action: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          Resource: "*",
          Effect: "Allow",
        },
      ],
    })
  ),
});

const lambdaFunction = new aws.lambda.Function("myFunction", {
  role: role.arn,
  runtime: aws.lambda.Runtime.NodeJS22dX, // Use NodeJS 16.x runtime
  handler: "index.handler", // Specify the handler
  code: new pulumi.asset.AssetArchive({
    ".": new pulumi.asset.FileArchive("./lambda"),
  }),
  environment: {
    variables: {
      BUCKET_NAME: bucket.bucket,
    },
  },
});

// Create an API Gateway
const api = new aws.apigateway.RestApi("pulumi-myApi", {
  description: "API Gateway for Lambda function",
});

// Grant API Gateway permission to invoke the Lambda function
const lambdaPermission = new aws.lambda.Permission("apiGatewayInvoke", {
  action: "lambda:InvokeFunction",
  function: lambdaFunction.name,
  principal: "apigateway.amazonaws.com",
  sourceArn: pulumi.interpolate`${api.executionArn}/*/*`,
});

const resource = new aws.apigateway.Resource("resource", {
  restApi: api.id,
  parentId: api.rootResourceId,
  pathPart: "addData",
});

const method = new aws.apigateway.Method("method", {
  restApi: api.id,
  resourceId: resource.id,
  httpMethod: "POST",
  authorization: "NONE",
  requestParameters: {
    "method.request.header.Content-Type": true,
  },
});

const integration = new aws.apigateway.Integration("integration", {
  restApi: api.id,
  resourceId: resource.id,
  httpMethod: method.httpMethod,
  integrationHttpMethod: "POST",
  type: "AWS_PROXY",
  uri: lambdaFunction.invokeArn,
});

const deployment = new aws.apigateway.Deployment(
  "deployment",
  {
    restApi: api.id,
    stageName: "dev",
  },
  { dependsOn: [integration] }
); // Ensure integration is defined before deployment

// Create an API Gateway stage explicitly
const stage = new aws.apigateway.Stage("stage", {
  restApi: api.id,
  deployment: deployment.id,
  stageName: "dev",
});

export const url = stage.invokeUrl.apply((url) => `${url}addData`);
