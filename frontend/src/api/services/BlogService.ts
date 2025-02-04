import { Blog } from "../../types/Blogs";
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

  updateBlog = async (id: string, formData: FormData) => {
    return await BlogAppClientInstance.put<Blog>(
      `blogs/update/${id}`,
      formData,
      {
        Accept: "*/*",
      }
    );
  };

  deleteBlog = async (id: string) => {
    return await BlogAppClientInstance.delete<void>(`blogs/delete/${id}`);
  };

  getBlogById = async (id: string) => {
    return await BlogAppClientInstance.get<Blog>(`blogs/${id}`);
  };

  getBlogsByCategory = async (categoryId: string) => {
    return await BlogAppClientInstance.get<Blog[]>(
      `blogs/category/${categoryId}`
    );
  };

  getMyBlogs = async () => {
    return await BlogAppClientInstance.get<Blog[]>(`blogs/myBlogs`);
  };

  getMyBlogsByCategory = async (categoryId: string) => {
    return await BlogAppClientInstance.get<Blog[]>(
      `blogs/myBlogs/${categoryId}`
    );
  };
}

export const BlogService = new BlogServices();
