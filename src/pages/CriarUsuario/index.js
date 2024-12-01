import { useState } from 'react'
import './criarUsuario.css'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../services/userService'

const CriarUsuario = () => {
    const navigate = useNavigate()
    const diaHoje = new Date().toISOString().split('T')[0]
    const [formData, setFormData] = useState({
        nome: '',
        cidade: '',
        estado: '',
        descricao: '',
        user: '',
        senha: '',
        dataCriacao: diaHoje,
        dataNascimento: '',
        email: ''
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'user') {
            const regex = /^[a-zA-Z0-9_]*$/
            if (!regex.test(value)) {
                alert('O nome de usuário só pode conter letras, números e _.')
                return
            }
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            await createUser(formData)
            alert("Usuário criado com sucesso")
            navigate('/login')
        } catch (err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    const disabledButton = () => {
        return !formData.nome || !formData.user || !formData.senha || !formData.email || loading
    }

    return (
        <section className='create-account'>
            <div className='create-account-content'>
                <img src='/logo.png' alt='Logo moview' width={200} />
                <h2>Crie um usuário Moview:</h2>
                <form onSubmit={handleSubmit} className='login-form'>
                    <div className="login-div">
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite seu nome"
                            className="login-input"
                            required
                        />
                    </div>

                    <div className="login-div">
                        <label>Cidade:</label>
                        <input
                            type="text"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            placeholder="Digite sua cidade"
                            className="login-input"
                        />
                    </div>

                    <div className="login-div">
                        <label>Estado:</label>
                        <input
                            type="text"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            placeholder="Digite seu estado"
                            className="login-input"
                        />
                    </div>

                    <div className="login-div">
                        <label>Descrição:</label>
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Digite uma descrição"
                            className="login-input"
                        />
                    </div>

                    <div className="login-div">
                        <label>Usuário:</label>
                        <input
                            type="text"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            placeholder="Digite seu nome de usuário"
                            className="login-input"
                            required
                        />
                    </div>

                    <div className="login-div">
                        <label>Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="Digite sua senha"
                            className="login-input"
                            required
                        />
                    </div>

                    <div className="login-div">
                        <label>Data de Nascimento:</label>
                        <input
                            type="date"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            className="login-input"
                        />
                    </div>

                    <div className="login-div">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Digite seu email"
                            className="login-input"
                            required
                        />
                    </div>
                    <div className='button-content'>
                        <button className="login-button" type="submit" disabled={disabledButton()}>
                            Criar
                        </button>
                        <button className="login-button" onClick={() => navigate('/')}>
                            Voltar para home
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CriarUsuario