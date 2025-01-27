import { BlogService } from "@/api/services/BlogService";
import { Blog } from "@/types/Blogs";
import { Center, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogCard from "./blogCard";

interface BlogsPerCategoryProps {
  categoryId: string;
  isMyBlogs?: boolean;
}

const BlogsPerCategory = ({ categoryId, isMyBlogs }: BlogsPerCategoryProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const onDelete = async (id: string) => {
    try {
      await BlogService.deleteBlog(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));

      toast({
        title: "Success",
        description: "Blog deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while deleting blog.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      if (loading) return;
      try {
        setLoading(true);
        let fetchedBlogs;

        if (isMyBlogs) {
          fetchedBlogs = categoryId
            ? await BlogService.getMyBlogsByCategory(categoryId)
            : await BlogService.getMyBlogs();
        } else {
          fetchedBlogs = categoryId
            ? await BlogService.getBlogsByCategory(categoryId)
            : await BlogService.getAllBlogs();
        }

        setBlogs(fetchedBlogs);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "An error occurred while fetching blogs.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
      ) : blogs.length > 0 ? (
        <Flex justifyContent={"center"}>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              isMyBlog={isMyBlogs}
              onDelete={onDelete}
            />
          ))}
        </Flex>
      ) : (
        <Heading textAlign="center" alignSelf="center" size="md">
          No blogs found
        </Heading>
      )}
    </>
  );
};

export default BlogsPerCategory;
