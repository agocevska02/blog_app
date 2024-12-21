import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import LatestBlogs from "./pages/blogs";
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from "./pages/header";
import CreateBlog from "./pages/blogs/components/createBlog";
import SignIn from "./pages/authentication/SignIn";
import Signup from "./pages/authentication/Signup";
import AddCategoryPage from "./pages/categories/addCategoryPage";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LatestBlogs />} />
            <Route
              path="/create_blog"
              element={
                <ProtectedRoute
                  Component={CreateBlog}
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
              path="/create_category"
              element={
                <ProtectedRoute
                  Component={AddCategoryPage}
                  roles={["ROLE_USER", "ROLE_ADMIN"]}
                />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
