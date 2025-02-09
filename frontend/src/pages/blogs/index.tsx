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
import { useLocation } from "react-router-dom";

const LatestBlogs = () => {
  const location = useLocation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    location.state?.selectedCategoryId || ""
  );
  const { categories, loading } = useFetchCategories();

  const isMyBlogs = location.pathname === "/my_blogs";
  return (
    <Box overflowX={"hidden"}>
      <HStack justify={"center"} mt="5">
        <Heading size={"xl"}>{isMyBlogs ? "My Blogs" : "Latest Blogs"}</Heading>
      </HStack>
      {!isMyBlogs && <SubscriptionForm />}
      <Tabs
        isFitted
        mt={20}
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
              <BlogsPerCategory categoryId={""} isMyBlogs={isMyBlogs} />
            </TabPanel>
            {categories.length > 0 &&
              categories.map((category) => (
                <TabPanel key={category.id}>
                  {selectedCategoryId === category.id && (
                    <BlogsPerCategory
                      categoryId={category.id}
                      isMyBlogs={isMyBlogs}
                      variant="grid"
                    />
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
