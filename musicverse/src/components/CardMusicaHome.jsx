import React from "react";

const CardMusicaHome = ({ imagem, nomeMusica, artista }) => {
    return (
        <div className="flex flex-col gap-2 items-center bg-roxo/25 text-white rounded-sm p-2 hover:bg-amarelo hover:text-gray-800 hover:scale-105 transition-transform duration-300">
            <div>
                <img src={imagem} className="rounded-sm"></img>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-md text-center font-semibold">{nomeMusica}</p>
                <p className="text-sm text-center">{artista}</p>
            </div>
        </div>
    )
}

export default CardMusicaHome;