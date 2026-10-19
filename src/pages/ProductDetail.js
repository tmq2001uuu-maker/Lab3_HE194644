import { Link, useLocation, useParams } from 'react-router-dom';
import { products } from '../data/products';
export default function ProductDetail() {
  const { id } = useParams();
  const { search } = useLocation();
  const product = products.find(item => String(item.id) === id);
  const backLink = `/products${search}`;
  if (!product) return <section className="welcome"><h1>Không tìm thấy sản phẩm</h1><p>Sản phẩm có ID “{id}” không tồn tại.</p><Link className="button" to={backLink}>Quay lại danh sách</Link></section>;
  return <section>
    <Link className="button" to={backLink}>← Quay lại danh sách</Link>
    <div className="product-detail">
      <div className="image-placeholder" role="img" aria-label={`Khung ảnh minh họa cho ${product.name}`}>[ Ảnh sản phẩm ]</div>
      <div><h1>{product.name}</h1><dl>
        <dt>ID</dt><dd>{product.id}</dd><dt>Danh mục</dt><dd>{product.category}</dd>
        <dt>Giá</dt><dd>{product.price.toLocaleString('vi-VN')}₫</dd>
      </dl><div className="description"><strong>Mô tả:</strong><p>{product.description}</p></div></div>
    </div>
  </section>;
}
