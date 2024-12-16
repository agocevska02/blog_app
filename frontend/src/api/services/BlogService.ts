import { Blog, BlogDto } from "../../types/Blogs";
import { BlogAppClientInstance } from "../rest-client";

export class BlogServices {
  getAllBlogs = async () => {
    return await BlogAppClientInstance.get<Blog[]>(`blogs`);
  };

  addBlog = async (formData: FormData) => {
    return await BlogAppClientInstance.post<Blog>(`blogs/add`, formData, {
      Accept: "*/*",
    });
  };

  updateBlog = async (id: string, blog: BlogDto) => {
    return await BlogAppClientInstance.put<Blog>(`blogs/update/${id}`, blog);
  };

  deleteBlog = async (id: string) => {
    return await BlogAppClientInstance.delete<Blog>(`blogs/delete/${id}`);
  };

  getBlogById = async (id: string) => {
    return await BlogAppClientInstance.get<BlogDto>(`blogs/${id}`);
  };

  getBlogsByCategory = async (categoryId: string) => {
    return await BlogAppClientInstance.get<Blog[]>(
      `blogs/category/${categoryId}`
    );
  };

  getBlogsByAuthor = async (author: string) => {
    return await BlogAppClientInstance.get<Blog[]>(`blogs/author/${author}`);
  };
}

export const BlogService = new BlogServices();
