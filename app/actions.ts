'use server';

// PASTE THE APP ID YOU JUST COPIED FROM YOUR DASHBOARD URL HERE
const MY_APP_ID = 'app_Tmri0QsWr9dZzf';

const WHOP_GRAPHQL_ENDPOINT = 'https://data.whop.com/graphql';

export async function getMyProductDetailsAction() {
  console.log(`GraphQL Action: Fetching product details for App ID: ${MY_APP_ID}`);

  const apiKey = process.env.WHOP_API_KEY; // Your wbk_... key
  if (!apiKey) {
    return { success: false, error: 'API Key is not configured on the server.' };
  }

  // This is the final, correct query based on the error messages.
  const query = `
    query GetAppProduct($id: ID!) {
      app(id: $id) {
        plans {
          product {
            id
            title
          }
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
      body: JSON.stringify({
        query: query,
        variables: {
          id: MY_APP_ID,
        },
      }),
    });

    const responseData = await response.json();

    if (responseData.errors) {
      console.error('GraphQL Error:', responseData.errors);
      const errorMessage = responseData.errors[0]?.message || 'An unknown GraphQL error occurred.';
      return { success: false, error: errorMessage };
    }

    // The path to the data is now nested deeper
    const productTitle = responseData.data?.app?.plans?.[0]?.product?.title;

    if (!productTitle) {
      return { success: false, error: 'Product title not found in the GraphQL response. Check the query path.' };
    }

    console.log('✅ Success! Fetched product title via GraphQL:', productTitle);

    return { success: true, title: productTitle };

  } catch (error) {
    console.error('❌ A fatal error occurred:', error);
    return { success: false, error: 'An unknown error occurred.' };
  }
}
