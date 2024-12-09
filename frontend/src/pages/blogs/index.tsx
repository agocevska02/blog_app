import { CategoryService } from "@/api/services/CategoryService";
import { Category } from "@/types/Categories";
import {
  Box,
  Heading,
  HStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogsPerCategory from "./components/blogsPerCategory";
import SubscriptionForm from "./components/subscriptionForm";

const LatestBlogs = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await CategoryService.getAllCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return (
    <Box>
      <HStack justify={"center"} mt='5'>
        <Heading size={"xl"}>Latest Blogs</Heading>
      </HStack>
      <SubscriptionForm/>
      <Tabs
        isFitted
        variant="enclosed"
        index={
          selectedCategoryId === ""
            ? 0
            : categories.findIndex(
                (category) => category.id === selectedCategoryId
              ) + 1
        }
        onChange={(index) => {
          if (index === 0) {
            setSelectedCategoryId("");
          } else {
            setSelectedCategoryId(categories[index - 1]?.id);
          }
        }}
      >
        <TabList>
          <Tab>All</Tab>
          {categories.map((category) => (
            <Tab key={category.id}>{category.name}</Tab>
          ))}
        </TabList>
        <TabIndicator
          height="2px"
          bg="teal.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <BlogsPerCategory categoryId={""} />
          </TabPanel>
          <TabPanel>
            <BlogsPerCategory categoryId={selectedCategoryId} />
          </TabPanel>
          <TabPanel>
            <BlogsPerCategory categoryId={selectedCategoryId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LatestBlogs;
