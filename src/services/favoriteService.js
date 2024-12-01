import api from "./api"

const getFavorite = async (userId) => {
    try {
        const response = await api.get(`favoritos/listar/${userId}`)

        return response.data
    } catch (error) {
        if (error.status === 404) {
            return []
        }
        throw error
    }
}

const addFavorite = async ({ userId, email, movieId, movieTitle }) => {
    try {

        const response = await api.post('favoritos/adicionar', {
            userId,
            email,
            movieId,
            movieTitle
        })

        return response.data
    } catch (error) {
        throw error
    }
}

const deleteFavorite = async ({ userId, movieId }) => {
    if (!userId || !movieId) {
        throw new Error("userId ou movieId não fornecidos.")
    }

    try {
        const response = await api.delete('favoritos/remover', {
            data: {
                userId,
                movieId
            }
        })
        return response
    } catch (error) {
        throw error
    }
}

export {
    getFavorite,
    addFavorite,
    deleteFavorite
}