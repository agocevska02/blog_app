import { BlogService } from "@/api/services/BlogService";
import useFetchCategories from "@/hooks/useFetchCategories";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogDto } from "@/types/Blogs";
import BlogForm from "./blogForm";

const EditBlog = () => {
  const { categories } = useFetchCategories();
  const { id } = useParams();
  const navigate = useNavigate();
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
    if (!id) return;
    const fetchBlog = async () => {
      const blog = await BlogService.getBlogById(id);
      setInitialValues({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        categoryId: blog.category.id,
        file: blog.imageUrl,
      });
    };
    fetchBlog();
  }, [id]);

  const handleEdit = async (initialVals: BlogDto, values: BlogDto) => {
    if (!id) return;
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("categoryId", values.categoryId);
    if (values.file && values.file != initialVals.file) {
      formData.append("file", values.file as Blob);
    }
    const data = await BlogService.updateBlog(id, formData);
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
