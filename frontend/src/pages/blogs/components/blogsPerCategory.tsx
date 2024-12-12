import { BlogService } from "@/api/services/BlogService";
import { Blog } from "@/types/Blogs";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogCard from "./blogCard";

interface BlogsPerCategoryProps {
  categoryId: string;
}

const BlogsPerCategory = ({ categoryId }: BlogsPerCategoryProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (loading) return;
      try {
        setLoading(true);
        let fetchedBlogs;

        if (categoryId) {
          fetchedBlogs = await BlogService.getBlogsByCategory(categoryId);
        } else {
          fetchedBlogs = await BlogService.getAllBlogs();
        }

        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Flex justifyContent={"center"}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </Flex>
      )}
    </>
  );
};

export default BlogsPerCategory;
