import { useState, useEffect } from "react"
import './perfil.css'
import { getUserData } from "../../utils"
import { getUserById, updateUser } from "../../services/userService"
import { useNavigate } from "react-router-dom"

const Perfil = () => {
    const { id } = getUserData()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [fieldsDisabled, setFieldsDisabled] = useState(true)
    const [formData, setFormData] = useState({
        nome: '',
        cidade: '',
        estado: '',
        descricao: '',
        user: '',
        senha: '',
        dataNascimento: '',
        email: ''
    })

    if (!id) {
        navigate("/")
    }

    const fetchUserData = async () => {
        setLoading(true)
        try {
            const data = await getUserById(id)
            const user = data.user
            setFormData({
                nome: user.nome,
                cidade: user.cidade,
                estado: user.estado,
                descricao: user.descricao,
                user: user.user,
                senha: user.senha,
                dataNascimento: user.dataNascimento,
                email: user.email
            })
        } catch (err) {
            alert("Erro ao carregar os dados do usuário.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [id])

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

    const handleAlterarDados = (e) => {
        setFieldsDisabled(!fieldsDisabled)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            await updateUser({ id: id, data: formData })
            alert("Usuário alterado com sucesso")
            window.location.reload(true)
        } catch (err) {
            console.log(err)
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    const disabledButton = () => {
        return !formData.nome || !formData.user || !formData.senha || !formData.email || loading
    }

    return (
        <section className="perfil container">
            <div className="perfil-title">
                <h2>Meu perfil</h2>
                <button className="button-alterar" onClick={handleAlterarDados}>Alterar dados</button>
            </div>
            <form onSubmit={handleSubmit} className='perfil-form'>
                <div className="perfil-fields">
                    <div className="login-div">
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Preencha seu nome"
                            className="login-input"
                            required
                            disabled={fieldsDisabled}
                        />
                    </div>

                    <div className="login-div">
                        <label>Cidade:</label>
                        <input
                            type="text"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            placeholder="Preencha sua cidade"
                            className="login-input"
                            disabled={fieldsDisabled}
                        />
                    </div>

                    <div className="login-div">
                        <label>Estado:</label>
                        <input
                            type="text"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            placeholder="Preencha seu estado"
                            className="login-input"
                            disabled={fieldsDisabled}
                        />
                    </div>

                    <div className="login-div">
                        <label>Descrição:</label>
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Preencha uma descrição"
                            className="login-input"
                            disabled={fieldsDisabled}
                        />
                    </div>

                    <div className="login-div">
                        <label>Usuário:</label>
                        <input
                            type="text"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            placeholder="Preencha seu nome de usuário"
                            className="login-input"
                            required
                            disabled={fieldsDisabled}
                        />
                    </div>

                    <div className="login-div">
                        <label>Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="Preencha sua senha"
                            className="login-input"
                            required
                            disabled={fieldsDisabled}
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
                            disabled={fieldsDisabled}
                        />
                    </div>

                    <div className="login-div">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Preencha seu email"
                            className="login-input"
                            required
                            disabled={fieldsDisabled}
                        />
                    </div>
                </div>

                <div>
                    {!fieldsDisabled && <div className='button-content'>
                        <button className="login-button" type="submit" disabled={disabledButton()}>
                            {loading ? 'Aguarde...' : "Alterar"}
                        </button>
                    </div>}
                </div>

            </form>
        </section>
    )
}

export default Perfil