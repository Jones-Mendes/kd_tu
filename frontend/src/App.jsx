import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero.jsx";
import Filtros from "./components/Filtros.jsx";
import FormularioPessoa from "./components/FormularioPessoa.jsx";
import PessoaCard from "./components/PessoaCard.jsx";
import PessoaModal from "./components/PessoaModal.jsx";
import Loading from "./components/Loading.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3001";
const API_URL = `${API_BASE_URL}/pessoas`;

const statusLabels = {
  desaparecido: "Desaparecido",
  encontrado: "Encontrado"
};

const statusOptions = [
  { value: "all", label: "Todos" },
  { value: "desaparecido", label: "Desaparecido" },
  { value: "encontrado", label: "Encontrado" }
];

export default function App() {
  // Controla estados principais da tela e dados carregados.
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionId, setActionId] = useState("");
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);

  // Busca dados da API e atualiza o estado principal.
  const loadPessoas = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Falha ao carregar dados");
      }
      const data = await response.json();
      setPessoas(data);
    } catch (err) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPessoas();
  }, []);

  // Aplica filtros de forma eficiente sem recalcular desnecessariamente.
  const filteredPessoas = useMemo(() => {
    const search = query.trim().toLowerCase();

    return pessoas.filter((pessoa) => {
      const matchesName = !search || pessoa.nome.toLowerCase().includes(search);
      const matchesStatus = statusFilter === "all" || pessoa.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [pessoas, query, statusFilter]);

  const handleCreate = async (payload) => {
    setError("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.erro || "Falha ao cadastrar");
      }

      await loadPessoas();
    } catch (err) {
      setError(err.message || "Erro ao cadastrar");
    }
  };

  // Atualiza o status mantendo feedback visual durante a chamada.
  const handleUpdateStatus = async (id, status) => {
    setActionId(id);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.erro || "Falha ao atualizar status");
      }

      const updated = await response.json();
      setPessoas((prev) =>
        prev.map((pessoa) => (pessoa.id === updated.id ? updated : pessoa))
      );
    } catch (err) {
      setError(err.message || "Erro ao atualizar");
    } finally {
      setActionId("");
    }
  };

  const handleClearFilters = () => {
    setQuery("");
    setStatusFilter("all");
  };

  const handleScrollToList = () => {
    const section = document.getElementById("pessoas");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Abre e fecha o modal com a pessoa selecionada.
  const handleSelectPessoa = (pessoa) => {
    setPessoaSelecionada(pessoa);
  };

  const handleCloseModal = () => {
    setPessoaSelecionada(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Hero onCtaClick={handleScrollToList} />
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />

      <PessoaModal pessoa={pessoaSelecionada} onClose={handleCloseModal} />

      <header className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-8 pt-10 sm:px-6 sm:pt-12">
        <div className="glass-panel rounded-3xl px-6 py-8 shadow-soft sm:px-8 sm:py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tide">
                KD TU | Enchentes 2026
              </p>
              <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl md:text-4xl lg:text-5xl">
                Cadastro de pessoas desaparecidas
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
                Centralize informacoes, atualize status em tempo real e conecte
                familias durante emergencias.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="glass-panel rounded-2xl px-4 py-3 text-center shadow-soft sm:px-5 sm:py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Total</p>
                <p className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{pessoas.length}</p>
              </div>
              <div className="glass-panel hidden rounded-2xl px-4 py-3 text-center shadow-soft sm:px-5 sm:py-4 md:block">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Ativos</p>
                <p className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
                  {pessoas.filter((pessoa) => pessoa.status === "desaparecido").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-3xl p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-ink">
              Filtros rapidos
            </h2>
            <p className="mt-1 text-sm text-ink/60 sm:text-base">
              Encontre pessoas por nome ou status.
            </p>
            <div className="mt-4">
              <Filtros
                query={query}
                statusFilter={statusFilter}
                statusOptions={statusOptions}
                onQueryChange={setQuery}
                onStatusChange={setStatusFilter}
                onClear={handleClearFilters}
              />
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-ink">
              Novo cadastro
            </h2>
            <p className="mt-1 text-sm text-ink/60 sm:text-base">
              Insira os dados para registrar uma nova pessoa.
            </p>
            <div className="mt-4">
              <FormularioPessoa onSubmit={handleCreate} />
            </div>
          </div>
        </section>

        {error ? <ErrorBanner message={error} /> : null}

        <section id="pessoas" className="glass-panel rounded-3xl p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-ink">
              Pessoas cadastradas
            </h2>
            <p className="text-sm text-ink/60 sm:text-base">
              {filteredPessoas.length} resultados
            </p>
          </div>

          <div className="mt-6">
            {loading ? (
              <Loading />
            ) : filteredPessoas.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-clay bg-white/60 px-6 py-10 text-center text-sm text-ink/60">
                Nenhuma pessoa encontrada com os filtros atuais.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPessoas.map((pessoa) => (
                  <PessoaCard
                    key={pessoa.id}
                    pessoa={pessoa}
                    statusLabels={statusLabels}
                    onUpdateStatus={handleUpdateStatus}
                    onSelect={handleSelectPessoa}
                    disabled={actionId === pessoa.id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
