// Database operations

// Fetches all entries from a DynamoDB table by making a GET request to an API Gateway endpoint
async function getEntries() {
  try {
    const response = await fetch(
      "https://qsr58z9ja4.execute-api.eu-north-1.amazonaws.com/dev"
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

// Posts an entry to DynamoDB table by making a POST request to an API Gateway endpoint
async function postEntry(entry) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: entry,
  };

  try {
    const response = await fetch(
      "https://qsr58z9ja4.execute-api.eu-north-1.amazonaws.com/dev",
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
