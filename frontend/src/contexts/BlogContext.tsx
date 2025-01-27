import { Blog } from "@/types/Blogs";
import { createContext, useContext, useState } from "react";

interface BlogContextType {
  currentBlog: Blog | null;
  setCurrentBlog: (blog: Blog) => void;
}
const BlogContext = createContext<BlogContextType | undefined>(undefined);

import { ReactNode } from "react";

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  return (
    <BlogContext.Provider value={{ currentBlog, setCurrentBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
