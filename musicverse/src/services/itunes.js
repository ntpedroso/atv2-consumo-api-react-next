import axios from "axios";

const api = axios.create({
    baseURL: "https://itunes.apple.com",
});

const ListarMusicas = async (termo) => {
    const resposta = await api.get("/search", {
        params: {
            term: termo,
            media: "music",
            entity: "song",
            country: "BR",
            limit: 12,
        }
    })
    
    return resposta.data.results;
}

export const listarAlbuns = async (termo) => {
    const resposta = await api.get("/search", {
        params: {
            term: termo,
            media: "music",
            entity: "album",
            country: "BR",
            limit: 15
        }
    });

    return resposta.data.results;
};

export default ListarMusicas;