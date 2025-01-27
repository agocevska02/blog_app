import { useBlog } from "@/contexts/BlogContext";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { format } from "date-fns";

const BlogDetails = () => {
  const { currentBlog: blog } = useBlog();

  if (!blog) {
    return <div>No blog data found. Please navigate properly.</div>;
  }
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
