import { Routes, Route } from 'react-router-dom';
import Headers from './components/Headers';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import './App.css';
export default function App() {
  return <div className="store"><Headers /><main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </main></div>;
}
