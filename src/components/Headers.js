import { Link, NavLink } from 'react-router-dom';
export default function Headers() {
  return <header className="header">
    <Link className="brand" to="/">ProductStore</Link>
    <nav aria-label="Menu chính"><NavLink to="/" end>Home</NavLink><NavLink to="/products">Products</NavLink></nav>
  </header>;
}
