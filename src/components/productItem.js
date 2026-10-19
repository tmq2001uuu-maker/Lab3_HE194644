import { Link } from 'react-router-dom';
export default function ProductItem({ product, listSearch }) {
  return <tr>
    <td>{product.id}</td><td>{product.name}</td><td>{product.category}</td>
    <td className="price">{product.price.toLocaleString('vi-VN')}₫</td>
    <td><Link className="button" to={`/products/${product.id}${listSearch}`}>Chi tiết</Link></td>
  </tr>;
}
