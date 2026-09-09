import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import useLenis from "./hooks/useLenis";
// import "lenis/dist/lenis.css";

function App() {
  // useLenis();

  const location = useLocation();

  const hideNavbar = location.pathname === "/demo" || location.pathname === "/signup" || location.pathname === "/welcome" || location.pathname === "/viewForm";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
