export default function Pagination({ page, totalPages, onChange }) {
  return <nav className="pagination" aria-label="Phân trang">
    <button disabled={page <= 1 || totalPages === 0} onClick={() => onChange(page - 1)}>Trước</button>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(number =>
      <button key={number} className={number === page ? 'selected' : ''} aria-current={number === page ? 'page' : undefined} onClick={() => onChange(number)}>{number}</button>
    )}
    <button disabled={page >= totalPages || totalPages === 0} onClick={() => onChange(page + 1)}>Sau</button>
  </nav>;
}