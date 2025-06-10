// Add this to the very top of the file to tell Next.js this component
// will interact with the user (e.g., button clicks).
'use client';

// 1. Import the Whop SDK
import { WhopSDK } from '@whop-sdk/whop';

export default function Home() {

  // This is the function that will run on the SERVER when called.
  async function createProductAction() {
    'use server'; // This magic line makes it a Server Action!

    console.log('Server Action: createProductAction triggered!');

    try {
      // Initialize the SDK. It automatically finds your WHOP_API_KEY
      // from the .env.local file on the server.
      const whop = new WhopSDK();

      // Call the SDK to create the product
      const newProduct = await whop.products.create({
        title: 'My First App Product!',
      });
      
      const productId = newProduct.id;
      
      console.log('✅ Success! Product created with the SDK.');
      console.log('Your new product_id is:', productId);

      // Return the ID to the client so we can show it.
      return { success: true, productId: productId };

    } catch (error) {
      console.error('❌ Error creating product with SDK:', error);
      return { success: false, error: 'Failed to create product.' };
    }
  }

  // This function will run on the CLIENT (in your browser) when the button is clicked.
  const handleCreateClick = async () => {
    alert('Sending request to server to create product...');
    const result = await createProductAction(); // This calls our Server Action

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
