import { Category } from "./Categories";

export type BlogDto = {
  title: string;
  content: string;
  categoryId: number;
  author: string;
  imageUrl: string;
  createdOn: string;
  updatedOn: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  category: Category;
  author: string;
  imageUrl: string;
  createdOn: string;
  updatedOn: string;
};
