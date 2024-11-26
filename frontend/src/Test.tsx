import { useEffect, useState } from "react";
import { BlogService } from "./api/services/BlogService";
import { Blog } from "./types/Blogs";

const Test = () => {
  const [blogs, setBlogs] = useState<Blog[]>();
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const fetchedblogs = await BlogService.getAllBlogs();
        setBlogs(fetchedblogs);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogs();
  }, []);

  return (
    <>
      <div>
        <h1>Test Fetch</h1>
      </div>
      <div>
        {blogs?.map((blog: Blog) => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
