import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Cotizar from '@/pages/Cotizar';
import CotizarResultado from '@/pages/CotizarResultado';
import Marcas from '@/pages/Marcas';
import MarcaDetalle from '@/pages/MarcaDetalle';
import PorQueArrendar from '@/pages/PorQueArrendar';
import ComoFunciona from '@/pages/ComoFunciona';
import Preguntas from '@/pages/Preguntas';
import Nosotros from '@/pages/Nosotros';
import Contacto from '@/pages/Contacto';
import Tramite from '@/pages/Tramite';
import Legal from '@/pages/Legal';
import NotFound from '@/pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cotizar" element={<Cotizar />} />
            <Route path="/cotizar/resultado" element={<CotizarResultado />} />
            <Route path="/tramite" element={<Tramite />} />
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/marcas/:marca" element={<MarcaDetalle />} />
            <Route path="/por-que-arrendar" element={<PorQueArrendar />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/preguntas" element={<Preguntas />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/aviso-de-privacidad" element={<Legal />} />
            <Route path="/terminos" element={<Legal />} />
            <Route path="/transparencia" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
