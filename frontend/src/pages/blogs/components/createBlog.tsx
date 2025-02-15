import { BlogService } from "@/api/services/BlogService";
import useFetchCategories from "@/hooks/useFetchCategories";
import { BlogDto } from "@/types/Blogs";
import { useNavigate } from "react-router-dom";
import BlogForm from "./blogForm";

const CreateBlog = () => {
  const { categories } = useFetchCategories();
  const navigate = useNavigate();

  const handleCreate = async (_: BlogDto, values: BlogDto) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("categoryId", values.categoryId);
    if (values.file) {
      formData.append("file", values.file as Blob);
    }
    const data = await BlogService.addBlog(formData);
    if (data) {
      navigate("/my_blogs");
    }
  };

  return (
    <BlogForm
      initialValues={{ title: "", content: "", categoryId: "", file: "" }}
      categories={categories}
      onSubmit={handleCreate}
      heading="Create Blog"
      submitButtonLabel="Save Blog"
    />
  );
};

export default CreateBlog;
