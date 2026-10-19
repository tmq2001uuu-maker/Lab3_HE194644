import { useEffect, useState } from 'react';
export default function SearchBar({ keyword, onSearch }) {
  const [input, setInput] = useState(keyword);
  // Đồng bộ ô nhập khi dùng nút Back/Forward của trình duyệt.
  useEffect(() => setInput(keyword), [keyword]);
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(input.trim());
  }
  return <form className="search" onSubmit={handleSubmit}>
    <input aria-label="Tìm tên sản phẩm" placeholder="Tìm tên sản phẩm..." value={input} onChange={event => setInput(event.target.value)} />
    <button type="submit">Tìm</button>
  </form>;
}
