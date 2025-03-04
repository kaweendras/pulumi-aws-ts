import * as aws from "@pulumi/aws";

//creatte dynamo db

const createDynamoTable = (tableName: string) => {
  return new aws.dynamodb.Table(tableName, {
    attributes: [
      {
        name: "id",
        type: "S",
      },
    ],
    hashKey: "id",
    readCapacity: 5,
    writeCapacity: 5,
  });
};

export { createDynamoTable };
