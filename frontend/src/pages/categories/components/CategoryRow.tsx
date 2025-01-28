import { Box, Tr, Td, Input, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface CategoryRowProps {
    category: { id: string; name: string };
    editingId: string | null;
    editingName: string;
    onEdit: (category: { id: string; name: string }) => void;
    onUpdate: () => void;
    setEditingId: (id: string | null) => void;
    setEditingName: (name: string) => void;
    onDeleteClick: (id: string) => void;
}

export const CategoryRow = ({
    category,
    editingId,
    editingName,
    onEdit,
    onUpdate,
    setEditingId,
    setEditingName,
    onDeleteClick,
}: CategoryRowProps) => {
    return (
        <Tr>
            <Td>
                {editingId === category.id ? (
                    <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        size="sm"
                    />
                ) : (
                    category.name
                )}
            </Td>
            <Td>
                {editingId === category.id ? (
                    <Box>
                        <IconButton
                            aria-label="Save"
                            icon={<CheckIcon />}
                            colorScheme="green"
                            size="sm"
                            mr={2}
                            onClick={onUpdate}
                        />
                        <IconButton
                            aria-label="Cancel"
                            icon={<CloseIcon />}
                            colorScheme="red"
                            size="sm"
                            onClick={() => setEditingId(null)}
                        />
                    </Box>
                ) : (
                    <Box>
                        <IconButton
                            aria-label="Edit"
                            icon={<EditIcon />}
                            colorScheme="teal"
                            size="sm"
                            mr={2}
                            onClick={() => onEdit(category)}
                        />
                        <IconButton
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            size="sm"
                            onClick={() => onDeleteClick(category.id)}
                        />
                    </Box>
                )}
            </Td>
        </Tr>
    );
}; 