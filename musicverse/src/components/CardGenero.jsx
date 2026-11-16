
import React from "react";

const CardGenero = ({ nomeGenero, imagem, color }) => {
    return (
        <button
            type="button"
            className={`${color} relative w-full h-36 rounded-xl overflow-hidden p-4 text-white text-left cursor-pointer hover:scale-[1.03] transition-transform duration-300 shadow-lg`}
        >
            <h3 className="text-lg font-bold relative z-10">
                {nomeGenero}
            </h3>

            {imagem && (
                <img
                    src={imagem}
                    alt={`Gênero ${nomeGenero}`}
                    className="absolute w-20 h-20 object-cover rounded-lg -right-4 -bottom-3 rotate-12 shadow-xl"
                />
            )}
        </button>
    );
};

export default CardGenero;
