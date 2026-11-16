
import axios from "axios";

const api = axios.create({
    baseURL: "https://itunes.apple.com",
});

const listarMusicas = async (termo) => {
    const resposta = await api.get("/search", {
        params: {
            term: termo,
            media: "music",
            entity: "song",
            country: "BR",
            limit: 15,
        },
    });

    return resposta.data.results || [];
};

export const listarAlbuns = async (termo) => {
    const resposta = await api.get("/search", {
        params: {
            term: termo,
            media: "music",
            entity: "album",
            country: "BR",
            limit: 15,
        },
    });

    return resposta.data.results || [];
};

export const buscarAlbumPorId = async (id) => {
    const resposta = await api.get("/lookup", {
        params: {
            id,
            entity: "song",
            country: "BR",
        },
    });

    const resultados = resposta.data.results || [];

    return {
        album: resultados.find(
            (item) => item.wrapperType === "collection"
        ),
        musicas: resultados.filter(
            (item) => item.wrapperType === "track"
        ),
    };
};

export const listarArtistas = async (termo) => {
    const resposta = await api.get("/search", {
        params: {
            term: termo,
            media: "music",
            entity: "musicArtist",
            country: "BR",
            limit: 10,
        },
    });

    return resposta.data.results || [];
};

export const buscarArtistaPorId = async (id) => {
    const [respostaArtista, respostaAlbuns] = await Promise.all([
        api.get("/lookup", {
            params: {
                id,
                country: "BR",
            },
        }),
        api.get("/lookup", {
            params: {
                id,
                entity: "album",
                country: "BR",
                limit: 50,
            },
        }),
    ]);

    const artista = (respostaArtista.data.results || []).find(
        (item) => item.wrapperType === "artist"
    );

    const albuns = (respostaAlbuns.data.results || []).filter(
        (item) => item.wrapperType === "collection"
    );

    return {
        artista,
        albuns,
    };
};

export const buscarTudo = async (termo) => {
    const resultados = await Promise.allSettled([
        listarMusicas(termo),
        listarAlbuns(termo),
        listarArtistas(termo),
    ]);

    if (resultados.every((resultado) => resultado.status === "rejected")) {
        throw new Error("Não foi possível realizar a pesquisa.");
    }

    const obterResultados = (indice) => {
        const resultado = resultados[indice];

        return resultado.status === "fulfilled"
            ? resultado.value
            : [];
    };

    const musicas = obterResultados(0);
    const albuns = obterResultados(1);
    const artistas = obterResultados(2);

    return {
        musicas: Array.from(
            new Map(
                musicas.map((musica) => [musica.trackId, musica])
            ).values()
        ),
        albuns: Array.from(
            new Map(
                albuns.map((album) => [album.collectionId, album])
            ).values()
        ),
        artistas: Array.from(
            new Map(
                artistas.map((artista) => [artista.artistId, artista])
            ).values()
        ),
    };
};

export default listarMusicas;
