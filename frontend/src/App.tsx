import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import LatestBlogs from "./pages/blogs";
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from "./pages/header";
import CreateBlog from "./pages/blogs/components/createBlog";
import AddCategoryPage from "./pages/categories/addCategoryPage";
import EditBlog from "./pages/blogs/components/editBlog";
import SignIn from "./pages/authentication/signIn";
import Signup from "./pages/authentication/signup";
import BlogDetails from "./pages/blogs/components/blogDetails";
import { BlogProvider } from "./contexts/BlogContext";
import ListCategories from "./pages/categories/ListCategories";

function App() {
  return (
    <>
      <AuthProvider>
        <BlogProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<LatestBlogs />} />
              <Route
                path="/blog/create"
                element={
                  <ProtectedRoute
                    Component={CreateBlog}
                    roles={["ROLE_USER"]}
                  />
                }
              />
              <Route
                path="/blog/edit/:id"
                element={
                  <ProtectedRoute
                    Component={EditBlog}
                    roles={["ROLE_USER", "ROLE_ADMIN"]}
                  />
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <ProtectedRoute
                    Component={BlogDetails}
                    roles={["ROLE_USER", "ROLE_ADMIN"]}
                  />
                }
              />

              <Route
                path="/my_blogs"
                element={
                  <ProtectedRoute
                    Component={LatestBlogs}
                    roles={["ROLE_USER", "ROLE_ADMIN"]}
                  />
                }
              />
              <Route
                path="/category/create"
                element={
                  <ProtectedRoute
                    Component={AddCategoryPage}
                    roles={["ROLE_ADMIN"]}
                  />
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute
                    Component={ListCategories}
                    roles={["ROLE_ADMIN"]}
                  />
                }
              />
            </Routes>
          </Router>
        </BlogProvider>
      </AuthProvider>
    </>
  );
}

export default App;
