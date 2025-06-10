'use server';

// This function now has no external Whop imports.
// It uses the universal 'fetch' function available everywhere.
export async function createProductAction() {
  console.log('Server Action: createProductAction triggered!');

  // --- FIX for the first error ---
  // Securely get the API key and check if it exists.
  const apiKey = process.env.WHOP_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: WHOP_API_KEY is not set in the .env.local file.');
    return { success: false, error: 'Server is missing API Key.' };
  }

  // --- FIX for the second error ---
  // Use a direct 'fetch' call to the Whop API endpoint.
  try {
    const response = await fetch('https://api.whop.com/api/v2/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: "Product Created with Fetch!"
      })
    });

    // Check if the network request itself was successful
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`❌ API Error: ${response.status} ${response.statusText}`, errorBody);
      return { success: false, error: `API request failed: ${response.statusText}` };
    }

    const newProduct = await response.json();
    const productId = newProduct.id;
    
    console.log('✅ Success! Product created with a direct API call.');
    console.log('Your new product_id is:', productId);

    return { success: true, productId: productId };

  } catch (error) {
    console.error('❌ A fatal error occurred:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
}