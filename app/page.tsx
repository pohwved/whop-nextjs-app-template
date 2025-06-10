import { headers } from 'next/headers';
// The correct way: Import the exact function we need directly from the package.
import { getAppInstallation } from '@whop/api';

export default async function Home() {
  let installationData = null;
  let errorMessage = null;

  try {
    // Call the imported function directly.
    // It reads the necessary info from the request headers.
    installationData = await getAppInstallation({ headers: headers() });
  } catch (error) {
    console.error("Error fetching installation data:", error);
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "An unknown error occurred.";
    }
  }

  // Format the data to display it on the page
  const dataString = JSON.stringify(installationData, null, 2);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-left bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Whop App Installation Context
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          The following data was retrieved for this app installation:
        </p>
        <pre className="bg-gray-800 dark:bg-black text-white p-4 rounded-md overflow-x-auto">
          <code>
            {errorMessage ? `Error: ${errorMessage}` : dataString}
          </code>
        </pre>
      </div>
    </main>
  );
}
