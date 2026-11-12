import React from "react";

const CardAlbum = ({ imagem, titulo, artista }) => {
  return (
    <div className="rounded-sm text-white flex flex-col items-center hover:scale-105 transition-transform duration-300 gap-2">
      <div>
        <img src={imagem} className="w-50 rounded-sm"></img>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-md text-center font-semibold">{titulo}</p>
        <p className="text-sm text-center">{artista}</p>
      </div>
    </div>
  );
};

export default CardAlbum;
