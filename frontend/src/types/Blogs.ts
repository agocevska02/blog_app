import { Category } from "./Categories";
import { User } from "./Users";

export type BlogDto = {
  title: string;
  content: string;
  categoryId: number;
  imageUrl: string;
  createdOn: string;
  updatedOn: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  category: Category;
  author: User;
  imageUrl: string;
  createdOn: string;
  updatedOn: string;
};
