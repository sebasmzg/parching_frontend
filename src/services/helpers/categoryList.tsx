"use client";

import React, { useEffect, useState } from "react";
import { ApiServiceCategory } from "../actions";
import { ICategory } from "../models";

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    color: "black",
  },
  header: {
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  categorySelected: {
    marginTop: "20px",
  },
  categoryInfo: {
    margin: "10px 0",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#165252",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState<ICategory | null>(null);
  const apiService = new ApiServiceCategory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await apiService.getAllCategories();
        console.log("categoriesData", categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryById = async () => {
      if (categoryId) {
        try {
          const categoryData = await apiService.getCategoryById(categoryId);
          console.log("categoryData", categoryData);
          setCategory(categoryData);
        } catch (error) {
          console.error("Error fetching category by ID:", error);
        }
      }
    };

    fetchCategoryById();
  }, [categoryId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>List of Categories</h2>
      {categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <ul style={styles.list}>
          {categories.map((category) => (
            <li key={category.id} style={styles.listItem}>
              <div style={styles.categoryInfo}>
                <strong>Name:</strong> {category.name}
              </div>
              <button
                style={styles.button}
                onClick={() => setCategoryId(category.id)}
              >
                Get Category By ID
              </button>
            </li>
          ))}
        </ul>
      )}

      {category && (
        <div style={styles.categorySelected}>
          <h3 style={styles.header}>Selected Category</h3>
          <p>
            <strong>Name:</strong> {category.name}
          </p>
          <p>
            <strong>ID:</strong> {category.id}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
