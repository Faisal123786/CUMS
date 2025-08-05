import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <h1 className="bg-background text-text">Welcome to Empowering Villages</h1>
      <p className="mt-2 text-text bg-background">This platform supports light and dark mode.</p>
      <div className="mt-6">
      </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
