// Copyright 2016-2025, Pulumi Corporation.  All rights reserved.

import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";

import { infoHandlers } from "./handler";

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
