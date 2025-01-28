import { Box, Tr, Td, Input, IconButton, Button } from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface AddCategoryRowProps {
    isAdding: boolean;
    newCategoryName: string;
    setNewCategoryName: (name: string) => void;
    setIsAdding: (isAdding: boolean) => void;
    onAdd: () => void;
}

export const AddCategoryRow = ({
    isAdding,
    newCategoryName,
    setNewCategoryName,
    setIsAdding,
    onAdd,
}: AddCategoryRowProps) => {
    return (
        <Tr>
            <Td>
                {isAdding ? (
                    <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter new category name"
                        size="sm"
                    />
                ) : (
                    <Button
                        leftIcon={<AddIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAdding(true)}
                    >
                        Add New Category
                    </Button>
                )}
            </Td>
            <Td>
                {isAdding && (
                    <Box>
                        <IconButton
                            aria-label="Save"
                            icon={<CheckIcon />}
                            colorScheme="green"
                            size="sm"
                            mr={2}
                            onClick={onAdd}
                        />
                        <IconButton
                            aria-label="Cancel"
                            icon={<CloseIcon />}
                            colorScheme="red"
                            size="sm"
                            onClick={() => {
                                setIsAdding(false);
                                setNewCategoryName("");
                            }}
                        />
                    </Box>
                )}
            </Td>
        </Tr>
    );
}; 