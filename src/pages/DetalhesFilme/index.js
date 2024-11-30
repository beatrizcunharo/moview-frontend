import { useEffect, useState } from 'react'
import './detalhes.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails } from '../../services/moviedbService'
import Loader from '../../components/Loader'
import Erro from '../../components/Erro'
import { MOVIE_DB_IMAGE_URL } from '../../constants'
import { redirectTo } from '../../utils'

const DetalhesFilme = () => {
    const { id } = useParams()
    const [movieDetails, setMovieDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

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
        };

        if (id) {
            fetchMovieDetails()
        }
    }, [id])

    if (loading) return <Loader />
    if (!movieDetails) return <Erro text="Detalhes do filme não encontrado." />
    if (error) return <Erro text="Ops, não foi possível acessar essa página. Tente novamente mais tarde." redirect="/" />

    const allGenres = movieDetails.genres.map(genre => { return genre.name })

    const btnVoltar = "< Voltar"

    return (
        <section className='detalhes container'>
            <div>
                <button className='detalhes-button' onClick={() => navigate('/')}>{btnVoltar}</button>
            </div>
            <div className='detalhes-content'>
                <div className='detalhes-left'>
                    <img src={`${MOVIE_DB_IMAGE_URL}${movieDetails.poster_path}`} width={300} alt={movieDetails.title}/>
                    <div className='detalhes-button-content'>
                        <button className='detalhes-button'>Favoritar</button>
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