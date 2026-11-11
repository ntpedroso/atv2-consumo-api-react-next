import React from "react";

const CardMusicaHome = ({ imagem, nomeMusica, artista }) => {
    return (
        <div>
            <div>
                <img src={imagem}></img>
            </div>
            <div>
                <p>{nomeMusica}</p>
                <p>{artista}</p>
            </div>
        </div>
    )
}

export default CardMusicaHome;