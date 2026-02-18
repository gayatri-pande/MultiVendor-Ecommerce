import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import api from "../services/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ ADD
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Load products
  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Load categories
  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || p.categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        categories,              // ✅ PROVIDE
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
