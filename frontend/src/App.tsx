import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthProvider";
import { HomePage } from "./components/Pages/Home/HomePage";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import { Navbar } from "./components/Navbar";
import Cart from "./components/Pages/Cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <div className="r">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App
