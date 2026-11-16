
"use client";

import Banner from "@/components/Banner";
import CardAlbum from "@/components/CardAlbum";
import CardArtista from "@/components/CardArtista";
import CardGenero from "@/components/CardGenero";
import CardMusicaHome from "@/components/CardMusicaHome";
import FiltroGenero from "@/components/FiltroGenero";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";

import listarMusicas, {
    listarAlbuns,
    listarArtistas,
} from "@/services/itunes";

import { useState, useEffect } from "react";

import Pop from "@/assets/pop.svg";
import Rock from "@/assets/rock.svg";
import Sertanejo from "@/assets/sertanejo.svg";
import Hiphop from "@/assets/hiphop.svg";

export default function Home() {
    const [musicas, setMusicas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagemErro, setMensagemErro] = useState("");
    const [musicaSelecionada, setMusicaSelecionada] = useState(null);

    const generos = [
        "Pop",
        "Rock",
        "Sertanejo",
        "Top Hits",
        "Metal",
        "Samba",
        "Funk",
        "Hip Hop",
    ];

    const generosLaterais = [
        {
            nome: "Pop",
            imagem: Pop.src,
            cor: "bg-pink-700",
        },
        {
            nome: "Rock",
            imagem: Rock.src,
            cor: "bg-blue-800",
        },
        {
            nome: "Sertanejo",
            imagem: Sertanejo.src,
            cor: "bg-amber-700",
        },
        {
            nome: "Hip Hop",
            imagem: Hiphop.src,
            cor: "bg-purple-800",
        },
    ];

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const generosBusca = [
                    "pop",
                    "rock",
                    "sertanejo",
                    "hip hop",
                ];

                const termosAlbuns = [
                    "Taylor Swift",
                    "The Weeknd",
                    "Coldplay",
                    "Adele",
                    "Imagine Dragons",
                ];

                const termosArtistas = [
                    "Taylor Swift",
                    "The Weeknd",
                    "Bruno Mars",
                    "Adele",
                    "Coldplay",
                ];

                const [
                    resultadosMusicas,
                    resultadosAlbuns,
                    resultadosArtistas,
                ] = await Promise.all([
                    Promise.all(
                        generosBusca.map((genero) => listarMusicas(genero))
                    ),
                    Promise.all(
                        termosAlbuns.map((termo) => listarAlbuns(termo))
                    ),
                    Promise.all(
                        termosArtistas.map((termo) => listarArtistas(termo))
                    ),
                ]);

                {/* Músicas */}
                const todasMusicas = resultadosMusicas.flat();

                const musicasUnicas = Array.from(
                    new Map(
                        todasMusicas.map((musica) => [
                            musica.trackId,
                            musica,
                        ])
                    ).values()
                );

                const musicasMisturadas = [...musicasUnicas].sort(
                    () => Math.random() - 0.5
                );

                setMusicas(musicasMisturadas.slice(0, 12));

                {/* Álbuns */}
                const todosAlbuns = resultadosAlbuns.flat();

                const albunsUnicos = Array.from(
                    new Map(
                        todosAlbuns.map((album) => [
                            album.collectionId,
                            album,
                        ])
                    ).values()
                );

                const albunsMisturados = [...albunsUnicos].sort(
                    () => Math.random() - 0.5
                );

                setAlbuns(albunsMisturados.slice(0, 5));

                {/* Artistas */}
                const artistasEncontrados = resultadosArtistas.map(
                    (resultado, index) => {
                        const nomeBuscado = termosArtistas[index];

                        return resultado.find(
                            (artista) =>
                                artista.artistName?.toLowerCase() ===
                                nomeBuscado.toLowerCase()
                        );
                    }
                ).filter(Boolean);

                const artistasComImagem = artistasEncontrados.map(
                    (artista) => {
                        const albumDoArtista = todosAlbuns.find(
                            (album) =>
                                album.artistId === artista.artistId
                        );

                        return {
                            ...artista,
                            imagem: albumDoArtista?.artworkUrl100 || null,
                        };
                    }
                );

                setArtistas(artistasComImagem);

            } catch (error) {
                console.error(error);
                setMensagemErro("Não foi possível carregar os dados.");
            } finally {
                setCarregando(false);
            }
        };

        carregarDados();
    }, []);

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

                <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Conteúdo esquerdo */}
                    <div className="min-w-0 lg:col-span-3 flex flex-col gap-6">

                        {/* Filtros */}
                        <div className="grid grid-flow-col auto-cols-max min-w-0 overflow-x-auto gap-4 scrollbar-none [mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">
                            {generos.map((genero) => (
                                <FiltroGenero
                                    key={genero}
                                    genero={genero}
                                />
                            ))}
                        </div>

                        {/* Banner */}
                        <div className="min-w-0">
                            <Banner />
                        </div>

                        {/* Músicas */}
                        <div className="min-w-0">
                            <h2 className="text-2xl font-bold mb-4 text-white">
                                Músicas mais ouvidas
                            </h2>

                            {carregando && (
                                <p className="text-gray-400">
                                    Carregando músicas...
                                </p>
                            )}

                            {mensagemErro && (
                                <p className="text-red-400">
                                    {mensagemErro}
                                </p>
                            )}

                            {!carregando && !mensagemErro && (
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {musicas.slice(0, 5).map((musica) => (
                                        <CardMusicaHome
                                            key={musica.trackId}
                                            imagem={musica.artworkUrl100}
                                            nomeMusica={musica.trackName}
                                            artista={musica.artistName}
                                            onPlay={() => selecionarMusica(musica)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Álbuns */}
                        <div className="min-w-0">
                            <h2 className="text-2xl font-bold mb-4 text-white">
                                Melhores álbuns
                            </h2>

                            {carregando && (
                                <p className="text-gray-400">
                                    Carregando álbuns...
                                </p>
                            )}

                            {mensagemErro && (
                                <p className="text-red-400">
                                    {mensagemErro}
                                </p>
                            )}

                            {!carregando && !mensagemErro && (
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {albuns.slice(0, 5).map((album) => (
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
                        </div>

                        {/* Artistas */}
                        <div className="min-w-0">
                            <h2 className="text-2xl font-bold mb-4 text-white">
                                Artistas em destaque
                            </h2>

                            {carregando && (
                                <p className="text-gray-400">
                                    Carregando artistas...
                                </p>
                            )}

                            {mensagemErro && (
                                <p className="text-red-400">
                                    {mensagemErro}
                                </p>
                            )}

                            {!carregando && !mensagemErro && (
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
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

                    {/* Coluna direita */}
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
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-bold text-white">
                                        Explore gêneros
                                    </h2>

                                    <div className="grid grid-cols-2 gap-3">
                                        {generosLaterais.map((genero) => (
                                            <CardGenero
                                                key={genero.nome}
                                                nomeGenero={genero.nome}
                                                imagem={genero.imagem}
                                                color={genero.cor}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}
