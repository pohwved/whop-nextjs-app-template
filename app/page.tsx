// This is a Server Component. 'searchParams' is automatically passed by Next.js.
export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  // We'll format the parameters to display them nicely.
  const paramsString = JSON.stringify(searchParams, null, 2);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-left bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Whop App Installation Context
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          When your app is launched from the Whop dashboard, Whop provides the following information to it, likely as URL search parameters:
        </p>
        <pre className="bg-gray-800 dark:bg-black text-white p-4 rounded-md overflow-x-auto">
          <code>
            {paramsString}
          </code>
        </pre>
      </div>
    </main>
  );
}
