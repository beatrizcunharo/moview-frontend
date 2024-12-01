import { useState } from 'react'
import './header.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getUserData, removeUserData } from '../../utils'

function Header() {
    const { name } = getUserData()
    const [headerOpen, setHeaderOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    if (location.pathname === "/login" || location.pathname === "/criar-usuario") {
        return null
    }

    const toggleHeader = () => {
        setHeaderOpen(!headerOpen)
    }

    const toggleLogin = () => {
        setLoginOpen(!loginOpen)
    }

    const componentLogo = () => {
        return <Link to="/"><img src='/logo.png' alt='Logo Moview' width={80} /></Link>
    }

    const handleLogout = () => {
        if(location.pathname === "/perfil") navigate('/')
        removeUserData()
        window.location.reload(true)
    }

    const componentButtonLogin = () => {
        if (name) {
            return (
                <div className="user-profile" onClick={toggleLogin}>
                    <img src='/user-profile.png' alt="User" className="user-icon" width={100} />
                    <span>{name}</span>
                    {loginOpen && (
                        <div className="user-menu">
                            <button onClick={() => navigate('/perfil')}>Meu perfil</button>
                            <button onClick={() => navigate('/favoritos')}>Meus favoritos</button>
                            <button onClick={() => handleLogout()}>Logout</button>
                        </div>
                    )}
                </div>
            )
        } else {
            return <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        }
    }

    return (
        <header className="header">
            <div className="header-desktop">
                {componentLogo()}
                <nav className="header-items">
                    <Link to="/" onClick={toggleHeader}>Filmes</Link>
                    <Link to="/buscar-filmes" onClick={toggleHeader}>Buscar Filmes</Link>
                    <Link to="/buscar-usuario" onClick={toggleHeader}>Buscar Usuários</Link>
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
                        <Link to="/buscar-usuario" onClick={toggleHeader}>Buscar Usuários</Link>
                    </div>
                )}
                {componentLogo()}
                {componentButtonLogin()}
            </div>
        </header>
    )
}

export default Header