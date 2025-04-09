"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <main className="relative w-full h-[90vh] overflow-hidden bg-white">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero.webp')",
            filter: "brightness(0.6)",
          }}
        />

        {/* Contenido del hero */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-white text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shaving Made Simple</h1>
            <p className="text-lg md:text-xl mb-6">
              Quality razors, delivered to your door. No hassle, no overpaying.
            </p>
            <Link href="/get-started">
              <button className="bg-orange-500 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-orange-600 transition">
                {"LET'S DO IT"}
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* MINI FOOTER PEGADO AL HERO */}
      <div className="w-full bg-[#001F3F] text-white text-sm font-semibold px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:flex-wrap sm:justify-between items-center text-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-xl">✓</span>
            <span>FREE SHIPPING FOR ORDERS $18+</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-xl">✓</span>
            <span>30 DAY MONEY-BACK GUARANTEE</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-xl">✓</span>
            <span>PREMIUM BLADES. CLUB PRICES.</span>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE PRODUCTOS */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Producto 1 */}
          <div className="flex flex-col items-center text-center">
            <img src="/product1.webp" alt="Razor Starter Set" className="w-full max-w-sm mb-6 rounded-lg shadow-md" />
            <h3 className="text-2xl font-bold mb-2">The Starter Set</h3>
            <p className="text-gray-600">
              Everything you need to get going: our premium razor handle and blades, delivered straight to your door.
            </p>
          </div>

          {/* Producto 2 */}
          <div className="flex flex-col items-center text-center">
            <img src="/product2.webp" alt="Shave Essentials" className="w-full max-w-sm mb-6 rounded-lg shadow-md" />
            <h3 className="text-2xl font-bold mb-2">Shave Essentials</h3>
            <p className="text-gray-600">
              Creams, balms, and everything in between — designed to keep your skin smooth and refreshed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}