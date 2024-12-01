import { useEffect, useState } from 'react'
import './detalhes.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails } from '../../services/moviedbService'
import Loader from '../../components/Loader'
import Erro from '../../components/Erro'
import { MOVIE_DB_IMAGE_URL } from '../../constants'
import { getUserData, redirectTo } from '../../utils'
import { getFavorite, addFavorite, deleteFavorite } from '../../services/favoriteService'

const DetalhesFilme = () => {
    const { id } = useParams()
    const [movieDetails, setMovieDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [favorite, setFavorite] = useState(false)
    const navigate = useNavigate()
    const { id: userId, email } = getUserData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true)
                const details = await getMovieDetails(id)
                setMovieDetails(details)
            } catch (err) {
                setError('Erro ao carregar os detalhes do filme.')
            } finally {
                setLoading(false)
            }
        }

        const fetchFavorites = async () => {
            try {
                const favorites = await getFavorite(userId)
                const hasThisMovieFavorite = favorites.find((favorite) => favorite.movieId === id)
                if (hasThisMovieFavorite) {
                    setFavorite(true)
                } else {
                    setFavorite(false)
                }
            } catch (err) {
                setError('Erro ao carregar os favoritos do usuário.')
            }
        }


        if (id) {
            fetchMovieDetails()
            fetchFavorites()
        }
    }, [id, userId])

    if (loading) return <Loader />
    if (!movieDetails) return <Erro text="Detalhes do filme não encontrado." />
    if (error) return <Erro text="Ops, não foi possível acessar essa página. Tente novamente mais tarde." redirect="/" />

    const allGenres = movieDetails.genres.map(genre => { return genre.name })

    const btnVoltar = "< Voltar"

    const addFavoriteHandle = async () => {
        try {
            await addFavorite({ userId: userId, email: email, movieId: id, movieTitle: movieDetails.title })
            alert("Adicionado com sucesso.")
            setFavorite(true)
        } catch (err) {
            setError('Erro ao adicionar favorito.')
        }
    }

    const deleteFavoriteHandle = async () => {
        try {
            await deleteFavorite({ userId: userId, movieId: id })
            alert("Removido dos favoritos.")
            setFavorite(false)
        } catch (err) {
            setError('Erro ao adicionar favorito.')
        }
    }

    const componentButtonFavorite = () => {
        if (!userId) {
            return <></>
        } else {
            if (!favorite) {
                return <button className='detalhes-button' onClick={() => addFavoriteHandle()}>Favoritar</button>
            } else {
                return <button onClick={() => deleteFavoriteHandle()} className='detalhes-button'>Remover favorito</button>
            }
        }
    }

    return (
        <section className='detalhes container'>
            <div>
                <button className='detalhes-button' onClick={() => navigate('/')}>{btnVoltar}</button>
            </div>
            <div className='detalhes-content'>
                <div className='detalhes-left'>
                    <img src={`${MOVIE_DB_IMAGE_URL}${movieDetails.poster_path}`} width={300} alt={movieDetails.title} />
                    <div className='detalhes-button-content'>
                        {componentButtonFavorite()}
                        <a href={`https://youtube.com/results?search_query=${movieDetails.title} Trailer`} target="_blank" rel="noopener noreferrer">
                            <button className='detalhes-button'>
                                Trailer
                            </button>
                        </a>
                        {movieDetails.homepage && <button className='detalhes-button' onClick={() => redirectTo(movieDetails.homepage)}>Página do filme</button>}
                    </div>
                </div>
                <div className='detalhes-right'>
                    <p className='detalhes-right-title'>{movieDetails.title}</p>
                    <div className='detalhes-right-overview-content'>
                        <p className='detalhes-right-overview-title'>Sinopse:</p>
                        <p>{movieDetails.overview}</p>
                    </div>
                    <div className='detalhes-right-genre'>Gêneros: <p>{allGenres.join('/')}</p></div>
                    <p className='detalhes-right-average'>Avaliação: {movieDetails.vote_average} / 10</p>
                </div>
            </div>
        </section>
    )
}

export default DetalhesFilme