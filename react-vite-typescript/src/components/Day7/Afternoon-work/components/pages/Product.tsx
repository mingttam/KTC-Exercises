import { useEffect, useState, useCallback } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductGrid from "../ProductGrid/Productgrid";
import Pagination from "../Pagination/Pagination";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export default function Product() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 8;

  const fetchCategories = async () => {
    try {
      const respond = await fetch("https://api.escuelajs.co/api/v1/categories");
      if (!respond.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await respond.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * productsPerPage;
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${productsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);

      // Get total count of all products
      const totalResponse = await fetch(`https://api.escuelajs.co/api/v1/products`);
      const totalData = await totalResponse.json();
      setTotalProducts(totalData.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      fetchAllProducts();
    }
  }, [selectedCategories, currentPage, fetchAllProducts]);

  useEffect(() => {
    const fetchByCategory = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * productsPerPage;
        const categoryId = selectedCategories[0];
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=${offset}&limit=${productsPerPage}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);

        const totalResponse = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
        );
        const totalData = await totalResponse.json();
        setTotalProducts(totalData.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * productsPerPage;
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${productsPerPage}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);

        // Get total count of all products
        const totalResponse = await fetch(`https://api.escuelajs.co/api/v1/products`);
        const totalData = await totalResponse.json();
        setTotalProducts(totalData.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategories.length > 0) {
      fetchByCategory();
    } else {
      fetchAllProducts();
    }
  }, [selectedCategories, currentPage, productsPerPage]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [categoryId];
      }
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8"></h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <Sidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="lg:w-3/4">
          <ProductGrid products={products} loading={loading} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
