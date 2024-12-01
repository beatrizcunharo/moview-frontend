import { useState } from 'react'
import Loader from '../../components/Loader'
import { isEmptyObject, normalizeString } from '../../utils'
import { useNavigate } from 'react-router-dom'
import Erro from '../../components/Erro'
import { getUserByUsername } from '../../services/userService'
import './buscar-usuario.css'

const BuscarUsuario = () => {
    const [query, setQuery] = useState("")
    const [usuario, setUsuario] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const handleSearch = async () => {
        if (query) {
            setShowResults(true)
            setLoading(true)
            try {
                const usuarioByName = await getUserByUsername({ username: normalizeString(query) })
                if (usuarioByName && !isEmptyObject(usuarioByName)) {
                    setUsuario(usuarioByName.user)
                } else {
                    setUsuario({})
                }

            } catch (err) {

                if (err.response && err.response.status === 404) {
                    setUsuario({})
                }

                if (err.response && err.response.status === 500) {
                    setError(err)
                }
            }
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    const nenhumItemEncontrado = () => {
        return <div className='nenhum-filme'><h4>Nenhum usuário encontrado :(</h4></div>
    }

    const usuariosEncontrados = () => {
        return (
            <div className='usuarios-encontrados-content'>
                <h3>Encontramos um usuário com este nome, confira abaixo: </h3>
                <div className='usuarios-encontrados'>
                    <p className='usuario-text'>{usuario.nome}</p>
                    <p className='usuario-text'>{usuario.user}</p>
                    {usuario.estado && <p className='usuario-text'>{usuario.estado}</p>}
                    {usuario.cidade && <p className='usuario-text'>{usuario.cidade}</p>}
                    <button className='usuarios-button' onClick={() => verDetalhes()}>Ver detalhes</button>
                </div>
            </div>
        )
    }

    const verDetalhes = () => {
        navigate("/detalhes-usuario", { state: { data: usuario } })
    }

    if (error) return <Erro text="Ops, não foi possível acessar. Tente novamente mais tarde." />

    return (
        <div className='container'>
            <div className="buscar-filme">
                <h2>Busque usuários pelo username</h2>
                <div className="busca-container">
                    <input
                        type="text"
                        placeholder="Buscar usuário..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch}>
                        Buscar
                    </button>
                </div>
            </div>

            {showResults && (
                <div className="resultado-busca">
                    {loading ? <Loader /> : (!isEmptyObject(usuario) ? usuariosEncontrados() : nenhumItemEncontrado())}
                </div>
            )}
        </div>
    )
}

export default BuscarUsuario