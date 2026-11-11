import Banner from "@/components/Banner";
import CardMusicaHome from "@/components/CardMusicaHome";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {

  const [musicas, setMusicas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const carregarMusicas = async () => {
      try {
        const resultado = await buscarMusicas()
      } catch (error) {

      } finally {

      }
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <section className="grid grid-cols-4 gap-4 ">
          <div className="grid col-span-3">
            <Banner></Banner>
          </div>

          {/* Seção para as músicas mais ouvidas */}
          <div className="grid col-span-3">
            <p>Músicas ouvidas </p>

            <div>
              <CardMusicaHome></CardMusicaHome>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
