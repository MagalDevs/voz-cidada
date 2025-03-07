import { Bell, LogOut, User } from 'lucide-react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-[#2B87B3] text-white p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User className="h-8 w-8" />
                        <div className="flex flex-col">
                            <span className="text-sm">Nome_cidadão</span>
                            <button className="text-xs hover:underline">
                                <span className="flex items-center gap-1">
                                    <LogOut className="h-3 w-3" />
                                    Finalizar Sessão
                                </span>
                            </button>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="hover:underline font-montserrat">HOME</Link>
                        <Link to="/about" className="hover:underline font-montserrat">SOBRE NÓS</Link>
                        <Link to="/contact" className="hover:underline font-montserrat">FALE CONOSCO</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Bell className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                1
                            </span>
                        </div>
                    </div>
                </div>
            </header>
  )
}

export default Header