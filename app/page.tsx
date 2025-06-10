'use client';

import { getMyProductDetailsAction } from './actions';

export default function Home() {
  const handleFetchDetailsClick = async () => {
    alert('Requesting product details from the server...');
    const result = await getMyProductDetailsAction();

    if (result.success) {
      alert(`Success! Your product's name is: "${result.title}"`);
    } else {
      alert(`An error occurred: ${result.error}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Whop App Control Panel</h1>
        <p className="mb-4">
          Your app's Product ID is hardcoded. Click the button to use the API to fetch its name.
        </p>
        <button
          onClick={handleFetchDetailsClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Fetch Product Name
        </button>
      </div>
    </main>
  );
}
