import { Box, Heading } from "@chakra-ui/react";
import AddCategoryForm from "./createCategory";

const AddCategoryPage = () => {
    return (
        <Box p={6}>
            <Heading as="h1" size="lg" mb={6} textAlign="center">
                Add a New Category
            </Heading>
            <AddCategoryForm />
        </Box>
    );
};

export default AddCategoryPage;