import { Blog } from "@/types/Blogs";
import {
  Image,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

interface BlogCardProps {
  blog: Blog;
}
const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Card maxW="sm" margin={2} width={"300px"}>
      <CardBody>
        <Flex justifyContent="center">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            objectFit={"cover"}
            borderRadius="lg"
            boxSize={"200px"}
            fallbackSrc="https://via.placeholder.com/150"
          />
        </Flex>
        <Stack mt="6" spacing="3">
          <Box textAlign={"center"}>
            <Heading size="md">{blog.title}</Heading>
            <Text noOfLines={1} marginBottom={2}>
              {blog.content}
            </Text>
            <Text color="teal.600" fontSize="2xl">
              {blog.author}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter justifyContent={"center"}>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="teal">
            Read more
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
