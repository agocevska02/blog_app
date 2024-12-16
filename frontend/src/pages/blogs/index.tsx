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
import { useState } from "react";
import BlogsPerCategory from "./components/blogsPerCategory";
import SubscriptionForm from "./components/subscriptionForm";
import useFetchCategories from "@/hooks/useFetchCategories";

const LatestBlogs = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const { categories, loading } = useFetchCategories();

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
            {categories.length > 0 &&
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
