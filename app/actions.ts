'use server';

// This is the Product ID that Whop created for your app. It is a constant.
const MY_APPS_PRODUCT_ID = 'prod_LrkPsLXC5x9Wn';

// This is the correct endpoint for the GraphQL API
const WHOP_GRAPHQL_ENDPOINT = 'https://data.whop.com/graphql';

export async function getMyProductDetailsAction() {
  console.log(`GraphQL Action: Fetching details for product: ${MY_APPS_PRODUCT_ID}`);

  const apiKey = process.env.WHOP_API_KEY; // Your wbk_... key
  if (!apiKey) {
    return { success: false, error: 'API Key is not configured on the server.' };
  }

  // This is a GraphQL query. It specifies exactly what data we want.
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
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
      body: JSON.stringify({
        query: query,
        variables: {
          id: MY_APPS_PRODUCT_ID,
        },
      }),
    });

    const responseData = await response.json();

    // Check for errors in the GraphQL response itself
    if (responseData.errors) {
      console.error('GraphQL Error:', responseData.errors);
      const errorMessage = responseData.errors[0]?.message || 'An unknown GraphQL error occurred.';
      return { success: false, error: errorMessage };
    }

    const productTitle = responseData.data?.product?.title;

    if (!productTitle) {
      return { success: false, error: 'Product not found via GraphQL.' };
    }

    console.log('✅ Success! Fetched product title via GraphQL:', productTitle);

    return { success: true, title: productTitle };

  } catch (error) {
    console.error('❌ A fatal error occurred:', error);
    return { success: false, error: 'An unknown error occurred.' };
  }
}
