import { useEffect, useState } from "react";
import Carrossel from "../../components/Carrossel"
import { getRecentMovies } from '../../services/moviedbService'
import './home.css'
import Loader from "../../components/Loader";

const Home = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieData = await getRecentMovies()
                setMovies(movieData)
            } catch (error) {
                console.error('Erro ao buscar filmes: ', error)
            }
            finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [])

    return (
        <div className="container home">
            <h2>Confira os filmes do momento</h2>
            {loading && <Loader />}
            <Carrossel movies={movies} />
        </div>
    )
}

export default Home