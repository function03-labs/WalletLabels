// Filename: index.server.js

import { useServerData } from 'next/navigation';

export default function IndexPage() {
    const data = useServerData('/api/data-endpoint');

    // Server-side logic and data fetching can go here

    return (
    // Your JSX goes here
  );
}
