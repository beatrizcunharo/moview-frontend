import api from "./api"

const getRecentMovies = async () => {
    try {
        const response = await api.get('filmes/filmes-recentes')
        return response.data
    } catch (error) {
        console.error('Erro ao buscar filmes: ', error.message)
        throw error
    }
}

const getMoviesByTitle = async ({ title }) => {
    try {
        const response = await api.get('filmes/buscar-filmes', {
            params: { titulo: title }
        })
        return response.data
    } catch (error) {
        console.error(`Erro ao buscar filmes pelo título ${title}: `, error.message)
        throw error
    }
}

export {
    getRecentMovies,
    getMoviesByTitle
}