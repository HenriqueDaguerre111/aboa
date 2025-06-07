'use client'

type RoleCardHighlightProps = {
  rua: string
  bairro: string
  movimentacaoScore: number
  tags: string[]
}

function getMovimentacaoStyle(score: number) {
  if (score >= 8) return "bg-red-600 animate-pulse"
  if (score >= 5) return "bg-yellow-400 animate-ping"
  return "bg-green-400"
}

export default function RoleCardHighlight({ rua, bairro, movimentacaoScore, tags }: RoleCardHighlightProps) {
  const movimentacaoClass = getMovimentacaoStyle(movimentacaoScore)

  return (
    <div className="flex flex-col rounded-xl border-2 border-red-600 bg-red-50 shadow-lg w-full p-5">
      <div className="mb-3">
        <p className="font-bold text-red-700 text-lg">{rua}</p>
        <p className="text-sm text-red-600">{bairro}</p>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-8 h-8 rounded-full ${movimentacaoClass}`}
          title={`Movimentação: ${movimentacaoScore}/10`}
        />
        <span className="text-red-700 font-semibold text-sm">Movimentação alta</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="text-xs font-semibold px-3 py-1 border border-red-600 rounded-md text-red-700 select-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
