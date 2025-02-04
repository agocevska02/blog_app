import { BlogService } from "@/api/services/BlogService";
import { Blog } from "@/types/Blogs";
import { useEffect, useState } from "react";

const useFetchBlogById = (id: string) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      const data = await BlogService.getBlogById(id);
      if (data) {
        setBlog(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  return { blog, loading, error };
};

export default useFetchBlogById;
