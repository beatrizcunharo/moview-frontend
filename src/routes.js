import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import BuscarFilme from "./pages/BuscarFilme";
import DetalhesFilme from "./pages/DetalhesFilme";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buscar-filmes" element={<BuscarFilme />} />
                <Route path="/detalhes/:id" element={<DetalhesFilme />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp