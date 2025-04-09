"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.webp')", // Asegurate de tener esta imagen en /public
          filter: "brightness(0.6)",
        }}
      />

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Shaving Made Simple
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl">
          Quality razors, delivered to your door. No hassle, no overpaying.
        </p>
        <Link href="/get-started">
          <button className="bg-orange-500 text-white text-lg sm:text-xl font-semibold px-8 py-4 rounded-full hover:bg-orange-600 transition">
            Get Started
          </button>
        </Link>
      </div>

      {/* Banner de beneficios */}
      <div className="absolute w-full bottom-0 sm:bottom-0 bottom-6 z-20 px-4">
        <section className="w-full bg-[#001F3F] text-white text-sm font-semibold px-4 py-3 rounded-md shadow-lg max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between items-center text-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-xl">✓</span>
              <span className="text-sm sm:text-base">FREE SHIPPING FOR ORDERS $18+</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-xl">✓</span>
              <span className="text-sm sm:text-base">30 DAY MONEY-BACK GUARANTEE</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-xl">✓</span>
              <span className="text-sm sm:text-base">PREMIUM BLADES. CLUB PRICES.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}