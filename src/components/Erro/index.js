import { useNavigate } from "react-router-dom"
import './erro.css'

const Erro = ({ text, redirect }) => {
    const navigate = useNavigate()

    return (
        <div className="error container">
            {text && <p className="error-text">{text}</p>}
            {redirect && <button className="error-button" onClick={() => navigate(redirect)}>Voltar á página inicial</button>}
        </div>
    )
}

export default Erro