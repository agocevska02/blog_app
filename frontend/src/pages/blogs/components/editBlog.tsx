import { BlogService } from "@/api/services/BlogService";
import useFetchCategories from "@/hooks/useFetchCategories";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogDto } from "@/types/Blogs";
import BlogForm from "./blogForm";
import { useBlog } from "@/contexts/BlogContext";

const EditBlog = () => {
  const { categories } = useFetchCategories();
  const navigate = useNavigate();
  const { currentBlog: blog } = useBlog();
  const [initialValues, setInitialValues] = useState<{
    id: string;
    title: string;
    content: string;
    categoryId: string;
    file: File | string;
  }>({
    id: "",
    title: "",
    content: "",
    categoryId: "",
    file: "",
  });

  useEffect(() => {
    if (!blog) return;
    setInitialValues({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      categoryId: blog.category.id,
      file: blog.imageUrl,
    });
  }, []);

  const handleEdit = async (initialVals: BlogDto, values: BlogDto) => {
    if (!blog) return;
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("categoryId", values.categoryId);
    if (values.file && values.file != initialVals.file) {
      formData.append("file", values.file as Blob);
    }
    const data = await BlogService.updateBlog(blog.id, formData);
    if (data) {
      navigate("/my_blogs");
    }
  };
  return (
    <BlogForm
      initialValues={initialValues}
      categories={categories}
      onSubmit={handleEdit}
      heading="Edit Blog"
      submitButtonLabel="Update Blog"
    />
  );
};

export default EditBlog;
