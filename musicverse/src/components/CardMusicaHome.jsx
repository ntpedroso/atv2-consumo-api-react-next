
"use client";

import { Play } from "lucide-react";

const CardMusicaHome = ({
    imagem,
    nomeMusica,
    artista,
    onPlay,
}) => {
    return (
        <div className="group flex flex-col gap-3 min-w-0">

            <div className="relative aspect-square rounded-xl overflow-hidden bg-roxo/10">

                {imagem ? (
                    <img
                        src={imagem}
                        alt={nomeMusica || "Capa da música"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Sem capa
                    </div>
                )}

                <button
                    type="button"
                    onClick={onPlay}
                    aria-label={`Reproduzir ${nomeMusica}`}
                    className="absolute bottom-3 right-3 bg-roxo text-white p-3 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus:opacity-100 focus:translate-y-0 hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                    <Play size={19} fill="currentColor" />
                </button>

            </div>

            <div className="min-w-0">
                <h3 className="text-white font-semibold text-sm truncate">
                    {nomeMusica}
                </h3>

                <p className="text-gray-400 text-xs mt-1 truncate">
                    {artista}
                </p>
            </div>

        </div>
    );
};

export default CardMusicaHome;
