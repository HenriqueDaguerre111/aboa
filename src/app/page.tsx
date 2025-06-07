'use client'

import { useState, useRef, useEffect } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import RoleCard from '@/components/RoleCard'

const LeftArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

const RightArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

const ALL_TAGS = [
  "gratis",
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
export default function HomePage() {
  const [cidade, setCidade] = useState("porto-alegre")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedBairro, setSelectedBairro] = useState<string>("all")
  const [excludegratis, setExcludegratis] = useState(false)
  const [sortOrder, setSortOrder] = useState<"mais" | "menos">("mais")

  const topN = 5

const roles = [
    { rua: "Rua das Flores, 123", bairro: "Centro", movimentacaoScore: 9, tags: ["gratis", "de rua"], cidade: "porto-alegre" },
    { rua: "Av. Paulista, 1000", bairro: "Bela Vista", movimentacaoScore: 6, tags: ["LGBT", "eletronica"], cidade: "sao-paulo" },
    { rua: "Rua da Praia, 45", bairro: "Moinhos", movimentacaoScore: 3, tags: ["gratis"], cidade: "porto-alegre" },
    { rua: "Rua da Harmonia, 77", bairro: "Cidade Baixa", movimentacaoScore: 7, tags: ["de rua", "eletronica"], cidade: "porto-alegre" },
    { rua: "Rua das Acácias, 55", bairro: "Jardim Botanico", movimentacaoScore: 4, tags: ["LGBT"], cidade: "porto-alegre" },


     { rua: "Rua das Flores, 123", bairro: "Centro", movimentacaoScore: 9, tags: ["gratis", "de rua"], cidade: "porto-alegre" },
  { rua: "Av. Independência, 456", bairro: "Centro Histórico", movimentacaoScore: 7, tags: ["shows", "ao ar livre"], cidade: "porto-alegre" },
  { rua: "Rua da Praia, 789", bairro: "Moinhos de Vento", movimentacaoScore: 8, tags: ["bares", "DJ"], cidade: "porto-alegre" },
  { rua: "Av. Protásio Alves, 101", bairro: "Petrópolis", movimentacaoScore: 5, tags: ["gastronômico", "pet friendly"], cidade: "porto-alegre" },
  { rua: "Rua Padre Chagas, 202", bairro: "Moinhos de Vento", movimentacaoScore: 6, tags: ["open bar", "universitário"], cidade: "porto-alegre" },
  { rua: "Rua Sarmento Leite, 303", bairro: "Centro", movimentacaoScore: 4, tags: ["LGBT", "after"], cidade: "porto-alegre" },
  { rua: "Av. Goethe, 404", bairro: "Rio Branco", movimentacaoScore: 3, tags: ["cultura", "infantil"], cidade: "porto-alegre" },
  { rua: "Rua 24 de Outubro, 505", bairro: "Bom Fim", movimentacaoScore: 9, tags: ["DJ", "bares"], cidade: "porto-alegre" },
  { rua: "Rua José do Patrocínio, 606", bairro: "Cidade Baixa", movimentacaoScore: 7, tags: ["gratis", "de rua"], cidade: "porto-alegre" },
  { rua: "Av. Osvaldo Aranha, 707", bairro: "Bom Fim", movimentacaoScore: 8, tags: ["shows", "universitário"], cidade: "porto-alegre" },

  { rua: "Rua dos Andradas, 808", bairro: "Centro Histórico", movimentacaoScore: 6, tags: ["pet friendly", "gastronômico"], cidade: "porto-alegre" },
  { rua: "Rua Coronel Bordini, 909", bairro: "Menino Deus", movimentacaoScore: 5, tags: ["open bar", "LGBT"], cidade: "porto-alegre" },
  { rua: "Av. Carlos Gomes, 1001", bairro: "Moinhos de Vento", movimentacaoScore: 7, tags: ["cultura", "de rua"], cidade: "porto-alegre" },
  { rua: "Rua Félix da Cunha, 1102", bairro: "Rio Branco", movimentacaoScore: 4, tags: ["gratis", "after"], cidade: "porto-alegre" },
  { rua: "Rua 13 de Maio, 1203", bairro: "Centro", movimentacaoScore: 3, tags: ["eletronica", "bares"], cidade: "porto-alegre" },
  { rua: "Av. Ipiranga, 1304", bairro: "Centro", movimentacaoScore: 8, tags: ["universitário", "DJ"], cidade: "porto-alegre" },
  { rua: "Rua Dom Pedro II, 1405", bairro: "Cidade Baixa", movimentacaoScore: 9, tags: ["gratis", "shows"], cidade: "porto-alegre" },
  { rua: "Rua Barão do Amazonas, 1506", bairro: "Centro Histórico", movimentacaoScore: 6, tags: ["pet friendly", "infantil"], cidade: "porto-alegre" },
  { rua: "Av. José Bonifácio, 1607", bairro: "Menino Deus", movimentacaoScore: 5, tags: ["open bar", "gastronômico"], cidade: "porto-alegre" },
  { rua: "Rua Dr. Flores, 1708", bairro: "Rio Branco", movimentacaoScore: 7, tags: ["de rua", "LGBT"], cidade: "porto-alegre" },

  { rua: "Rua 7 de Setembro, 1809", bairro: "Centro", movimentacaoScore: 6, tags: ["shows", "eletronica"], cidade: "porto-alegre" },
  { rua: "Av. Praia de Belas, 1901", bairro: "Praia de Belas", movimentacaoScore: 7, tags: ["DJ", "gratis"], cidade: "porto-alegre" },
  { rua: "Rua Mariante, 2002", bairro: "Bom Fim", movimentacaoScore: 4, tags: ["cultura", "after"], cidade: "porto-alegre" },
  { rua: "Rua Marquês do Pombal, 2103", bairro: "Centro Histórico", movimentacaoScore: 5, tags: ["pet friendly", "bares"], cidade: "porto-alegre" },
  { rua: "Av. Bento Gonçalves, 2204", bairro: "Sarandi", movimentacaoScore: 3, tags: ["gastronômico", "universitário"], cidade: "porto-alegre" },
  { rua: "Rua Coronel Vicente, 2305", bairro: "Petrópolis", movimentacaoScore: 8, tags: ["open bar", "LGBT"], cidade: "porto-alegre" },
  { rua: "Rua Barão do Amazonas, 2406", bairro: "Centro Histórico", movimentacaoScore: 6, tags: ["eletronica", "de rua"], cidade: "porto-alegre" },
  { rua: "Rua José Montaury, 2507", bairro: "Centro", movimentacaoScore: 7, tags: ["gratis", "shows"], cidade: "porto-alegre" },
  { rua: "Av. Nilo Peçanha, 2608", bairro: "Moinhos de Vento", movimentacaoScore: 5, tags: ["DJ", "pet friendly"], cidade: "porto-alegre" },
  { rua: "Rua Eudoro Berlink, 2709", bairro: "Menino Deus", movimentacaoScore: 9, tags: ["after", "cultura"], cidade: "porto-alegre" },

  { rua: "Rua Lima e Silva, 2801", bairro: "Centro", movimentacaoScore: 4, tags: ["bares", "gastronômico"], cidade: "porto-alegre" },
  { rua: "Rua Garibaldi, 2902", bairro: "Bom Fim", movimentacaoScore: 3, tags: ["universitário", "gratis"], cidade: "porto-alegre" },
  { rua: "Rua Marquês do Herval, 3003", bairro: "Cidade Baixa", movimentacaoScore: 6, tags: ["eletronica", "LGBT"], cidade: "porto-alegre" },
  { rua: "Rua José do Patrocínio, 3104", bairro: "Centro", movimentacaoScore: 7, tags: ["de rua", "DJ"], cidade: "porto-alegre" },
  { rua: "Rua Venâncio Aires, 3205", bairro: "Centro Histórico", movimentacaoScore: 5, tags: ["pet friendly", "after"], cidade: "porto-alegre" },
  { rua: "Rua General Lima e Silva, 3306", bairro: "Rio Branco", movimentacaoScore: 4, tags: ["gastronômico", "open bar"], cidade: "porto-alegre" },
  { rua: "Rua Coronel Vicente, 3407", bairro: "Petrópolis", movimentacaoScore: 8, tags: ["universitário", "shows"], cidade: "porto-alegre" },
  { rua: "Rua Siqueira Campos, 3508", bairro: "Menino Deus", movimentacaoScore: 7, tags: ["gratis", "bares"], cidade: "porto-alegre" },
  { rua: "Rua Barão do Triunfo, 3609", bairro: "Centro", movimentacaoScore: 6, tags: ["LGBT", "eletronica"], cidade: "porto-alegre" },
  { rua: "Rua Jerônimo Coelho, 3701", bairro: "Bom Fim", movimentacaoScore: 5, tags: ["de rua", "DJ"], cidade: "porto-alegre" },

  { rua: "Rua dos Andradas, 3802", bairro: "Centro Histórico", movimentacaoScore: 4, tags: ["after", "pet friendly"], cidade: "porto-alegre" },
  { rua: "Rua Padre Chagas, 3903", bairro: "Moinhos de Vento", movimentacaoScore: 3, tags: ["gastronômico", "shows"], cidade: "porto-alegre" },
  { rua: "Rua Marquês do Pombal, 4004", bairro: "Centro Histórico", movimentacaoScore: 8, tags: ["gratis", "universitário"], cidade: "porto-alegre" },
  { rua: "Av. Ipiranga, 4105", bairro: "Centro", movimentacaoScore: 7, tags: ["eletronica", "bares"], cidade: "porto-alegre" },
  { rua: "Rua Sarmento Leite, 4206", bairro: "Centro", movimentacaoScore: 6, tags: ["DJ", "LGBT"], cidade: "porto-alegre" },
  { rua: "Rua Lima e Silva, 4307", bairro: "Centro", movimentacaoScore: 5, tags: ["de rua", "pet friendly"], cidade: "porto-alegre" },
  { rua: "Rua Coronel Bordini, 4408", bairro: "Menino Deus", movimentacaoScore: 4, tags: ["after", "open bar"], cidade: "porto-alegre" },
  { rua: "Rua 24 de Outubro, 4509", bairro: "Bom Fim", movimentacaoScore: 3, tags: ["gastronômico", "shows"], cidade: "porto-alegre" },
  { rua: "Rua José Montaury, 4601", bairro: "Centro", movimentacaoScore: 2, tags: ["universitário", "gratis"], cidade: "porto-alegre" },
  { rua: "Rua Venâncio Aires, 4702", bairro: "Centro Histórico", movimentacaoScore: 1, tags: ["eletronica", "DJ"], cidade: "porto-alegre" }

  ]

  const bairros = Array.from(new Set(roles.filter(role => role.cidade === cidade).map(role => role.bairro))).sort()

  function toggleTag(tag: string) {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const topRoles = roles
    .filter(role => role.cidade === cidade)
    .sort((a, b) => b.movimentacaoScore - a.movimentacaoScore)
    .slice(0, topN)

  const filteredRoles = roles
    .filter(role => role.cidade === cidade)
    .filter(role => (selectedBairro && selectedBairro !== "all") ? role.bairro === selectedBairro : true)
    .filter(role => excludegratis ? !role.tags.includes("gratis") : true)
    .filter(role => selectedTags.length === 0 ? true : selectedTags.every(tag => role.tags.includes(tag)))
    .sort((a, b) => sortOrder === "mais" ? b.movimentacaoScore - a.movimentacaoScore : a.movimentacaoScore - b.movimentacaoScore)

  function updateArrowsVisibility() {
    const container = scrollContainerRef.current
    if (!container) return
    const { scrollLeft, scrollWidth, clientWidth } = container
    setShowLeftArrow(scrollLeft > 5)
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5)
  }

  function scrollLeft() {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
  }

  function scrollRight() {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      updateArrowsVisibility()
    }, 100)

    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', updateArrowsVisibility)
    window.addEventListener('resize', updateArrowsVisibility)

    return () => {
      clearTimeout(timer)
      container.removeEventListener('scroll', updateArrowsVisibility)
      window.removeEventListener('resize', updateArrowsVisibility)
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    container.scrollTo({ left: 0, behavior: 'smooth' })
    setIsChanging(true)
    const timeout = setTimeout(() => setIsChanging(false), 500)
    return () => clearTimeout(timeout)
  }, [cidade])

  return (
    <div className="space-y-10 px-4 max-w-7xl mx-auto">

      {/* Filtro cidade */}
      <div className="flex items-center flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Roles mais movimentados agora em
        </h1>

        <Select
          value={cidade}
          onValueChange={(value) => setCidade(value)}
          // className="w-[180px]"
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="porto-alegre">Porto Alegre</SelectItem>
            <SelectItem value="sao-paulo">São Paulo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards horizontais */}
      <div className="relative flex items-center">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150 flex items-center justify-center"
            aria-label="Scroll para esquerda"
          >
            <LeftArrowIcon />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className={`overflow-x-hidden mx-2 transition-transform duration-300 ${isChanging ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}
          style={{ width: 'calc(100% - 64px)' }}
        >
          <div
            className="grid gap-[2px] px-2"
            style={{ gridTemplateColumns: `repeat(${topRoles.length}, 340px)` }}
          >
            {topRoles.map((role, idx) => (
              <RoleCard key={idx} {...role} />
            ))}
          </div>
        </div>

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150 flex items-center justify-center"
            aria-label="Scroll para direita"
          >
            <RightArrowIcon />
          </button>
        )}
      </div>

      {/* Filtros avançados */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Qual role vc prefere?</h2>

        <div className="flex flex-wrap gap-6 items-center">
          <div>
            <label className="block mb-1 font-medium">Filtrar por tags:</label>
            <div className="flex gap-2 flex-wrap max-w-[400px]">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full border font-semibold text-sm select-none
                    ${selectedTags.includes(tag) ? "bg-blue-600 text-white border-blue-600" : "border-gray-400 text-gray-700"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-[180px]">
            <label className="block mb-1 font-medium" htmlFor="bairro-select">Filtrar por bairro:</label>
            <Select
              value={selectedBairro}
              onValueChange={(value) => setSelectedBairro(value)}
              // id="bairro-select"
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os bairros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os bairros</SelectItem>
                {bairros.map(bairro => (
                  <SelectItem key={bairro} value={bairro}>{bairro}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 min-w-[140px]">
            <Checkbox
              id="exclude-gratis"
              checked={excludegratis}
              onCheckedChange={(checked) => setExcludegratis(Boolean(checked))}
            />
            <label htmlFor="exclude-gratis" className="select-none text-gray-700 font-medium">
              Excluir gratis
            </label>
          </div>

          <div className="min-w-[200px]">
            <label className="block mb-1 font-medium" htmlFor="ordenacao-select">Ordenar por movimentação:</label>
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as "mais" | "menos")}
              // id="ordenacao-select"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mais">Mais movimentados primeiro</SelectItem>
                <SelectItem value="menos">Menos movimentados primeiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px]">
          {filteredRoles.length === 0 && (
            <p className="text-gray-500 col-span-full">Nenhum role encontrado com os filtros aplicados.</p>
          )}
          {filteredRoles.map((role, idx) => (
            <RoleCard key={`filter-${idx}`} {...role} />
          ))}
        </div>
      </section>
    </div>
  )
}
