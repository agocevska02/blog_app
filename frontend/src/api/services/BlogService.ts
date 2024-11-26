import { Blog } from "../../types/Blogs";
import { BlogClientInstance } from "../rest-client";

export class BlogServices {
  getAllBlogs = async () => {
    return await BlogClientInstance.get<Blog[]>(`blogs`);
  };
}

export const BlogService = new BlogServices();
