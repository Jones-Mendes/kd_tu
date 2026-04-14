// Formata datas para exibicao amigavel no modal.
const formatDate = (value) => {
  if (!value) {
    return "Nao informado";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("pt-BR");
};

export default function PessoaModal({ pessoa, onClose }) {
  if (!pessoa) {
    return null;
  }

  const estado = pessoa.estado || pessoa.cidade || "Nao informado";
  const ultimaLocalizacao = pessoa.ultimaLocalizacao || "Desconhecida";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl animate-fadeUp rounded-2xl bg-white p-5 shadow-soft transition duration-200 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
              Detalhes completos
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
              {pessoa.nome}
            </h3>
          </div>
          <button
            type="button"
            className="rounded-full border border-clay px-3 py-1 text-sm font-semibold text-ink/70 transition hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            onClick={onClose}
            aria-label="Fechar"
          >
            X
          </button>
        </div>

        <div className="mt-6 grid max-h-[70vh] gap-6 overflow-y-auto pr-1 md:max-h-none md:grid-cols-[220px_1fr]">
          <img
            className="h-52 w-full rounded-2xl object-cover sm:h-60"
            src={pessoa.foto}
            alt={`Foto de ${pessoa.nome}`}
          />

          <div className="space-y-3 text-sm text-ink/70 sm:text-base">
            <p>
              <span className="font-semibold text-ink">Idade:</span> {pessoa.idade} anos
            </p>
            <p>
              <span className="font-semibold text-ink">Estado:</span> {estado}
            </p>
            <p>
              <span className="font-semibold text-ink">Status:</span> {pessoa.status}
            </p>
            <p>
              <span className="font-semibold text-ink">Ultima localizacao:</span> {ultimaLocalizacao}
            </p>
            <p>
              <span className="font-semibold text-ink">Criado em:</span> {formatDate(pessoa.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
