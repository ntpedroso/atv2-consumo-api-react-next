
"use client";

import { Search, Bell } from "lucide-react";

const Navbar = () => {
    return (
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-black w-full px-4 sm:px-6 lg:px-8 pt-20 pb-4 lg:py-4 border-b border-roxo text-white">

            {/* Saudação */}
            <div>
                <div className="flex flex-col">
                    <h1 className="text-lg sm:text-xl">
                        Olá, <b>Natasha!</b>
                    </h1>
                    <h2 className="text-sm sm:text-base text-gray-300">
                        O que vamos escutar hoje?
                    </h2>
                </div>
            </div>


            {/* Barra de Pesquisa */}
            <div className="flex items-center gap-3 w-full lg:w-auto">

                <div className="flex items-center bg-roxo-claro rounded-full flex-1 lg:w-80 xl:w-96 min-w-0">

                    <input
                        type="search"
                        placeholder="Digite uma música, artista, álbum..."
                        aria-label="Pesquisar músicas, artistas ou álbuns"
                        className="w-full min-w-0 py-2 px-4 sm:px-6 bg-transparent rounded-full focus:outline-none text-black placeholder:text-gray-600 text-sm"
                    />

                    <button
                        type="button"
                        aria-label="Pesquisar"
                        className="p-2 mr-1 text-black hover:text-roxo transition-colors cursor-pointer"
                    >
                        <Search size={20} />
                    </button>
                </div>

                {/* Notificação */}
                <button
                    type="button"
                    aria-label="Notificações"
                    className="rounded-full p-2.5 bg-roxo hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                >
                    <Bell size={20} />
                </button>

            </div>
        </header>
    );
};

export default Navbar;
