// AWS SDK for Javascript v3 introduced modularized packages
// which make importing faster because you no longer need to import the whole SDK
// cf. using var AWS = require("aws-sdk") with v2
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Gets all previous Curriculus entries from a DynamoDB table (my-records-tbl)
// Is invoked when Go button is clicked on the Curriculus user interface,
// and also after an entry is submitted
export const handler = async (event) => {
  // Initiate DynamoDB client and DynamoDB document client
  const dynamoDB = new DynamoDBClient({ region: "eu-north-1" });
  const docDynamoDB = DynamoDBDocumentClient.from(dynamoDB);

  // Initiate scan command
  const command = new ScanCommand({ TableName: "my-records-tbl" });

  try {
    // Send the scan command to the document client
    const response = await docDynamoDB.send(command);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};
