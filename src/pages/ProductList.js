import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductItem from '../components/productItem';
import Pagination from '../components/Pagination';
const PAGE_SIZE = 3;
const categories = [...new Set(products.map(product => product.category))];
export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'default';
  const rawPage = searchParams.get('page');
  const requestedPage = rawPage && /^\d+$/.test(rawPage) && Number.isSafeInteger(Number(rawPage)) && Number(rawPage) > 0 ? Number(rawPage) : 1;
  // Lọc và sắp xếp trước, sau đó mới cắt danh sách theo trang.
  const filteredProducts = useMemo(() => {
    const result = products.filter(product =>
      product.name.toLowerCase().includes(keyword.trim().toLowerCase()) &&
      (!category || product.category === category)
    );
    if (sort === 'asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'desc') result.sort((a, b) => b.price - a.price);
    return result;
  }, [keyword, category, sort]);
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const page = Math.min(requestedPage, Math.max(1, totalPages));
  // URL có trang sai hoặc vượt giới hạn được đưa về trang hợp lệ.
  useEffect(() => {
    if (rawPage !== null && rawPage !== String(page)) {
      const next = new URLSearchParams(searchParams);
      next.set('page', String(page));
      setSearchParams(next, { replace: true });
    }
  }, [rawPage, page, searchParams, setSearchParams]);
  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'default') next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setSearchParams(next);
  }
  function changePage(number) {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(number));
    setSearchParams(next);
  }
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const listSearch = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return <section aria-label="Danh sách sản phẩm">
    <div className="toolbar">
      <SearchBar keyword={keyword} onSearch={value => updateParam('keyword', value)} />
      <CategoryFilter category={category} categories={categories} onChange={value => updateParam('category', value)} />
      <select aria-label="Sắp xếp theo giá" value={['asc', 'desc'].includes(sort) ? sort : 'default'} onChange={event => updateParam('sort', event.target.value)}>
        <option value="default">Sắp xếp: Mặc định</option><option value="asc">Giá: Thấp → Cao</option><option value="desc">Giá: Cao → Thấp</option>
      </select>
    </div>
    <div className="list-info"><p aria-live="polite">Tổng: {filteredProducts.length} | Trang: {totalPages === 0 ? 0 : page}/{totalPages}</p>
      <Pagination page={page} totalPages={totalPages} onChange={changePage} />
    </div>
    <div className="table-scroll"><table><thead><tr><th>ID</th><th>Tên sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Thao tác</th></tr></thead>
      <tbody>{visibleProducts.map(product => <ProductItem key={product.id} product={product} listSearch={listSearch} />)}
        {visibleProducts.length === 0 && <tr><td colSpan="5" className="empty">Không tìm thấy sản phẩm phù hợp.</td></tr>}
      </tbody></table></div>
  </section>;
}
