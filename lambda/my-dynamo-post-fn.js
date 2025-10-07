import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// In contrast to v2, v3 comes with the requirement to specify some data types
// when, for example, defining Item for PutItemCommand (see line 18)
// Marshalling handles the data types for us (see line 19)
import { marshall } from "@aws-sdk/util-dynamodb";
// Nano ID is an external UUID generator
// External NPM packages need to be imported to Lambda in order to use them
import { nanoid } from "nanoid";
// import { randomUUID } from "crypto";

// Posts submitted Curriculus entry to a DynamoDB table (my-records-tbl)
// Is invoked when an entry is submitted on the Curriculus user interface
export const handler = async (event) => {
  // Initiate DynamoDB client
  const dynamoDB = new DynamoDBClient({ region: "eu-north-1" });

  // Define put item command parameters
  // const params = { TableName: "my-records-tbl", Item: { id: { S: nanoid() }, ...
  const params = {
    TableName: "my-records-tbl",
    Item: {
      id: marshall(nanoid()),
      // id: marshall(randomUUID()),
      datetime: marshall(getDate()),
      studyAmount: marshall(event[0].hours),
      course: marshall(event[0].course),
      notes: marshall(event[0].notes),
    },
  };
  // Initiate the put item command
  const command = new PutItemCommand(params);

  try {
    // Send the put item command to the client
    const response = await dynamoDB.send(command);
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Creates a datetime for an entry, then formats and returns it
function getDate() {
  const date = new Date();

  const year = date.getFullYear();
  // + 1 is because of special indexing of getMonth()
  // If omitted, January is 0 and December is 11
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Add zeros before 1-digit values
  // This way sorting works like expected
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hour < 10) hour = "0" + hour;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  const datetime = `${year}-${month}-${day}, 
  ${hour}:${minutes}:${seconds} GMT+0`;
  return datetime;
}
