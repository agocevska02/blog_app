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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  useDisclosure,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Box,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: Blog;
  isMyBlog?: boolean;
  onDelete?: (id: string) => void;
}

const BlogCard = ({ blog, isMyBlog, onDelete }: BlogCardProps) => {
  const navigate = useNavigate();
  const { setCurrentBlog } = useBlog();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(blog.id);
    }
    onClose();
  };

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Card
        maxW="sm"
        width="300px"
        height="450px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg="chakra-body-bg"
        _hover={{
          boxShadow: "lg",
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <CardBody padding={0} display="flex" flexDirection="column">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            objectFit="cover"
            height="200px"
            width="100%"
            fallbackSrc="https://via.placeholder.com/150"
          />

          <Box p={5} flex="1" display="flex" flexDirection="column">
            <Stack spacing={3} flex="1">
              <Box>
                <Heading
                  size="md"
                  noOfLines={2}
                  mb={2}
                  color="chakra-text-color"
                >
                  {blog.title}
                </Heading>
                <Text noOfLines={3} color="chakra-text-color" opacity={0.8}>
                  {blog.content}
                </Text>
              </Box>

              <Box mt="auto">
                <Text color="teal.400" fontSize="md" mb={4}>
                  {blog.author?.fullName}
                </Text>
                <Flex justifyContent={"start"} alignItems={"center"} marginBottom={2}>
                  <Icon
                    as={FaHeart}
                    color={"red.500"}
                    cursor="pointer"
                    _hover={{ color: "red.400" }}
                  />
                  <Text marginLeft={"2"}>{blog.likesCount}</Text>
                </Flex>
                <ButtonGroup spacing={2}>
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    size="sm"
                    onClick={() => {
                      setCurrentBlog(blog);
                      navigate(`/blog/${blog.id}`);
                    }}
                  >
                    Read more
                  </Button>
                  {isMyBlog && (
                    <Button
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => {
                        setCurrentBlog(blog);
                        navigate(`/blog/edit/${blog.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {(isMyBlog || user?.role === "ROLE_ADMIN") && (
                    <Button
                      variant="outline"
                      colorScheme="red"
                      size="sm"
                      onClick={onOpen}
                    >
                      Delete
                    </Button>
                  )}
                </ButtonGroup>
              </Box>
            </Stack>
          </Box>
        </CardBody>
      </Card>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Blog
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this blog?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default BlogCard;
