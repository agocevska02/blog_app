import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import LatestBlogs from "./pages/blogs";
import SignIn from "./pages/authentication/SignIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from "./pages/header";
import Signup from "./pages/authentication/Signup";

function App() {
  return (
    <>
      <Header />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute Component={LatestBlogs} roles={["ROLE_USER"]} />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
