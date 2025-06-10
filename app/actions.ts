// This line at the top marks all functions in this file as Server Actions
'use server';

import { WhopSDK } from '@whop/sdk';

// This is our function that runs securely on the server
export async function createProductAction() {
  console.log('Server Action: createProductAction triggered!');

  try {
    // Initialize the SDK. It finds the key in your .env.local on the server.
    const whop = new WhopSDK();

    const newProduct = await whop.products.create({
      title: 'My First Correctly Made Product!',
    });

    const productId = newProduct.id;

    console.log('✅ Success! Product created with the SDK.');
    console.log('Your new product_id is:', productId);

    return { success: true, productId: productId };

  } catch (error) {
    console.error('❌ Error creating product with SDK:', error);
    return { success: false, error: 'Failed to create product.' };
  }
}