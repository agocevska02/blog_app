import { BlogService } from "@/api/services/BlogService";
import { Blog } from "@/types/Blogs";
import { Center, Flex, Heading, Spinner, useToast, Box, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogCard from "./blogCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface BlogsPerCategoryProps {
  categoryId: string;
  isMyBlogs?: boolean;
  excludeBlogId?: string;
  variant?: 'grid' | 'carousel';
}

const BlogsPerCategory = ({
  categoryId,
  isMyBlogs,
  excludeBlogId,
  variant = 'grid'
}: BlogsPerCategoryProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);

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
          if (excludeBlogId) {
            fetchedBlogs = fetchedBlogs.filter(blog => blog.id !== excludeBlogId);
          }
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

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 3;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxStartIndex = blogs.length - 3;
      const newIndex = prev + 3;
      return newIndex > maxStartIndex ? maxStartIndex : newIndex;
    });
  };

  const showPrevious = currentIndex > 0;
  const showNext = currentIndex < blogs.length - 3;

  return (
    <>
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : blogs.length > 0 ? (
        variant === 'grid' ? (
          <Flex
            justifyContent="center"
            flexWrap="wrap"
            gap={6}
            mx="auto"
          >
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
          <Box width="100%" position="relative">
            <Flex
              maxW="1200px"
              mx="auto"
              justify="center"
              align="center"
              gap={8}
              position="relative"
            >
              <IconButton
                aria-label="Previous"
                icon={<ChevronLeftIcon boxSize={6} />}
                onClick={handlePrevious}
                position="absolute"
                left="-150px"
                top="50%"
                transform="translateY(-50%)"
                colorScheme="teal"
                size="lg"
                isDisabled={!showPrevious}
                opacity={showPrevious ? 1 : 0.5}
                height="40px"
                width="40px"
                borderRadius="full"
                bg="teal.500"
                color="white"
                _hover={{
                  bg: 'teal.600',
                  transform: 'translateY(-50%) scale(1.1)',
                }}
                _active={{
                  bg: 'teal.700'
                }}
                transition="all 0.2s"
                boxShadow="lg"
                zIndex={2}
              />

              <Flex
                justify="center"
                gap={8}
                width="fit-content"
                transition="all 0.3s ease"
              >
                {blogs.slice(currentIndex, currentIndex + 3).map((blog) => (
                  <Box
                    key={blog.id}
                    width="300px"
                  >
                    <BlogCard
                      blog={blog}
                      isMyBlog={isMyBlogs}
                      onDelete={onDelete}
                    />
                  </Box>
                ))}
              </Flex>

              <IconButton
                aria-label="Next"
                icon={<ChevronRightIcon boxSize={6} />}
                onClick={handleNext}
                position="absolute"
                right="-150px"
                top="50%"
                transform="translateY(-50%)"
                colorScheme="teal"
                size="lg"
                isDisabled={!showNext}
                opacity={showNext ? 1 : 0.5}
                height="40px"
                width="40px"
                borderRadius="full"
                bg="teal.500"
                color="white"
                _hover={{
                  bg: 'teal.600',
                  transform: 'translateY(-50%) scale(1.1)',
                }}
                _active={{
                  bg: 'teal.700'
                }}
                transition="all 0.2s"
                boxShadow="lg"
                zIndex={2}
              />
            </Flex>
          </Box>
        )
      ) : (
        <Heading textAlign="center" alignSelf="center" size="md">
          No blogs found
        </Heading>
      )}
    </>
  );
};

export default BlogsPerCategory;
