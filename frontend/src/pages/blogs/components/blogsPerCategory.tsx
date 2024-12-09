import { BlogService } from "@/api/services/BlogService";
import { Blog } from "@/types/Blogs";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogCard from "./blogCard";

interface BlogsPerCategoryProps {
  categoryId: string;
}

const BlogsPerCategory = ({ categoryId }: BlogsPerCategoryProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      let fetchedBlogs;
      if (categoryId) {
        fetchedBlogs = await BlogService.getBlogsByCategory(categoryId);
      } else {
        fetchedBlogs = await BlogService.getAllBlogs();
      }

      setBlogs(fetchedBlogs);
    };

    fetchBlogs();
  }, [categoryId]);
  return (
    <>
      <Flex justifyContent={"center"}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Flex>
    </>
  );
};

export default BlogsPerCategory;
