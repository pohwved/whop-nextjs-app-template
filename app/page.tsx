import { headers } from 'next/headers';
import { WhopAPI } from '@whop/api'; // We'll use this for its type definitions

// This helper function correctly gets the installation data from the server request
async function getInstallationData() {
  const whopApi = new WhopAPI();
  try {
    // The SDK uses the request headers to securely get the context
    const installation = await whopApi.app.getAppInstallation({ headers: headers() });
    return installation;
  } catch (error) {
    console.error("Failed to get installation data:", error);
    return null;
  }
}

export default async function Home() {
  // Call our new function to get the data
  const installationData = await getInstallationData();

  // Format the data to display it on the page
  const dataString = JSON.stringify(installationData, null, 2);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-left bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Whop App Installation Context
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Using the Whop SDK, we've retrieved the following data for this installation:
        </p>
        <pre className="bg-gray-800 dark:bg-black text-white p-4 rounded-md overflow-x-auto">
          <code>
            {dataString || "No installation data found. Are you launching the app from your Whop dashboard?"}
          </code>
        </pre>
      </div>
    </main>
  );
}
