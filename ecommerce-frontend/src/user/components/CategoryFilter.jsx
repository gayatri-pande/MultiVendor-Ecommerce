import { useProducts } from "../../context/ProductContext";
import "../styles/categoryFilter.css";

const CategoryFilter = () => {
  const {
    categories = [],
    selectedCategory,
    setSelectedCategory,
  } = useProducts();

  if (categories.length === 0) return null;

  return (
    <div className="category-wrapper">
      <div className="category-scroll">
        <button
          className={`category-chip ${
            selectedCategory === null ? "active" : ""
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip ${
              selectedCategory === cat.name ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
