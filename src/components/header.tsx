'use client'

import { Button } from "@/components/ui/button"

export default function Header() {
  const isLoggedIn = false // simula login (trocar depois por lógica real)

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* LOGO */}
      <div className="text-xl font-bold text-blue-600">
        LOGO
      </div>

      {/* BOTÕES DE NAVEGAÇÃO */}
      <nav className="space-x-4">
        <Button variant="ghost">Início</Button>
        <Button variant="ghost">Sobre</Button>
        <Button variant="ghost">Contato</Button>
      </nav>

      {/* USUÁRIO ou LOGIN */}
      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Olá, Henrique</span>
            <Button variant="outline">Sair</Button>
          </div>
        ) : (
          <div className="space-x-2">
            <Button variant="outline">Login</Button>
            <Button>Cadastro</Button>
          </div>
        )}
      </div>
    </header>
  )
}
