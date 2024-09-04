# WalletLabels

WalletLabels is a powerful and user-friendly web app that simplifies searching and identifying Ethereum wallets with custom labels. The application provides an intuitive interface, allowing users to search for wallet addresses by name, label or address. Visit the live website at [https://walletlabels.xyz](https://walletlabels.xyz).

**Note**: This project provides the frontend and backend (API handling) for WalletLabels but does not include the database containing wallet addresses and labels. Users will need to set up their own database when deploying a local version of this project.

## Table of Contents

1. [Features](#features)
2. [Folder Structure](#folder-structure)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [API](#api)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)
9. [Support](#support)

## Features

- Search for wallet addresses by name, label type, or label subtype
- Displays wallet balance history in a graph
- Retrieves the last transaction for each address
- Responsive design for mobile and desktop devices
- Dark and light theme support

## Folder Structure

Below is an overview of the important files and folders in the WalletLabels project:

- `components/`: Contains reusable UI components and layout related components.
- `hooks/`: Contains custom React hooks used in the project.
- `lib/`: Contains utility functions and database related logic.
- `pages/`: Contains the main pages of the application and their corresponding API endpoints.
- `public/`: Contains public assets such as images and icons.
- `styles/`: Contains global and module-specific stylesheets.
- `tsconfig.json`: TypeScript configuration file.
- `next.config.mjs`: Next.js configuration file.
- `package.json`: Contains project dependencies and scripts.

## Prerequisites

To run WalletLabels locally, you need to have the following installed on your system:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

Additionally, you need to set up some environment variables:

- `MONGODB_URI`: The MongoDB connection URI
- `DB_NAME`: The name of your MongoDB database

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/your-username/walletlabels.git
```

2. Change the current directory to the project folder

```bash
cd walletlabels
```

3. Install the required dependencies

```bash
npm install
```

4. Create a `.env.local` file in the project root and add your environment variables:

```
MONGODB_URI=your-mongodb-uri
DB_NAME=your-db-name
```

5. Start the development server

```bash
npm run dev
```

6. Open your browser, and navigate to [http://localhost:3000](http://localhost:3000)

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

## Deployment

To deploy WalletLabels, you can use any platform that supports Next.js applications, like [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Make sure to set your environment variables in your deployment platform.

## Contributing

If you would like to contribute to the project, please fork the repository, create a new branch, and submit a pull request with your changes.

## License

WalletLabels is released under the MIT License. See the LICENSE file for more details.

## Support

If you have any questions or issues, please open an issue on the GitHub repository or contact one of the maintainers.
