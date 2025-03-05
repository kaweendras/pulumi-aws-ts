import * as aws from "@pulumi/aws";

export const createDynamoTable = async (tableName: string) => {
  return new aws.dynamodb.Table(tableName, {
    name: "example-name",
    readCapacity: 10,
    writeCapacity: 10,
    hashKey: "exampleHashKey",
    attributes: [
      {
        name: "exampleHashKey",
        type: "S",
      },
    ],
  });
};
