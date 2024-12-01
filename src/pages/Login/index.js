import { useState } from 'react'
import './login.css'
import { login } from '../../services/userService'
import Loader from '../../components/Loader'
import { useNavigate } from 'react-router-dom'
import { setUserData } from '../../utils'

const Login = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const result = await login(email, senha)

            if (result.response === true) {
                const user = {
                    email, id: result.id, name: result.name
                }
                setUserData(user)
                alert('Login bem-sucedido!')
                navigate('/')
            }
        } catch (error) {
            alert('Senha ou e-mail incorretos')
        } finally {
            setLoading(false)
        }
    }

    const disabledButton = () => {
        return !email || !senha || loading
    }

    return (
        <div className='login'>
            {loading ? <Loader /> : <>
                <div className='login-content'>
                    <img src='/logo.png' alt='Logo moview' width={200} />
                    <h2>Acesse Moview:</h2>
                    <form onSubmit={handleSubmit} className='login-form'>
                        <div className='login-div'>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                                className='login-input'
                                required
                            />
                        </div>
                        <div className='login-div'>
                            <label>Senha:</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Digite sua senha"
                                className='login-input'
                                required
                            />
                        </div>
                        <div>Não tem uma conta? <a href='/criar-usuario' className='create-account-link'>Crie aqui!</a></div>
                        <div className='button-content'>
                            <button className="login-button" type="submit" disabled={disabledButton()}>
                                Entrar
                            </button>
                            <button className="login-button" onClick={() => navigate('/')}>
                                Voltar para home
                            </button>
                        </div>
                    </form>
                </div>
            </>
            }
        </div>
    )
}

export default Login