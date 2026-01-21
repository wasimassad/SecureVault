import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vault from "./pages/Vault";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>

    
      <Routes>
         {/* home page */} {/* <<<<<   JSX needs special comments */}
        <Route path="/" element={<Home />} /> 
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Valut page*/}
        <Route path="/vault" element={<Vault />} />
        {/* NotFound page (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}