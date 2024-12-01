import api from "./api"

const login = async (email, senha) => {
    try {
        const response = await api.post('usuario/login', { email, senha })

        return response.data
    } catch (error) {
        throw error
    }
}

export {
    login
}