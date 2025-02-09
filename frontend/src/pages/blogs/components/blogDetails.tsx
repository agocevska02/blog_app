import useFetchBlogById from "@/hooks/useFetchBlogById";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Spinner,
  Badge,
  Icon,
  Center,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaHeart } from "react-icons/fa";
import BlogsPerCategory from "./blogsPerCategory";
import { useEffect, useState } from "react";
import { BlogService } from "@/api/services/BlogService";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, loading, error, setBlog } = useFetchBlogById(id ?? "");
  const [liked, setLiked] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkIfBlogLiked = async () => {
      if (blog?.id != null) {
        const isLiked = await BlogService.isLikedByUser(blog.id);
        setLiked(isLiked);
      }
    };

    if (blog && liked === null) {
      checkIfBlogLiked();
    }
  }, [blog]);
  
  if (loading)
    return (
      <Center alignItems={"center"}>
        <Spinner size={"xl"} />
      </Center>
    );
  if (!blog) return <Text>Blog not found</Text>;
  if (error) return <Text>Something went wrong</Text>;

 

  const createdOn = format(new Date(blog.createdOn), "MMMM d, yyyy");

  const handleCategoryClick = () => {
    if (blog.category?.id) {
      navigate(`/`, { state: { selectedCategoryId: blog.category.id } });
    }
  };

  const handleLikeBlog = async () => {
    if (liked) {
      const dislikedBlog = await BlogService.dislikeBlog(blog.id);
      if (dislikedBlog) {
        setLiked(false);
        setBlog(dislikedBlog);
      }
    } else {
      const likedBlog = await BlogService.likeBlog(blog.id);
      if (likedBlog) {
        setLiked(true);
        setBlog(likedBlog);
      }
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

          <Flex align="center" mb={4} gap={3}>
            <Badge
              colorScheme="teal"
              px={4}
              py={1.5}
              borderRadius="full"
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="semibold"
              boxShadow="sm"
              cursor="pointer"
              onClick={handleCategoryClick}
              _hover={{ opacity: 0.8 }}
            >
              {blog.category?.name}
            </Badge>
            <Icon
              as={FaHeart}
              color={liked ? "red.500" : "gray.400"}
              cursor="pointer"
              onClick={handleLikeBlog}
              _hover={{ color: "red.400" }}
            />
            <Text>{blog.likesCount}</Text>
          </Flex>

          <Heading
            size="xl"
            mb={6}
            color="chakra-text-color"
            letterSpacing="tight"
            textAlign="center"
          >
            {blog.title}
          </Heading>

          <Flex
            gap={6}
            mb={8}
            color="chakra-text-color"
            opacity={0.8}
            justify="center"
            w="100%"
          >
            <Flex align="center" gap={2}>
              <Icon as={FaUser} />
              <Text fontSize="md">{blog.author?.fullName}</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Icon as={FaCalendarAlt} />
              <Text fontSize="md">{createdOn}</Text>
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
            {blog.content.split("\n").map((paragraph, index) => (
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
