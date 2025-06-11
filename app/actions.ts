'use server';

import { whopApi } from '@/lib/whop-api';

// This is your Experience ID
const MY_APPS_EXPERIENCE_ID = 'prod_LrkPsLXC5x9Wn';

export async function getMyProductDetailsAction() {
  try {
    console.log(`SDK Action: Fetching details for Experience: ${MY_APPS_EXPERIENCE_ID}`);

    const response = await whopApi.getExperience({
      experienceId: MY_APPS_EXPERIENCE_ID,
    });

    if (!response) {
      return { success: false, error: "Experience not found using the SDK." };
    }
    
    // FINAL FIX: The property is .name, not .title, as the error told us.
    const experienceName = response.experience?.name;

    if (!experienceName) {
        return { success: false, error: "Could not find a name on the experience object."}
    }
    
    console.log('✅ Success! Fetched Experience via SDK:', experienceName);
    // Let's also return the name
    return { success: true, title: experienceName };

  } catch (error) {
    console.error("SDK Error:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}
