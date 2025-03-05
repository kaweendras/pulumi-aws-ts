// Copyright 2016-2025, Pulumi Corporation.  All rights reserved.

import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";
import { infoHandlers } from "./handler";
import { createS3Bucket } from "./resources/s3";
// import { createDynamoTable } from "./resources/dynamo";

//create resources
//s3 bucket
const bucket = createS3Bucket("pulumi-bucket");

// Create an API endpoint.
const api = new apigateway.RestAPI("api", {
  routes: [
    {
      path: "/",
      method: "GET",
      eventHandler: infoHandlers.HelloWorldHandler,
    },
  ],
});

// Pulumi exports values
// See these outputs using: pulumi stack output endpointUrl
export const endpointUrl = api.url;
export const bucketName = bucket.id;
