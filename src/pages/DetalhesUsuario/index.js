import { useLocation, useNavigate } from "react-router-dom"
import './detalhesUsuario.css'
import { useEffect, useState } from "react"
import { getFavorite } from "../../services/favoriteService"
import { getMovieDetails } from '../../services/moviedbService'
import { MOVIE_DB_IMAGE_URL } from '../../constants'
import Loader from "../../components/Loader"
import { normalizeString } from "../../utils"

const DetalhesUsuario = () => {
    const location = useLocation()
    const data = location.state?.data
    const navigate = useNavigate()
    const [favorites, setFavorites] = useState([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const btnVoltar = "< Voltar"

    const fetchFavoritesDetails = async (favoriteMovies) => {
        try {
            const detailsPromises = favoriteMovies.map((favorite) =>
                getMovieDetails(favorite.movieId)
            )
            const details = await Promise.all(detailsPromises)
            setFavorites(details)
        } catch (error) {
            setError('Erro ao carregar os detalhes dos favoritos.')
        }
    }

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true)
            try {
                const favoriteMovies = await getFavorite(data.id)
                if (favoriteMovies && favoriteMovies.length > 0) {
                    await fetchFavoritesDetails(favoriteMovies)
                }
            } catch (err) {
                setError('Erro ao carregar os favoritos do usuário.')
            } finally {
                setLoading(false)
            }
        };

        if (data.id) {
            fetchFavorites()
        }
    }, [data.id])

    const filteredMovies = query
        ? favorites.filter((movie) =>
            movie?.title?.toLowerCase().includes(normalizeString(query))
        )
        : favorites

    return (
        <section className="detalhes-usuario container">
            <button className='detalhes-button' onClick={() => navigate('/buscar-usuario')}>{btnVoltar}</button>
            <h2>Perfil: {data.user}</h2>
            {loading ? <Loader /> : <div className="all-data-content">
                <div className="data-content">
                    <p>Nome: {data.nome}</p>
                    <p>Username: {data.user}</p>
                    {data.cidade && <p>Cidade: {data.cidade}</p>}
                    {data.estado && <p>Estado: {data.estado}</p>}
                    <p>Criação da conta Moview: {new Intl.DateTimeFormat('pt-BR').format(new Date(data.dataCriacao))}</p>
                    {data.dataNascimento && <p>Data de Nascimento: {new Intl.DateTimeFormat('pt-BR').format(new Date(data.dataNascimento))}</p>}
                </div>

                {data.descricao && <p>Descrição pessoal: {data.descricao}</p>}
            </div>}


            <h2>Filmes favoritos de {data.nome}</h2>
            <section className="favoritos">

                <div className="busca-container">
                    <input
                        type="text"
                        placeholder="Buscar filme..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="busca-input"
                    />
                </div>
                {loading && <Loader />}

                {!loading && !error && (
                    <div className="filmes-container-favoritos">
                        {filteredMovies.length > 0 ? (
                            filteredMovies.map((movie) => (
                                <div key={movie.id} className="card-filme">
                                    <img
                                        className="card-image"
                                        src={`${MOVIE_DB_IMAGE_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <p className="card-title">{movie.title}</p>
                                    <button
                                        className="card-button"
                                        onClick={() => navigate(`/detalhes/${movie.id}`)}
                                    >
                                        Ver detalhes
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">Nenhum filme encontrado.</p>
                        )}
                    </div>
                )}
            </section>
        </section>
    )
}

export default DetalhesUsuario