import { useState } from 'react'
import Loader from '../../components/Loader'
import './buscarFilme.css'
import { getMoviesByTitle } from '../../services/moviedbService'
import { normalizeString } from '../../utils'
import Carrossel from '../../components/Carrossel'
import { MOVIE_DB_IMAGE_URL } from '../../constants'
import { useNavigate } from 'react-router-dom'
import Erro from '../../components/Erro'

const BuscarFilme = () => {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const handleSearch = async () => {
        if (query) {
            setShowResults(true)
            setLoading(true)
            try {
                const filmes = await getMoviesByTitle({ title: normalizeString(query) })
                if (filmes && filmes.length > 0) {
                    setMovies(filmes)
                } else {
                    setMovies([])
                }

            } catch (err) {

                if (err.response && err.response.status === 404) {
                    setMovies([])
                }

                if(err.response && err.response.status === 500) {
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
        return <div className='nenhum-filme'><h4>{"Nenhum filme encontrado :("}</h4></div>
    }

    const filmesEncontrados = () => {
        return (
            <>
                <div className='filmes-encontrados-card'>
                    {movies.map((movie, index) => (
                        <div key={index} className='card-filme'>
                            <img className='card-image' src={`${MOVIE_DB_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
                            <p className='card-title'>{movie.title}</p>
                            <button className='card-button' onClick={() => navigate(`/detalhes/${movie.id}`)}>Ver detalhes</button>
                        </div>
                    ))}
                </div>
                <div className='filmes-encontrados-carrossel'>
                    <Carrossel movies={movies} />
                </div>
            </>
        )
    }

    if(error) return <Erro text="Ops, não foi possível acessar. Tente novamente mais tarde."/>

    return (
        <div className='container'>
            <div className="buscar-filme">
                <h2>Busque filmes pelo título</h2>
                <div className="busca-container">
                    <input
                        type="text"
                        placeholder="Buscar filme..."
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
                    {loading ? <Loader /> : (movies.length > 0 ? filmesEncontrados() : nenhumItemEncontrado())}
                </div>
            )}
        </div>
    )
}

export default BuscarFilme