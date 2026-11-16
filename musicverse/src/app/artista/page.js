
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

import Navbar from "@/components/Navbar";
import CardArtista from "@/components/CardArtista";
import { listarArtistas, listarAlbuns } from "@/services/itunes";

export default function PaginaArtistas() {
    const [artistas, setArtistas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const carregarArtistas = async () => {
            try {
                setCarregando(true);

                const nomesArtistas = [
                    "Taylor Swift",
                    "Bruno Mars",
                    "The Weeknd",
                    "Adele",
                    "Coldplay",
                    "Billie Eilish",
                    "Dua Lipa",
                    "Ed Sheeran",
                    "Ariana Grande",
                    "Imagine Dragons",
                    "Lady Gaga",
                    "Rihanna",
                    "Beyoncé",
                    "Justin Bieber",
                    "Sabrina Carpenter",
                ];

                const resultados = await Promise.all(
                    nomesArtistas.map(async (nome) => {
                        const [artistasEncontrados, albunsEncontrados] =
                            await Promise.all([
                                listarArtistas(nome),
                                listarAlbuns(nome),
                            ]);

                        const artista = artistasEncontrados.find(
                            (item) =>
                                item.artistName?.toLowerCase() ===
                                nome.toLowerCase()
                        );

                        if (!artista) return null;

                        const album = albunsEncontrados.find(
                            (item) => item.artistId === artista.artistId
                        );

                        return {
                            ...artista,
                            imagem: album?.artworkUrl100 || null,
                        };
                    })
                );

                const artistasValidos = resultados.filter(Boolean);

                setArtistas(artistasValidos);
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar os artistas.");
            } finally {
                setCarregando(false);
            }
        };

        carregarArtistas();
    }, []);

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

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Users size={28} className="text-roxo" />

                        <h1 className="text-white text-3xl font-bold">
                            Artistas
                        </h1>
                    </div>

                    <p className="text-gray-400">
                        Explore artistas e descubra seus álbuns.
                    </p>
                </div>

                {carregando && (
                    <p className="text-gray-400">
                        Carregando artistas...
                    </p>
                )}

                {erro && (
                    <p className="text-red-400">
                        {erro}
                    </p>
                )}

                {!carregando && !erro && artistas.length === 0 && (
                    <p className="text-gray-400">
                        Nenhum artista encontrado.
                    </p>
                )}

                {!carregando && !erro && artistas.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

                        {artistas.map((artista) => (
                            <CardArtista
                                key={artista.artistId}
                                id={artista.artistId}
                                nome={artista.artistName}
                                genero={artista.primaryGenreName}
                                imagem={artista.imagem}
                            />
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}
