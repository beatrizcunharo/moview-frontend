import { useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function Header() {
    const [headerOpen, setHeaderOpen] = useState(false)

    const toggleHeader = () => {
        setHeaderOpen(!headerOpen)
    }

    const componentLogo = () => {
        return <Link to="/"><img src='logo.png' alt='Logo Moview' width={80} /></Link>
    }

    const componentButtonLogin = () => {
        return <div className='button-content'><button className="login-btn">Login</button></div>
    }

    return (
        <header className="header">
            <div className="header-desktop">
                {componentLogo()}
                <nav className="header-items">
                    <Link to="/" onClick={toggleHeader}>Filmes</Link>
                    <Link to="/buscar-filmes" onClick={toggleHeader}>Buscar Filmes</Link>
                </nav>

                {componentButtonLogin()}
            </div>
            <div className="header-mobile">
                <button className="hamburger" onClick={toggleHeader}>
                    ☰
                </button>
                {headerOpen && (
                    <div className="mobile-header-items">
                        <Link to="/" onClick={toggleHeader}>Filmes</Link>
                        <Link to="/buscar-filmes" onClick={toggleHeader}>Buscar Filmes</Link>
                    </div>
                )}
                {componentLogo()}
                {componentButtonLogin()}
            </div>
        </header>
    )
}

export default Header