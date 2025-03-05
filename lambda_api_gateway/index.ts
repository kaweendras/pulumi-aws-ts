// Copyright 2016-2025, Pulumi Corporation.  All rights reserved.

import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";
import { infoHandlers, s3Handlers } from "./handler";
import { createS3Bucket } from "./resources/s3";
import { uploadObjectBase64 } from "./helpers/s3.helper";
// import { createDynamoTable } from "./resources/dynamo";

//create resources
//s3 bucket
const bucket = createS3Bucket("pulumi-bucket");

uploadObjectBase64(bucket, "data.txt", "YWE=");

//Create an API endpoint.
const api = new apigateway.RestAPI("api", {
  routes: [
    {
      path: "/",
      method: "GET",
      eventHandler: infoHandlers.HelloWorldHandler,
    },
    {
      path: "/upload",
      method: "POST",
      eventHandler: s3Handlers.uploadToBuckeBase64,
    },
  ],
});

// Pulumi exports values
// See these outputs using: pulumi stack output endpointUrl
export const endpointUrl = api.url;
export const bucketName = bucket.id;
