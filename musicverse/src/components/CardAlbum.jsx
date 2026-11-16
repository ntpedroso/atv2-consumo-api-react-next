
import Link from "next/link";

const CardAlbum = ({ imagem, titulo, artista, id }) => {
    return (
        <Link
            href={`/album/${id}`}
            className="group flex flex-col gap-3 min-w-0 cursor-pointer"
        >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-roxo/10">

                {imagem ? (
                    <img
                        src={imagem}
                        alt={`Capa do álbum ${titulo}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Sem capa
                    </div>
                )}

            </div>

            <div className="min-w-0">
                <h3 className="text-white font-semibold text-sm truncate group-hover:text-roxo transition-colors">
                    {titulo}
                </h3>

                <p className="text-gray-400 text-xs mt-1 truncate">
                    {artista}
                </p>
            </div>
        </Link>
    );
};

export default CardAlbum;
