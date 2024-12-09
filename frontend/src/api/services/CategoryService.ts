import { Category, CategoryDto } from "../../types/Categories";
import { BlogAppClientInstance } from "../rest-client";

export class CategoryServices {
  getAllCategories = async () => {
    return await BlogAppClientInstance.get<Category[]>(`categories`);
  };

  addCategory = async (category: CategoryDto) => {
    return await BlogAppClientInstance.post<Category>(
      `categories/add`,
      category
    );
  };

  updateCategory = async (id: string, category: CategoryDto) => {
    return await BlogAppClientInstance.put<Category>(
      `categories/update/${id}`,
      category
    );
  };

  deleteCategory = async (id: string) => {
    return await BlogAppClientInstance.delete<Category>(
      `categories/delete/${id}`
    );
  };

  getCategoryById = async (id: string) => {
    return await BlogAppClientInstance.get<Category>(`categories/${id}`);
  };

  getCategoryByName = async (name: string) => {
    return await BlogAppClientInstance.get<Category>(`categories/name/${name}`);
  };

  getCategoryIdByName = async (name: string) => {
    return await BlogAppClientInstance.get<string>(`categories/id/${name}`);
  };
}

export const CategoryService = new CategoryServices();
