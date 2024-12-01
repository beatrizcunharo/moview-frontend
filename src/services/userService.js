import api from "./api"

const login = async (email, senha) => {
    try {
        const response = await api.post('usuario/login', { email, senha })

        return response.data
    } catch (error) {
        throw error
    }
}

const createUser = async (data) => {
    try {
        const response = await api.post('usuario/criar', data)
        return response.data
    } catch (error) {
        throw error.response.data.details
    }
}

const updateUser = async ({ id, data }) => {
    try {
        const response = await api.put(`usuario/atualizar/${id}`, data)
        return response.data
    } catch (error) {
        throw error.response.data.details
    }
}

const getUserById = async (id) => {
    try {
        const response = await api.get(`usuario/buscar/${id}`)
        return response.data
    } catch (error) {
        throw error.response.data.details
    }
}

export {
    login,
    createUser,
    updateUser,
    getUserById
}