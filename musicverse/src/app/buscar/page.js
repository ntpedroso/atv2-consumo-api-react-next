
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, Music2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import CardMusicaHome from "@/components/CardMusicaHome";
import CardAlbum from "@/components/CardAlbum";
import CardArtista from "@/components/CardArtista";
import Player from "@/components/Player";

import { buscarTudo } from "@/services/itunes";

function ConteudoBusca() {
    const searchParams = useSearchParams();
    const termo = searchParams.get("q")?.trim() || "";

    const [musicas, setMusicas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [musicaSelecionada, setMusicaSelecionada] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        let ativo = true;

        const carregarResultados = async () => {
            setMusicas([]);
            setAlbuns([]);
            setArtistas([]);
            setMusicaSelecionada(null);
            setErro("");

            if (!termo) {
                setCarregando(false);
                return;
            }

            setCarregando(true);

            try {
                const dados = await buscarTudo(termo);

                if (!ativo) return;

                setMusicas(dados.musicas);
                setAlbuns(dados.albuns);
                setArtistas(dados.artistas);
            } catch (error) {
                if (!ativo) return;

                console.error(error);
                setErro("Não foi possível realizar a pesquisa.");
            } finally {
                if (ativo) {
                    setCarregando(false);
                }
            }
        };

        carregarResultados();

        return () => {
            ativo = false;
        };
    }, [termo]);

    const selecionarMusica = (musica) => {
        if (!musica.previewUrl) {
            alert("Prévia indisponível para esta música.");
            return;
        }

        setMusicaSelecionada(musica);
    };

    const totalResultados =
        musicas.length + albuns.length + artistas.length;

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
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">
                        Resultados da pesquisa
                    </h1>

                    {termo && (
                        <p className="text-gray-400 mt-2">
                            Resultados para{" "}
                            <span className="text-roxo-claro font-semibold">
                                "{termo}"
                            </span>
                        </p>
                    )}
                </div>

                {!termo && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                        <Search size={48} className="text-roxo" />

                        <h2 className="text-white text-xl font-semibold">
                            O que você deseja encontrar?
                        </h2>

                        <p className="text-gray-400">
                            Digite uma música, artista ou álbum na barra de pesquisa.
                        </p>
                    </div>
                )}

                {carregando && (
                    <p className="text-gray-400">
                        Buscando músicas, álbuns e artistas...
                    </p>
                )}

                {erro && (
                    <p className="text-red-400">
                        {erro}
                    </p>
                )}

                {!carregando && !erro && termo && totalResultados === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                        <Music2 size={44} className="text-roxo" />

                        <h2 className="text-white text-lg font-semibold">
                            Nenhum resultado encontrado
                        </h2>

                        <p className="text-gray-400 text-sm">
                            Tente pesquisar outro nome.
                        </p>
                    </div>
                )}

                {!carregando && !erro && totalResultados > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        <div className="min-w-0 lg:col-span-3 flex flex-col gap-10">

                            {/* Músicas */}
                            {musicas.length > 0 && (
                                <section>
                                    <h2 className="text-white text-2xl font-bold mb-5">
                                        Músicas
                                    </h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                        {musicas.map((musica) => (
                                            <CardMusicaHome
                                                key={musica.trackId}
                                                imagem={musica.artworkUrl100}
                                                nomeMusica={musica.trackName}
                                                artista={musica.artistName}
                                                onPlay={() => selecionarMusica(musica)}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Álbuns */}
                            {albuns.length > 0 && (
                                <section>
                                    <h2 className="text-white text-2xl font-bold mb-5">
                                        Álbuns
                                    </h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
                                </section>
                            )}

                            {/* Artistas */}
                            {artistas.length > 0 && (
                                <section>
                                    <h2 className="text-white text-2xl font-bold mb-5">
                                        Artistas
                                    </h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                                        {artistas.map((artista) => (
                                            <CardArtista
                                                key={artista.artistId}
                                                id={artista.artistId}
                                                nome={artista.artistName}
                                                genero={artista.primaryGenreName}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                        </div>

                        {/* Player lateral */}
                        <div className="min-w-0 lg:col-span-1">
                            <div className="lg:sticky lg:top-0">

                                {musicaSelecionada ? (
                                    <Player
                                        key={musicaSelecionada.trackId}
                                        capaAlbum={musicaSelecionada.artworkUrl100}
                                        nomeMusica={musicaSelecionada.trackName}
                                        artista={musicaSelecionada.artistName}
                                        previewUrl={musicaSelecionada.previewUrl}
                                        onClose={() => setMusicaSelecionada(null)}
                                    />
                                ) : (
                                    <div className="bg-roxo/10 border border-roxo/20 rounded-2xl p-6 text-center flex flex-col items-center gap-3">
                                        <Music2 size={34} className="text-roxo" />

                                        <h3 className="text-white font-semibold">
                                            Explore os resultados
                                        </h3>

                                        <p className="text-gray-400 text-sm">
                                            Escolha uma música para ouvir sua prévia.
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default function PaginaBusca() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#0c0b0a] flex items-center justify-center">
                    <p className="text-gray-400">
                        Carregando pesquisa...
                    </p>
                </div>
            }
        >
            <ConteudoBusca />
        </Suspense>
    );
}
