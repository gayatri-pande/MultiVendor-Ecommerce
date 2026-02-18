import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import CategoryFilter from "../components/CategoryFilter";
import { useProducts } from "../../context/ProductContext";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  const {
    filteredProducts = [],
    loading,
    error,
    searchTerm,
  } = useProducts();

  if (loading) {
    return <div className="container">Loading products...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  const isSearching = searchTerm?.trim().length > 0;

  return (
    <>
      
      {!isSearching && <HeroSection />}

      <div className="container">
        {!isSearching && <CategoryFilter />}

        <h1 className="page-title">
          {isSearching ? "Search Results" : "Explore Products"}
        </h1>

        {filteredProducts.length === 0 ? (
          <p className="empty-text">No products found</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* <div><WhyChooseUs/></div> */}
    </>
  );
};

export default Home;
