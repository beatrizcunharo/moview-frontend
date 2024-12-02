import React, { useEffect, useState } from 'react'
import { getFavorite } from '../../services/favoriteService'
import { getMovieDetails } from '../../services/moviedbService'
import { MOVIE_DB_IMAGE_URL } from '../../constants'
import Loader from '../../components/Loader'
import { useNavigate } from 'react-router-dom'
import { getUserData, normalizeString } from '../../utils'
import Erro from '../../components/Erro'
import './favoritos.css'

const Favoritos = () => {
    const navigate = useNavigate()
    const { id } = getUserData()
    const [favorites, setFavorites] = useState([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    if (!id) {
        navigate("/")
    }

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

        if (!id) {
            navigate("/")
        }

        const fetchFavorites = async () => {
            setLoading(true)
            try {
                const favoriteMovies = await getFavorite(id)
                if (favoriteMovies && favoriteMovies.length > 0) {
                    await fetchFavoritesDetails(favoriteMovies)
                }
            } catch (err) {
                setError('Erro ao carregar os favoritos do usuário.')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchFavorites()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const filteredMovies = query
        ? favorites.filter((movie) =>
              movie?.title?.toLowerCase().includes(normalizeString(query))
          )
        : favorites

    return (
        <section className="container favoritos">
            <h2>Meus Favoritos</h2>

            <div className="busca-container">
                <input
                    type="text"
                    placeholder="Buscar filme..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="busca-input"
                />
            </div>

            {error && <Erro text={error} />}
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
    );
};

export default Favoritos