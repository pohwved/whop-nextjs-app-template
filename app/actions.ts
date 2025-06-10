'use server';

// This is the Product ID that Whop created for your app. It is a constant.
const MY_APPS_PRODUCT_ID = 'prod_LrkPsLXC5x9Wn';

export async function getMyProductDetailsAction() {
  console.log(`Server Action: Fetching details for product: ${MY_APPS_PRODUCT_ID}`);

  const apiKey = process.env.WHOP_API_KEY; // Your wbk_... key
  if (!apiKey) {
    return { success: false, error: 'API Key is not configured on the server.' };
  }

  try {
    const response = await fetch(`https://api.whop.com/api/v2/products/${MY_APPS_PRODUCT_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return { success: false, error: `API request failed: ${response.statusText}` };
    }

    const productData = await response.json();
    console.log('✅ Success! Fetched product data:', productData.title);

    // Send just the product title back to the client
    return { success: true, title: productData.title };

  } catch (error) {
    console.error('❌ A fatal error occurred:', error);
    return { success: false, error: 'An unknown error occurred.' };
  }
}
