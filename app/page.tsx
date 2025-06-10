'use client';

// 1. Import React and our new server action
import { createProductAction } from './actions';

export default function Home() {

  // This function still runs in the browser when the button is clicked
  const handleCreateClick = async () => {
    alert('Sending request to server to create product...');

    // 2. Call the imported server action
    const result = await createProductAction(); 

    if (result.success) {
      alert(`Success! Product created with ID: ${result.productId}`);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Whop App Test Page</h1>
        <p className="mb-4">Click the button below to create a new product via the Whop API.</p>
        <button
          onClick={handleCreateClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Whop Product
        </button>
      </div>
    </main>
  );
}
