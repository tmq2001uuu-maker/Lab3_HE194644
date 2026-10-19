import { Link } from 'react-router-dom';
export default function Home() {
  return <section className="welcome"><h1>Welcome to ProductStore</h1>
    <p>Manage and explore products for your needs.</p>
    <Link className="button" to="/products">View Products</Link>
  </section>;
}