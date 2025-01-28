import * as React from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Button,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Heading
} from "@chakra-ui/react";
import { CategoryService } from "@/api/services/CategoryService";
import { CategoryRow } from "./components/CategoryRow";
import { AddCategoryRow } from "./components/AddCategoryRow";

interface Category {
    id: string;
    name: string;
}

const ListCategories = () => {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [editingName, setEditingName] = React.useState("");
    const [newCategoryName, setNewCategoryName] = React.useState("");
    const [isAdding, setIsAdding] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    const toast = useToast();
    const fetchCategories = async () => {
        try {
            const data = await CategoryService.getAllCategories();
            setCategories(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch categories",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const handleUpdate = async () => {
        if (!editingId || !editingName.trim()) return;

        try {
            await CategoryService.updateCategory(editingId, { name: editingName });
            toast({
                title: "Success",
                description: "Category updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setEditingId(null);
            fetchCategories();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update category",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;

        try {
            await CategoryService.deleteCategory(selectedCategory);
            toast({
                title: "Success",
                description: "Category deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            fetchCategories();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete category",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;

        try {
            await CategoryService.addCategory({ name: newCategoryName });
            toast({
                title: "Success",
                description: "Category added successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setNewCategoryName("");
            setIsAdding(false);
            fetchCategories();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add category",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="1200px" mx="auto" mt={10} p={6}>
            <Heading mb={6} color="chakra-text-color">Manage Categories</Heading>
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Category Name</Th>
                            <Th width="200px">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category) => (
                            <CategoryRow
                                key={category.id}
                                category={category}
                                editingId={editingId}
                                editingName={editingName}
                                onEdit={handleEdit}
                                onUpdate={handleUpdate}
                                setEditingId={setEditingId}
                                setEditingName={setEditingName}
                                onDeleteClick={(id) => {
                                    setSelectedCategory(id);
                                    onOpen();
                                }}
                            />
                        ))}
                        <AddCategoryRow
                            isAdding={isAdding}
                            newCategoryName={newCategoryName}
                            setNewCategoryName={setNewCategoryName}
                            setIsAdding={setIsAdding}
                            onAdd={handleAddCategory}
                        />
                    </Tbody>
                </Table>
            </Box>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Category
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? This action cannot be undone.
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
        </Box>
    );
};

export default ListCategories; 