'use client';

export default function Home() {
  // This is a simple function that runs in the browser
  const handleTestClick = () => {
    alert("The client-side button click works!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Test Button Page
        </h1>
        <p className="mb-4">
          This button only triggers a simple browser alert.
        </p>
        <button
          onClick={handleTestClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Client Button
        </button>
      </div>
    </main>
  );
}
