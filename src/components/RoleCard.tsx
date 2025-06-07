// RoleCard.tsx
'use client'

type RoleCardProps = {
  rua: string
  bairro: string
  movimentacaoScore: number // 1 a 10
  tags: string[]
  cidade: string // adicionada, mas não exibida
}

function getMovimentacaoStyle(score: number) {
  if (score >= 8) return "bg-red-500 animate-pulse"
  if (score >= 5) return "bg-yellow-400 animate-ping"
  return "bg-green-400"
}

export default function RoleCard({ rua, bairro, movimentacaoScore, tags, cidade }: RoleCardProps) {
  const movimentacaoClass = getMovimentacaoStyle(movimentacaoScore)

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 bg-white shadow-sm w-full max-w-[340px]">
      {/* Parte 1: Local */}
      <div className="p-5 border-b border-gray-200">
        <p className="font-semibold text-gray-900 text-lg">{rua}</p>
        <p className="text-sm text-gray-600">{bairro}</p>
      </div>

      {/* Parte 2: Imagem + indicador */}
      <div className="relative h-48 bg-gray-100">
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 italic text-sm">
          Sem imagem
        </div>
        <div
          className={`absolute bottom-3 right-3 w-7 h-7 rounded-full ring-2 ring-white ${movimentacaoClass}`}
          title={`Movimentação: ${movimentacaoScore}/10`}
          aria-label={`Nível de movimentação: ${movimentacaoScore} de 10`}
          role="status"
        />
      </div>

      {/* Parte 3: Tags */}
      <div className="p-3 flex flex-wrap gap-1 border-t border-gray-200">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2 py-0.5 bg-gray-100 border border-gray-300 rounded-full text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
