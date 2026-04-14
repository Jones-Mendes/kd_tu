import { useState } from "react";

const initialState = {
  nome: "",
  idade: "",
  estado: "",
  foto: "",
  ultimaLocalizacao: ""
};

const estados = [
  "Acre ",
  "Alagoas",
  "Amapa",
  "Amazonas",
  "Bahia",
  "Ceara",
  "Distrito Federal",
  "Espirito Santo",
  "Goias",
  "Maranhao",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Para",
  "Paraiba",
  "Parana",
  "Pernambuco",
  "Piaui",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondonia",
  "Roraima",
  "Santa Catarina",
  "Sao Paulo",
  "Sergipe",
  "Tocantins"
];

export default function FormularioPessoa({ onSubmit }) {
  // Controla os campos do formulario e o estado de envio.
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nome || !form.idade || !form.estado) {
      return;
    }

    // Envia dados normalizados para o backend.
    setSubmitting(true);
    await onSubmit({
      nome: form.nome.trim(),
      idade: Number(form.idade),
      estado: form.estado,
      foto: form.foto.trim(),
      ultimaLocalizacao: form.ultimaLocalizacao.trim()
    });
    setSubmitting(false);
    setForm(initialState);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="text-sm font-semibold text-ink">
        Nome
        <input
          className="input-base mt-2"
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Idade
          <input
            className="input-base mt-2"
            type="number"
            min="0"
            name="idade"
            placeholder="Ex: 32"
            value={form.idade}
            onChange={handleChange}
            required
          />
        </label>

        <label className="text-sm font-semibold text-ink">
          Natural do estado
          <select
            className="input-base mt-2"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um estado
            </option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="text-sm font-semibold text-ink">
        Foto (URL)
        <input
          className="input-base mt-2"
          type="url"
          name="foto"
          placeholder="https://"
          value={form.foto}
          onChange={handleChange}
        />
      </label>

      <label className="text-sm font-semibold text-ink">
        Ultima localizacao
        <input
          className="input-base mt-2"
          type="text"
          name="ultimaLocalizacao"
          placeholder="Ex: Bairro Central"
          value={form.ultimaLocalizacao}
          onChange={handleChange}
        />
      </label>

      <button className="btn-primary w-full md:w-auto" type="submit" disabled={submitting}>
        {submitting ? "Cadastrando..." : "Cadastrar pessoa"}
      </button>
    </form>
  );
}
