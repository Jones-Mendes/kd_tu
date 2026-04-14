export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-clay bg-white/60 px-6 py-10 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-clay border-t-tide" />
      <p className="text-sm text-ink/60 sm:text-base">Carregando informacoes...</p>
    </div>
  );
}
