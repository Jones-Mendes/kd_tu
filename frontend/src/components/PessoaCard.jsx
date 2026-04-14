const statusStyles = {
  desaparecido: "bg-red-100 text-red-700",
  encontrado: "bg-emerald-100 text-emerald-700"
};

export default function PessoaCard({
  pessoa,
  statusLabels,
  onUpdateStatus,
  onSelect,
  disabled,
}) {
  // Evita clique no card quando aciona botoes internos.
  const confirmarAtualizacao = (id, status) => {
    if (window.confirm(`Tem certeza que deseja marcar como ${status}?`)) {
      onUpdateStatus(id, status);
    }
  };

  return (
    <article
      className="animate-fadeUp cursor-pointer rounded-2xl bg-white/80 p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-glow"
      onClick={() => onSelect && onSelect(pessoa)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" && onSelect) {
          onSelect(pessoa);
        }
      }}
    >
      <div className="flex items-start gap-4">
        <img
          className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white sm:h-16 sm:w-16"
          src={pessoa.foto}
          alt={`Foto de ${pessoa.nome}`}
          loading="lazy"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                {pessoa.nome}
              </h3>
              <p className="text-sm text-ink/60">
                {(pessoa.estado || pessoa.cidade)} · {pessoa.idade} anos
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                statusStyles[pessoa.status]
              }`}
            >
              {statusLabels[pessoa.status]}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-ghost px-4 py-2 text-xs hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 sm:text-sm"
              onClick={(event) => {
                event.stopPropagation();
                confirmarAtualizacao(pessoa.id, "encontrado");
              }}
              disabled={disabled}
            >
              Marcar encontrado
            </button>
            <button
              type="button"
              className="btn-ghost px-4 py-2 text-xs hover:border-red-300 hover:bg-red-50 hover:text-red-700 sm:text-sm"
              onClick={(event) => {
                event.stopPropagation();
                confirmarAtualizacao(pessoa.id, "desaparecido");
              }}
              disabled={disabled}
            >
              Marcar desaparecido
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
