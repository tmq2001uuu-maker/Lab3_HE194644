export default function CategoryFilter({ category, categories, onChange }) {
  return <select aria-label="Danh mục" value={category} onChange={event => onChange(event.target.value)}>
    <option value="">Tất cả danh mục</option>
    {categories.map(item => <option key={item} value={item}>{item}</option>)}
    {category && !categories.includes(category) && <option value={category}>{category}</option>}
  </select>;
}
