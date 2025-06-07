'use client'

import { useState, useMemo } from 'react'
import RoleCard from '@/components/RoleCard'
import RoleCardHighlight from '@/components/RoleCardHighlight' // Criarei esse abaixo

const ALL_TAGS = [
  "Gratis",
  "de rua",
  "LGBT",
  "eletronica",
  "ao ar livre",
  "bares",
  "shows",
  "DJ",
  "after",
  "cultura",
  "gastronômico",
  "pet friendly",
  "infantil",
  "open bar",
  "universitário"
]
type Role = {
  rua: string
  bairro: string
  movimentacaoScore: number
  tags: string[]
  cidade: string
}

export default function RoleFilter({ cidade, roles }: { cidade: string, roles: Role[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedBairro, setSelectedBairro] = useState<string | "">("")
  const [excludeGratis, setExcludeGratis] = useState(false)
  const [sortOrder, setSortOrder] = useState<"mais" | "menos">("mais")

  // Extrai bairros da cidade para dropdown
  const bairros = useMemo(() => {
    const bairrosSet = new Set<string>()
    roles.forEach(r => {
      if (r.cidade === cidade) bairrosSet.add(r.bairro)
    })
    return Array.from(bairrosSet).sort()
  }, [roles, cidade])

  // Função para alterar seleção de tags (multi-select toggle)
  function toggleTag(tag: string) {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Filtra os roles pela cidade + tags + bairro + excluir gratis
  const filteredRoles = useMemo(() => {
    return roles
      .filter(r => r.cidade === cidade)
      .filter(r => {
        if (selectedTags.length === 0) return true
        // Deve conter todas as tags selecionadas
        return selectedTags.every(tag => r.tags.includes(tag))
      })
      .filter(r => {
        if (!selectedBairro) return true
        return r.bairro === selectedBairro
      })
      .filter(r => {
        if (!excludeGratis) return true
        return !r.tags.includes("Gratis")
      })
      .sort((a, b) => {
        if (sortOrder === "mais") return b.movimentacaoScore - a.movimentacaoScore
        else return a.movimentacaoScore - b.movimentacaoScore
      })
  }, [roles, cidade, selectedTags, selectedBairro, excludeGratis, sortOrder])

  // Separar os mais movimentados (>=8) e os demais
  const maisMovimentados = filteredRoles.filter(r => r.movimentacaoScore >= 8)
  const outros = filteredRoles.filter(r => r.movimentacaoScore < 8)

  return (
    <div className="space-y-6 p-4 border-t border-gray-300">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Qual role você prefere?</h2>

      {/* Tags filtro */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ALL_TAGS.map(tag => {
          const selected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-md border font-semibold transition 
                ${selected ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"}
              `}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {/* Bairro + Excluir gratis + Ordenação */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          value={selectedBairro}
          onChange={e => setSelectedBairro(e.target.value)}
          className="border border-gray-400 rounded px-3 py-1"
        >
          <option value="">Todos os bairros</option>
          {bairros.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={excludeGratis}
            onChange={() => setExcludeGratis(!excludeGratis)}
            className="cursor-pointer"
          />
          Excluir opções gratuitas
        </label>

        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as "mais" | "menos")}
          className="border border-gray-400 rounded px-3 py-1"
        >
          <option value="mais">Mais movimentado</option>
          <option value="menos">Menos movimentado</option>
        </select>
      </div>

      {/* Cards */}
      <div className="space-y-10">
        {/* Mais movimentados */}
        {maisMovimentados.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-4">Mais movimentados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {maisMovimentados.map((role, idx) => (
                <RoleCardHighlight key={idx} {...role} />
              ))}
            </div>
          </>
        )}

        {/* Outros */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Outros</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {outros.map((role, idx) => (
              <RoleCard key={idx} {...role} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
