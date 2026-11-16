
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Disc3,
    Music2,
    UserRound,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import CardAlbum from "@/components/CardAlbum";
import { buscarArtistaPorId } from "@/services/itunes";

export default function PaginaArtista({ params }) {
    const { id } = use(params);

    const [artista, setArtista] = useState(null);
    const [albuns, setAlbuns] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const carregarArtista = async () => {
            try {
                setCarregando(true);
                setErro("");

                const dados = await buscarArtistaPorId(id);

                if (!dados.artista) {
                    setErro("Artista não encontrado.");
                    return;
                }

                setArtista(dados.artista);
                setAlbuns(dados.albuns);
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar o artista.");
            } finally {
                setCarregando(false);
            }
        };

        carregarArtista();
    }, [id]);

    const imagemDestaque = albuns.find(
        (album) => album.artworkUrl100
    )?.artworkUrl100;

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#0c0b0a]">

            <div className="shrink-0 z-50">
                <Navbar />
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={18} />
                    Voltar para a Home
                </Link>

                {carregando && (
                    <p className="text-gray-400">
                        Carregando informações do artista...
                    </p>
                )}

                {erro && (
                    <p className="text-red-400">{erro}</p>
                )}

                {!carregando && !erro && artista && (
                    <div className="flex flex-col gap-10">

                        {/* Informações do artista */}
                        <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-roxo/10 border border-roxo/20 rounded-2xl p-6">

                            <div className="w-44 h-44 shrink-0 rounded-full overflow-hidden bg-roxo/20 flex items-center justify-center">
                                {imagemDestaque ? (
                                    <img
                                        src={imagemDestaque.replace(
                                            "100x100bb",
                                            "600x600bb"
                                        )}
                                        alt="Capa de álbum do artista"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserRound
                                        size={64}
                                        className="text-roxo"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-4 text-center sm:text-left min-w-0">

                                <div>
                                    <p className="text-roxo text-sm font-semibold mb-2">
                                        ARTISTA
                                    </p>

                                    <h1 className="text-white text-3xl sm:text-4xl font-bold">
                                        {artista.artistName}
                                    </h1>
                                </div>

                                <div className="flex flex-col gap-3 text-gray-400 text-sm">

                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <Music2 size={18} className="text-roxo" />
                                        {artista.primaryGenreName || "Gênero não informado"}
                                    </div>

                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <Disc3 size={18} className="text-roxo" />
                                        {albuns.length} álbuns encontrados
                                    </div>

                                </div>

                                <p className="text-gray-500 text-xs">
                                    ID do artista: {artista.artistId}
                                </p>

                            </div>
                        </section>

                        {/* Discografia */}
                        <section>
                            <h2 className="text-white text-2xl font-bold mb-5">
                                Álbuns de {artista.artistName}
                            </h2>

                            {albuns.length === 0 ? (
                                <p className="text-gray-400">
                                    Nenhum álbum encontrado.
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                                    {albuns.map((album) => (
                                        <CardAlbum
                                            key={album.collectionId}
                                            id={album.collectionId}
                                            imagem={album.artworkUrl100}
                                            titulo={album.collectionName}
                                            artista={album.artistName}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>

                    </div>
                )}

            </div>
        </div>
    );
}
