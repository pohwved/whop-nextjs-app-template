'use server';

// This is the correct endpoint for the GraphQL API
const WHOP_GRAPHQL_ENDPOINT = 'https://data.whop.com/graphql';

export async function getMyProductDetailsAction() {
  console.log(`GraphQL Action: Fetching the app's associated product...`);

  const apiKey = process.env.WHOP_API_KEY; // Your wbk_... key
  if (!apiKey) {
    return { success: false, error: 'API Key is not configured on the server.' };
  }

  // This is the new, simpler query. It asks for the app associated
  // with the API key, and then gets the product linked to that app.
  const query = `
    query GetAppProduct {
      app {
        product {
          id
          title
        }
      }
    }
  `;

  try {
    const response = await fetch(WHOP_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      // No variables are needed because the API knows who you are from the key
      body: JSON.stringify({
        query: query
      }),
    });

    const responseData = await response.json();

    // Check for errors in the GraphQL response itself
    if (responseData.errors) {
      console.error('GraphQL Error:', responseData.errors);
      const errorMessage = responseData.errors[0]?.message || 'An unknown GraphQL error occurred.';
      return { success: false, error: errorMessage };
    }

    // The path to the title is now responseData.data.app.product.title
    const productTitle = responseData.data?.app?.product?.title;

    if (!productTitle) {
      return { success: false, error: 'Product title not found in GraphQL response.' };
    }

    console.log('✅ Success! Fetched product title via GraphQL:', productTitle);

    return { success: true, title: productTitle };

  } catch (error) {
    console.error('❌ A fatal error occurred:', error);
    return { success: false, error: 'An unknown error occurred.' };
  }
}
