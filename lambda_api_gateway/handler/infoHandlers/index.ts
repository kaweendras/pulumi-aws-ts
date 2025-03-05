import * as aws from "@pulumi/aws";

// A Lambda function to invoke.
const HelloWorldHandler = new aws.lambda.CallbackFunction("handler", {
  callback: async (event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello from API Gateway!",
      }),
    };
  },
});

export { HelloWorldHandler };
