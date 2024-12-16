import { CategoryService } from "@/api/services/CategoryService";
import { Category } from "@/types/Categories";
import { useState, useEffect } from "react";

const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAllCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};

export default useFetchCategories;
