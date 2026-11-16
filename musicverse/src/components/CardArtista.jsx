
import Link from "next/link";
import { UserRound } from "lucide-react";

const CardArtista = ({ id, nome, imagem, genero }) => {
    return (
        <Link
            href={`/artista/${id}`}
            className="group flex flex-col items-center gap-3 min-w-0"
        >
            <div className="w-full aspect-square rounded-full overflow-hidden bg-roxo/10 border-2 border-transparent group-hover:border-roxo transition-all duration-300">

                {imagem ? (
                    <img
                        src={imagem}
                        alt={`Imagem ilustrativa de ${nome}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <UserRound
                            size={38}
                            className="text-roxo"
                        />
                    </div>
                )}

            </div>

            <div className="text-center min-w-0 w-full">
                <h3 className="text-white font-semibold text-sm truncate group-hover:text-roxo transition-colors">
                    {nome}
                </h3>

                <p className="text-gray-400 text-xs mt-1 truncate">
                    {genero || "Artista"}
                </p>
            </div>
        </Link>
    );
};

export default CardArtista;
