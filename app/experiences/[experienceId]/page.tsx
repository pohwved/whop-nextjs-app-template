import { whopApi } from '@/lib/whop-api';

// This is a Server Component. 
// The `params` prop is automatically passed by Next.js and contains the dynamic parts of the URL.
export default async function ExperiencePage({ 
  params 
}: { 
  params: { experienceId: string } 
}) {

  // Get the ID from the URL path, e.g., 'prod_LrkPsLXC5x9Wn'
  const { experienceId } = params; 

  let experienceName = "Error: Could not fetch name."; // Default error message

  try {
    // Use the final, correct SDK call we discovered.
    const response = await whopApi.getExperience({
      experienceId: experienceId, 
    });

    // Use the final, correct property name we discovered.
    if (response?.experience?.name) {
      experienceName = response.experience.name;
    } else {
      // This will be shown if the product isn't published yet
      experienceName = "Error: Experience not found (is it published in the Whop dashboard?).";
    }
  } catch (error) {
    console.error("SDK Error:", error);
    if (error instanceof Error) {
      experienceName = error.message;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Experience Details
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The ID for this experience (from the URL) is:
        </p>
        <p className="text-lg font-mono bg-gray-200 dark:bg-gray-700 p-2 my-4 rounded">
          {experienceId}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We used the SDK to find its real name:
        </p>
        <p className="text-2xl font-bold text-blue-500 mt-2">
          {experienceName}
        </p>
      </div>
    </main>
  );
}
