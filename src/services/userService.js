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

export {
    login,
    createUser
}