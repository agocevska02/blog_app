import useFetchBlogById from "@/hooks/useFetchBlogById";
import { Box, Heading, Text, Image, Flex, Spinner, Badge, Icon } from "@chakra-ui/react";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import BlogsPerCategory from "./blogsPerCategory";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, loading, error } = useFetchBlogById(id ?? "");

  if (!blog) return <Spinner />;
  if (loading) return <Spinner />;
  if (error) return <Text>Something went wrong</Text>;

  const createdOn = format(new Date(blog.createdOn), "MMMM d, yyyy");

  const handleCategoryClick = () => {
    if (blog.category?.id) {
      navigate(`/`, { state: { selectedCategoryId: blog.category.id } });
    }
  };

  return (
    <Box bg="chakra-body-bg" minH="100vh" py={8}>
      <Box maxW="1200px" mx="auto" px={4}>
        <Box maxW="800px" mx="auto" w="100%">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            maxH="600px"
            objectFit="cover"
            width="100%"
            borderRadius="xl"
            mb={6}
            boxShadow="xl"
          />

          <Badge
            colorScheme="teal"
            px={4}
            py={1.5}
            borderRadius="full"
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="semibold"
            mb={4}
            boxShadow="sm"
            cursor="pointer"
            onClick={handleCategoryClick}
            _hover={{ opacity: 0.8 }}
          >
            {blog.category?.name}
          </Badge>

          <Heading
            size="xl"
            mb={6}
            color="chakra-text-color"
            letterSpacing="tight"
            textAlign="center"
          >
            {blog.title}
          </Heading>

          <Flex gap={6} mb={8} color="chakra-text-color" opacity={0.8} justify="center" w="100%">
            <Flex align="center" gap={2}>
              <Icon as={FaUser} />
              <Text fontSize="md">
                {blog.author?.fullName}
              </Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Icon as={FaCalendarAlt} />
              <Text fontSize="md">
                {createdOn}
              </Text>
            </Flex>
          </Flex>

          <Box
            bg="chakra-body-bg"
            p={8}
            borderRadius="lg"
            boxShadow="base"
            w="100%"
            mb={12}
          >
            {blog.content.split('\n').map((paragraph, index) => (
              <Text
                key={index}
                fontSize="lg"
                lineHeight="tall"
                color="chakra-text-color"
                mb={4}
                whiteSpace="pre-line"
              >
                {paragraph}
              </Text>
            ))}
          </Box>

          <Box mt={16}>
            <Heading
              size="lg"
              mb={8}
              color="chakra-text-color"
              textAlign="center"
            >
              Similar Blogs
            </Heading>
            <BlogsPerCategory
              categoryId={blog.category?.id || ""}
              isMyBlogs={false}
              excludeBlogId={blog.id}
              variant="carousel"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogDetails;
