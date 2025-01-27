import { useBlog } from "@/contexts/BlogContext";
import { Blog } from "@/types/Blogs";
import {
  Image,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: Blog;
  isMyBlog?: boolean;
}

const BlogCard = ({ blog, isMyBlog }: BlogCardProps) => {
  const navigate = useNavigate();
  const { setCurrentBlog } = useBlog();

  return (
    <Card maxW="sm" margin={2} border="none" boxShadow="none" borderRadius="lg">
      <CardBody display="flex" flexDirection="column" alignItems="center">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          objectFit="cover"
          borderRadius="lg"
          boxSize="200px"
          width={"100%"}
          height={"100%"}
          fallbackSrc="https://via.placeholder.com/150"
        />

        <Stack mt={4} spacing={2} width="full" align="center">
          <Heading size="md">{blog.title}</Heading>
          <Text noOfLines={2} textAlign="center" marginBottom={2}>
            {blog.content}
          </Text>
          <Text color="teal.600" fontSize="xl">
            {blog.author?.fullName}
          </Text>

          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="teal"
              onClick={() => {
                setCurrentBlog(blog);
                navigate(`/blog/${blog.id}`);
              }}
            >
              Read more
            </Button>
            {isMyBlog && (
              <Button
                variant="solid"
                colorScheme="teal"
                onClick={() => {
                  setCurrentBlog(blog);
                  navigate(`/edit_blog/${blog.id}`);
                }}
              >
                Edit Blog
              </Button>
            )}
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
