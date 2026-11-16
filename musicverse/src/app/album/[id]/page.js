
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Disc3,
    Music2,
    Play,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { buscarAlbumPorId } from "@/services/itunes";

export default function PaginaAlbum({ params }) {
    const { id } = use(params);

    const [album, setAlbum] = useState(null);
    const [musicas, setMusicas] = useState([]);
    const [musicaSelecionada, setMusicaSelecionada] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const carregarAlbum = async () => {
            try {
                setCarregando(true);
                setErro("");

                const dados = await buscarAlbumPorId(id);

                if (!dados.album) {
                    setErro("Álbum não encontrado.");
                    return;
                }

                setAlbum(dados.album);
                setMusicas(dados.musicas);
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar o álbum.");
            } finally {
                setCarregando(false);
            }
        };

        carregarAlbum();
    }, [id]);

    const formatarDuracao = (milissegundos) => {
        if (!milissegundos) return "--:--";

        const segundosTotais = Math.floor(milissegundos / 1000);
        const minutos = Math.floor(segundosTotais / 60);
        const segundos = segundosTotais % 60;

        return `${minutos}:${String(segundos).padStart(2, "0")}`;
    };

    const formatarData = (data) => {
        if (!data) return "Não informada";

        return new Date(data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        });
    };

    const selecionarMusica = (musica) => {
        if (!musica.previewUrl) {
            alert("Prévia indisponível para esta música.");
            return;
        }

        setMusicaSelecionada(musica);
    };

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
                        Carregando informações do álbum...
                    </p>
                )}

                {erro && (
                    <p className="text-red-400">
                        {erro}
                    </p>
                )}

                {!carregando && !erro && album && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        <div className="lg:col-span-3 min-w-0 flex flex-col gap-8">

                            {/* Informações do álbum */}
                            <section className="flex flex-col sm:flex-row gap-6 items-start">

                                <div className="w-full sm:w-56 shrink-0 aspect-square rounded-2xl overflow-hidden bg-roxo/10">
                                    {album.artworkUrl100 ? (
                                        <img
                                            src={album.artworkUrl100.replace(
                                                "100x100bb",
                                                "600x600bb"
                                            )}
                                            alt={`Capa do álbum ${album.collectionName}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Sem capa
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-4 min-w-0">

                                    <div>
                                        <p className="text-roxo text-sm font-semibold mb-2">
                                            ÁLBUM
                                        </p>

                                        <h1 className="text-white text-3xl sm:text-4xl font-bold">
                                            {album.collectionName}
                                        </h1>

                                        <p className="text-gray-300 text-lg mt-2">
                                            {album.artistName}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-3 text-sm text-gray-400">

                                        <div className="flex items-center gap-2">
                                            <Disc3 size={17} className="text-roxo" />
                                            {album.primaryGenreName || "Gênero não informado"}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={17} className="text-roxo" />
                                            {formatarData(album.releaseDate)}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Music2 size={17} className="text-roxo" />
                                            {album.trackCount || musicas.length} faixas
                                        </div>

                                    </div>

                                    <p className="text-xs text-gray-500">
                                        ID do álbum: {album.collectionId}
                                    </p>

                                </div>
                            </section>

                            {/* Lista de músicas */}
                            <section>
                                <h2 className="text-white text-2xl font-bold mb-5">
                                    Músicas do álbum
                                </h2>

                                {musicas.length === 0 ? (
                                    <p className="text-gray-400">
                                        Nenhuma faixa disponível para este álbum.
                                    </p>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {musicas.map((musica, index) => (
                                            <div
                                                key={musica.trackId}
                                                className="flex items-center gap-4 bg-white/5 hover:bg-roxo/10 rounded-xl px-4 py-3 transition-colors"
                                            >
                                                <span className="text-gray-500 text-sm w-6">
                                                    {musica.trackNumber || index + 1}
                                                </span>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-white font-semibold text-sm truncate">
                                                        {musica.trackName}
                                                    </h3>

                                                    <p className="text-gray-400 text-xs mt-1 truncate">
                                                        {musica.artistName}
                                                    </p>
                                                </div>

                                                <span className="text-gray-400 text-xs hidden sm:block">
                                                    {formatarDuracao(musica.trackTimeMillis)}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => selecionarMusica(musica)}
                                                    disabled={!musica.previewUrl}
                                                    aria-label={`Reproduzir ${musica.trackName}`}
                                                    className="bg-roxo rounded-full p-2.5 text-white hover:scale-110 transition-transform cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <Play size={17} fill="currentColor" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                        </div>

                        {/* Player */}
                        <div className="lg:col-span-1 min-w-0">
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
                                    <div className="bg-roxo/10 border border-roxo/20 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                                        <Disc3 size={36} className="text-roxo" />

                                        <h3 className="text-white font-semibold">
                                            Escolha uma música
                                        </h3>

                                        <p className="text-gray-400 text-sm">
                                            Selecione uma faixa do álbum para ouvir.
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
