
"use client";

import { useEffect, useRef, useState } from "react";
import {
    Shuffle,
    X,
    Heart,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Repeat,
} from "lucide-react";

const Player = ({
    capaAlbum,
    artista,
    nomeMusica,
    previewUrl,
    onClose,
}) => {
    const audioRef = useRef(null);

    const [tocando, setTocando] = useState(false);
    const [tempoAtual, setTempoAtual] = useState(0);
    const [duracao, setDuracao] = useState(0);
    const [favoritado, setFavoritado] = useState(false);
    const [repetir, setRepetir] = useState(false);
    const [erroAudio, setErroAudio] = useState("");

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio || !previewUrl) return;

        audio.currentTime = 0;

        const iniciar = async () => {
            try {
                await audio.play();
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Erro ao reproduzir:", error);
                    setErroAudio("Clique no Play para iniciar a prévia.");
                }
            }
        };

        iniciar();

        return () => {
            audio.pause();
        };
    }, [previewUrl]);

    const alternarReproducao = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            try {
                await audio.play();
                setErroAudio("");
            } catch (error) {
                console.error(error);
                setErroAudio("Não foi possível reproduzir esta prévia.");
            }
        } else {
            audio.pause();
        }
    };

    const atualizarTempo = () => {
        setTempoAtual(audioRef.current?.currentTime || 0);
    };

    const atualizarDuracao = () => {
        const tempo = audioRef.current?.duration;

        setDuracao(
            Number.isFinite(tempo) ? tempo : 0
        );
    };

    const alterarProgresso = (event) => {
        const audio = audioRef.current;

        if (!audio || !duracao) return;

        const novoTempo = Number(event.target.value);

        audio.currentTime = novoTempo;
        setTempoAtual(novoTempo);
    };

    const formatarTempo = (tempo) => {
        if (!Number.isFinite(tempo)) return "00:00";

        const minutos = Math.floor(tempo / 60);
        const segundos = Math.floor(tempo % 60);

        return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    };

    const fecharPlayer = () => {
        audioRef.current?.pause();
        onClose?.();
    };

    return (
        <div className="flex flex-col gap-5 bg-roxo/10 border border-roxo/20 rounded-2xl text-white p-5 shadow-lg shadow-roxo/10 w-full">

            <audio
                ref={audioRef}
                src={previewUrl}
                preload="auto"
                loop={repetir}
                onTimeUpdate={atualizarTempo}
                onLoadedMetadata={atualizarDuracao}
                onDurationChange={atualizarDuracao}
                onPlay={() => setTocando(true)}
                onPause={() => setTocando(false)}
                onEnded={() => setTocando(false)}
                onError={() => {
                    setTocando(false);
                    setErroAudio("Não foi possível carregar a prévia.");
                }}
            />

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">

                    <h2 className="text-sm font-semibold">
                        Player
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={fecharPlayer}
                    aria-label="Fechar Player"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="w-full aspect-square bg-roxo/10 rounded-xl overflow-hidden">
                {capaAlbum ? (
                    <img
                        src={capaAlbum}
                        alt={nomeMusica || "Capa do álbum"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Sem capa
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center gap-3">
                <div className="min-w-0">
                    <h3 className="font-bold text-lg truncate">
                        {nomeMusica}
                    </h3>

                    <p className="text-sm text-gray-400 truncate mt-1">
                        {artista}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setFavoritado(!favoritado)}
                    aria-label="Favoritar música"
                    className="cursor-pointer"
                >
                    <Heart
                        size={21}
                        className={
                            favoritado
                                ? "text-roxo"
                                : "text-gray-400 hover:text-roxo"
                        }
                        fill={favoritado ? "currentColor" : "none"}
                    />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <input
                    type="range"
                    min="0"
                    max={duracao || 0}
                    step="0.1"
                    value={Math.min(tempoAtual, duracao || 0)}
                    onChange={alterarProgresso}
                    disabled={!duracao}
                    aria-label="Progresso da música"
                    className="w-full h-1.5 accent-roxo cursor-pointer disabled:cursor-not-allowed"
                />

                <div className="flex justify-between text-xs text-gray-400">
                    <span>{formatarTempo(tempoAtual)}</span>
                    <span>{formatarTempo(duracao)}</span>
                </div>
            </div>

            {erroAudio && (
                <p className="text-xs text-amarelo">
                    {erroAudio}
                </p>
            )}

            <div className="flex justify-between items-center">

                <button
                    type="button"
                    disabled
                    title="Aleatório (em breve)"
                    className="text-gray-500 cursor-not-allowed"
                >
                    <Shuffle size={18} />
                </button>

                <div className="flex justify-center items-center gap-4">

                    <button
                        type="button"
                        disabled
                        title="Música anterior (em breve)"
                        className="text-gray-500 cursor-not-allowed"
                    >
                        <SkipBack size={22} fill="currentColor" />
                    </button>

                    <button
                        type="button"
                        onClick={alternarReproducao}
                        aria-label={tocando ? "Pausar" : "Reproduzir"}
                        className="bg-roxo rounded-full p-4 hover:scale-110 hover:bg-roxo/80 transition-all duration-300 cursor-pointer shadow-lg shadow-roxo/30"
                    >
                        {tocando ? (
                            <Pause size={23} fill="currentColor" />
                        ) : (
                            <Play size={23} fill="currentColor" />
                        )}
                    </button>

                    <button
                        type="button"
                        disabled
                        title="Próxima música (em breve)"
                        className="text-gray-500 cursor-not-allowed"
                    >
                        <SkipForward size={22} fill="currentColor" />
                    </button>

                </div>

                <button
                    type="button"
                    onClick={() => setRepetir(!repetir)}
                    aria-label="Repetir prévia"
                    aria-pressed={repetir}
                    className={`cursor-pointer transition-colors ${
                        repetir
                            ? "text-roxo"
                            : "text-gray-400 hover:text-roxo"
                    }`}
                >
                    <Repeat size={18} />
                </button>

            </div>
        </div>
    );
};

export default Player;
