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
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: Blog;
  isMyBlog?: boolean;
  onDelete: (id: string) => void;
}

const BlogCard = ({ blog, isMyBlog, onDelete }: BlogCardProps) => {
  const navigate = useNavigate();
  const { setCurrentBlog } = useBlog();

  const { isOpen, onOpen, onClose } =  useDisclosure();

  const handleDelete = () => {
    onDelete(blog.id);
    onClose();
  };

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Card
        maxW="sm"
        margin={2}
        border="none"
        boxShadow="none"
        borderRadius="lg"
      >
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
                <>
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={() => {
                      setCurrentBlog(blog);
                      navigate(`/blog/edit/${blog.id}`);
                    }}
                  >
                    Edit Blog
                  </Button>
                  <Button variant="solid" colorScheme="teal" onClick={onOpen}>
                    Delete
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Stack>
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
