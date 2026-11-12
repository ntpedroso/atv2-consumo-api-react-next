import React from "react";

const FiltroGenero = ({genero}) => {

    return (
        <>
            <button className="px-6 py-2 border-1 border-roxo text-white text-sm rounded-full">
                {genero}
            </button>
        </>
    )
}

export default FiltroGenero;