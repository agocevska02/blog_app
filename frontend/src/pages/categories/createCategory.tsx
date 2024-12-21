import * as React from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { CategoryService } from "../../api/services/CategoryService";

const AddCategoryForm = () => {
    const [categoryName, setCategoryName] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log("Submitting category:", categoryName);

        if (!categoryName.trim()) {
            console.error("Category name is empty");
            toast({
                title: "Invalid Input",
                description: "Category name cannot be empty.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            const result = await CategoryService.addCategory({ name: categoryName });
            console.log("Category added:", result);
            toast({
                title: "Success",
                description: "Category added successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setCategoryName("");
        } catch (error) {
            console.error("Error adding category:", error);
            toast({
                title: "Error",
                description: (error as any).response?.data?.message || "Failed to add category. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box p={6} maxW="400px" mx="auto" mt={10} borderWidth={1} borderRadius="md">
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl id="categoryName" isRequired>
                        <FormLabel>Category Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        type="submit"
                        isLoading={isLoading}
                    >
                        Add Category
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default AddCategoryForm;
