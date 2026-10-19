import { Link } from 'react-router-dom';
export default function NotFound() {
  return <section className="welcome"><h1>404 - Không tìm thấy trang</h1><p>Trang bạn đang tìm kiếm không tồn tại.</p><Link className="button" to="/">Về trang chủ</Link></section>;
}
