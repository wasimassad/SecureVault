import { BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>

    
      <Routes>
         {/* Redirect from home page to login */} {/* <<<<<   JSX needs special comments */}
        <Route path="/" element={<Navigate to="/login" replace />} /> 
        { /* login page*/ }
        <Route path="/login" element={<Login />} />
        {/* Register page*/}
        <Route path="/register" element={<Register />} />
        {/* NotFound page */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}