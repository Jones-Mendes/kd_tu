export default function Hero({ onCtaClick }) {
  return (
    <section className="relative h-[360px] w-full overflow-hidden sm:h-[440px] md:h-[520px] lg:h-[640px]">
      <img
        src="/images/kd_tu.jpg"
        alt="Imagem de enchentes"
        className="h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center sm:px-6">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl [-webkit-text-stroke:1px_red] [text-shadow:1px_1px_0_red,-1px_1px_0_red,1px_-1px_0_red,-1px_-1px_0_red]">
            SOS Enchentes
          </h1>

          <p className="mt-4 text-sm text-white/80 sm:text-base md:text-lg">
            Encontre e ajude pessoas desaparecidas
          </p>

          <button
            type="button"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:px-8 sm:py-3.5"
            onClick={onCtaClick}
          >
            Ver desaparecidos
          </button>
        </div>
      </div>
    </section>
  );
}
