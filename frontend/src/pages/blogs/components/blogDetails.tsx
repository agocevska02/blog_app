import useFetchBlogById from "@/hooks/useFetchBlogById";
import { Box, Heading, Text, Image, Flex, Spinner } from "@chakra-ui/react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const { blog, loading, error } = useFetchBlogById(id ?? "");

  if (!blog) return <Spinner />;
  if (loading) return <Spinner />;
  if (error) return <Text>Something went wrong</Text>;
  
  const createdOn = format(new Date(blog.createdOn), "MMMM d, yyyy");
  return (
    <>
      <Box>
        <Heading textAlign="center" alignSelf="center" size="xl">
          {blog.title}
        </Heading>
        <Flex direction="column" align="center" gap={4}>
          <Box>
            <Text textAlign="center" fontSize="2xl">
              {blog.category?.name}
            </Text>
          </Box>

          <Flex justify="center" align="center" gap={2}>
            <Text color="teal.600" fontSize="2xl">
              {createdOn} by
            </Text>
            <Text fontSize="2xl">{blog.author?.fullName}</Text>
          </Flex>
        </Flex>

        <Image
          src={blog.imageUrl}
          alt={blog.title}
          maxH={"600px"}
          objectFit={"contain"}
          width={"100%"}
          maxWidth={"100%"}
        />
        <Text
          textAlign="center"
          alignSelf="center"
          width={"80%"}
          margin={"auto"}
          marginTop={4}
        >
          {blog.content}
        </Text>
      </Box>
    </>
  );
};

export default BlogDetails;
