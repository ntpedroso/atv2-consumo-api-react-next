import React from "react";

const CardGenero = ({nomeGenero, imagem, color}) => {
    return (
        <button className={`${color} p-4 text-white`}>
            <p>{nomeGenero}</p>
            <img src={imagem}></img>
        </button>
    )
}

export default CardGenero;