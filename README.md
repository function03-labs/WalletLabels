## API

WalletLabels provides a single API endpoint to fetch labeled Ethereum wallet addresses based on a search query.

### Endpoint

```
GET /api/query?query={query}&limit={limit}
```

### Parameters

- `query`: The search string to filter wallet addresses by name, label type, or label subtype. (required)
- `limit`: The maximum number of results to return. Default is 20, and the maximum allowed value is 100. (optional)

### Example

```
GET /api/query?query=exchange&limit=10
```

This request will return up to 10 wallet addresses containing the word "exchange" in their name, label type, or label subtype.

### Introduction

The Ethereum API GET request allows users to retrieve information about Ethereum wallet addresses with specific labels. This functionality is crucial for identifying and categorizing wallets based on their associated names, label types, or subtypes.

### Usage Guide with Code Examples

To make a GET request to the WalletLabels API, you can use the following JavaScript code example:

```javascript
fetch('/api/query?query=exchange&limit=10')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

This code fetches up to 10 wallet addresses containing the word "exchange".

### Response Handling

The response from the API is a JSON object containing an array of wallet addresses and their labels. You should parse this data to extract and utilize the information relevant to your application.

### Error Handling

When making the GET request, various errors can occur, such as network issues or invalid parameters. It's important to handle these errors gracefully in your code, typically by catching exceptions and providing informative error messages to the user.
