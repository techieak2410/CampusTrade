const CATEGORIES = [
  { label: 'All', value: 'All' },
  { label: '📚 Books', value: 'Book' },
  { label: '💻 Electronics', value: 'Electronics' },
  { label: '📐 Engineering', value: 'Engineering_Equipment' },
  { label: '✏️ Stationery', value: 'Stationery' },
  { label: '🏅 Sports', value: 'Sports' },
  { label: '👕 Clothing', value: 'Clothing' },
  { label: '📦 Other', value: 'Other' },
];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="categories">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          className={`category-pill ${active === cat.value ? 'active' : ''}`}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
