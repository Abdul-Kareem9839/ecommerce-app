import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <CartDrawer />
      <Outlet />
    </div>
  );
}

export default App;
