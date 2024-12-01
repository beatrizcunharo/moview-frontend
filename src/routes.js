import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import BuscarFilme from "./pages/BuscarFilme";
import DetalhesFilme from "./pages/DetalhesFilme";
import Login from "./pages/Login";
import CriarUsuario from "./pages/CriarUsuario";
import Favoritos from "./pages/Favoritos";
import Perfil from "./pages/Perfil";
import BuscarUsuario from "./pages/BuscarUsuario";
import DetalhesUsuario from "./pages/DetalhesUsuario";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buscar-filmes" element={<BuscarFilme />} />
                <Route path="/detalhes/:id" element={<DetalhesFilme />} />
                <Route path="/login" element={<Login />} />
                <Route path="/criar-usuario" element={<CriarUsuario />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/buscar-usuario" element={<BuscarUsuario />} />
                <Route path="/detalhes-usuario" element={<DetalhesUsuario />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp