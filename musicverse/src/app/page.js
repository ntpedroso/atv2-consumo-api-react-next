"use client";

import Banner from "@/components/Banner";
import CardAlbum from "@/components/CardAlbum";
import CardMusicaHome from "@/components/CardMusicaHome";
import FiltroGenero from "@/components/FiltroGenero";
import Navbar from "@/components/Navbar";
import listarMusicas from "@/services/itunes";
import { listarAlbuns } from "@/services/itunes";
import { useState, useEffect } from "react";

export default function Home() {
  const [musicas, setMusicas] = useState([]);
  const [albuns, setAlbuns] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");
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

  useEffect(() => {
    const carregarMusicas = async () => {
      try {
        const generos = ["pop", "rock", "sertanejo", "hip hop"];

        const resultados = await Promise.all(
          generos.map((genero) => listarMusicas(genero)),
        );

        const todasMusicas = resultados.flat();

        const musicasUnicas = Array.from(
          new Map(
            todasMusicas.map((musica) => [musica.trackId, musica]),
          ).values(),
        );

        const musicasMisturadas = [...musicasUnicas].sort(
          () => Math.random() - 0.5,
        );

        setMusicas(musicasMisturadas.slice(0, 12));

        // BUSCA DOS ÁLBUNS
        const termosAlbuns = [
          "Taylor Swift",
          "The Weeknd",
          "Coldplay",
          "Adele",
          "Imagine Dragons",
        ];

        const resultadosAlbuns = await Promise.all(
          termosAlbuns.map((termo) => listarAlbuns(termo)),
        );

        const todosAlbuns = resultadosAlbuns.flat();

        const albunsUnicos = Array.from(
          new Map(
            todosAlbuns.map((album) => [album.collectionId, album]),
          ).values(),
        );

        const albunsMisturados = [...albunsUnicos].sort(
          () => Math.random() - 0.5,
        );

        setAlbuns(albunsMisturados.slice(0, 5));
      } catch (error) {
        console.error(error);
        setMensagemErro("Não foi possível carregar os dados.");
      } finally {
        setCarregando(false);
      }
    };

    carregarMusicas();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0c0b0a]">
      <div className="sticky top-0 z-50 shrink-0">
        <Navbar />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
        <section className="grid grid-cols-4 gap-6">

          {/* Atalhos de gêneros */}
          <div className="grid grid-flow-col auto-cols-max col-span-3 overflow-x-auto gap-4 scrollbar-none [mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">
            {generos.map((genero) => (
              <FiltroGenero key={genero} genero={genero}></FiltroGenero>
            ))}
          </div>

          {/* Banner dos artistas */}
          <div className="col-span-3">
            <Banner />
          </div>

          <div className="col-span-3">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Músicas mais ouvidas
            </h2>

            {carregando && <p>Carregando músicas...</p>}

            {mensagemErro && <p className="text-red-400">{mensagemErro}</p>}

            {!carregando && !mensagemErro && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {musicas.slice(0, 5).map((musica) => (
                  <CardMusicaHome
                    key={musica.trackId}
                    imagem={musica.artworkUrl100}
                    nomeMusica={musica.trackName}
                    artista={musica.artistName}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="col-span-3">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Melhores álbuns
            </h2>

            {carregando && <p>Carregando álbuns...</p>}

            {mensagemErro && <p className="text-red-400">{mensagemErro}</p>}

            {!carregando && !mensagemErro && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {albuns.slice(0, 5).map((album) => (
                  <CardAlbum
                    key={album.collectionName}
                    imagem={album.artworkUrl100}
                    titulo={album.collectionName}
                    artista={album.artistName}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="col-span-3">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Melhores álbuns
            </h2>

            {carregando && <p>Carregando álbuns...</p>}

            {mensagemErro && <p className="text-red-400">{mensagemErro}</p>}

            {!carregando && !mensagemErro && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {albuns.slice(0, 5).map((album) => (
                  <CardAlbum
                    key={album.collectionName}
                    imagem={album.artworkUrl100}
                    titulo={album.collectionName}
                    artista={album.artistName}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quarta coluna reservada */}
          <div className="col-span-1">{/* Futuro player */}</div>
        </section>
      </div>
    </div>
  );
}
