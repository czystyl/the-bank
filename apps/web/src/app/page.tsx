export default function HomePage() {
  return (
    <main className="flex h-screen flex-1 flex-col items-center justify-center bg-gray-800">
      <div className="flex w-full max-w-xl flex-col items-center justify-center sm:flex-row">
        <div className="flex-column mb-10 flex w-full justify-center sm:mb-0 sm:mr-10 sm:w-1/2">
          <h1 className="px-46 px ju bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent">
            The Bank
          </h1>
        </div>
        <div className="flex-column flex w-full justify-center sm:w-1/2">
          <button className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100">
            Zaloguj się
          </button>
        </div>
      </div>
    </main>
  );
}
