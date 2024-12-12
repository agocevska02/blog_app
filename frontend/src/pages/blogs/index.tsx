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
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchCategories = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const fetchedCategories = await CategoryService.getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  return (
    <Box>
      <HStack justify={"center"} mt="5">
        <Heading size={"xl"}>Latest Blogs</Heading>
      </HStack>
      <SubscriptionForm />
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
        <TabIndicator height="2px" bg="teal.500" borderRadius="1px" />
        {!loading && (
          <TabPanels>
            <TabPanel>
              <BlogsPerCategory categoryId={""} />
            </TabPanel>
            {categories.length>0 &&
              categories.map((category) => (
                <TabPanel key={category.id}>
                  {selectedCategoryId === category.id && (
                    <BlogsPerCategory categoryId={category.id} />
                  )}
                </TabPanel>
              ))}
          </TabPanels>
        )}
      </Tabs>
    </Box>
  );
};

export default LatestBlogs;
