export default function Filtros({
  query,
  statusFilter,
  statusOptions,
  onQueryChange,
  onStatusChange,
  onClear
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Nome
          <input
            className="input-base mt-2"
            type="text"
            placeholder="Busque por nome"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>

        <label className="text-sm font-semibold text-ink">
          Status
          <select
            className="input-base mt-2"
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/50 sm:text-sm">
          Dica: combine nome e status para encontrar mais rapido.
        </p>
        <button
          type="button"
          className="btn-ghost w-full hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
          onClick={onClear}
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
