import { useState } from "react"
import { Button } from "@components/ui/button"
import Home from "./components/Home"
import { Input } from "@components/ui/input" // 1. Re-importamos el Input
import { SearchIcon, Menu, X } from "lucide-react"
import Panel from "@components/Panel"
import { ThemeProvider } from "@components/theme-provider"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
      <div className="flex flex-col h-screen w-full">
        <header className="relative bg-black w-full h-20 shadow-md px-4 sm:px-8 md:px-24 flex justify-between items-center">
          {/* Logo Section */}
          <div className="h-full py-3 flex-shrink-0">
              <img 
                src="/img/nike.png" 
                alt="Nike Logo" 
                className="h-full w-auto"
              />
          </div>
          
          {/* Desktop Navigation (Centrada) */}
          <nav className="hidden md:flex items-center justify-center gap-4 absolute left-1/2 -translate-x-1/2">
            <Button variant={"link"} className=" text-white hover:cursor-pointer">Lo nuevo</Button>
            <Button variant={"link"} className=" text-white hover:cursor-pointer">Hombre</Button>
            <Button variant={"link"} className=" text-white hover:cursor-pointer">Mujer</Button>
            <Button variant={"link"} className=" text-white hover:cursor-pointer">Niño/a</Button>
            <Button variant={"link"} className=" text-white hover:cursor-pointer">Ofertas</Button>
          </nav>
          
          {/* Actions Section (Search and Mobile Menu) */}
          <div className="flex items-center gap-2">
            {/* Barra de búsqueda para escritorio */}
            <form className="hidden lg:block relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input 
                id="buscar" 
                placeholder="Buscar..."
                className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-400 pl-10 rounded-full"
              />
            </form>

            {/* Botón de búsqueda para móvil */}
            <Button 
              variant={"ghost"}
              className="p-2 hover:cursor-pointer lg:hidden hover:shadow-[inset_0_0_0_1px_white] transition-shadow duration-300"
            >
              <SearchIcon
                className=" w-6 h-6 text-white"
              />
            </Button>
            
            {/* Botón del menú de hamburguesa */}
            <Button
              variant={"ghost"}
              className="p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </Button>
          </div>
        </header>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="absolute top-20 left-0 w-full bg-black flex flex-col items-center p-4 md:hidden z-10">
              <Button variant={"link"} className=" text-white w-full py-2">Lo nuevo</Button>
              <Button variant={"link"} className=" text-white w-full py-2">Hombre</Button>
              <Button variant={"link"} className=" text-white w-full py-2">Mujer</Button>
              <Button variant={"link"} className=" text-white w-full py-2">Niño/a</Button>
              <Button variant={"link"} className=" text-white w-full py-2">Ofertas</Button>
          </nav>
        )}

        <div className=" flex-1 relative">
          <Home/>
          <Panel/>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

