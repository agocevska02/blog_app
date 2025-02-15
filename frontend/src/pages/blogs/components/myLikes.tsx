import { useEffect, useState } from "react";
import BlogCard from "./blogCard";
import { Blog } from "@/types/Blogs";
import { BlogService } from "@/api/services/BlogService";
import {
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const MyLikes = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const likedBlogs = await BlogService.getLikedBlogsByUser();
        setBlogs(likedBlogs);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "An error occurred while fetching liked blogs.",
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

  if (loading)
    return (
      <Center alignItems={"center"}>
        <Spinner size={"xl"} />
      </Center>
    );

  if (blogs.length === 0)
    return (
      <Heading textAlign="center" alignSelf="center" size="md">
        No liked blogs found
      </Heading>
    );

  return (
    <>
      <HStack justify={"center"} mt={5} mb={10}>
        <Heading size={"xl"}>{"My Liked blogs"}</Heading>
      </HStack>
      <Flex justifyContent="center" flexWrap="wrap" gap={6} mx="auto">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Flex>
    </>
  );
};

export default MyLikes;
