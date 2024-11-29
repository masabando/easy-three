import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GettingStarted from "./pages/GettingStarted";
import Examples from "./pages/examples/Top";
import Reference from "./pages/reference/Top";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { UserProvider } from "./components/Lang";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Reference_Create_Cube from "./pages/reference/create/Cube";

function App() {
  const search = useLocation().search;
  const path = new URLSearchParams(search).get("path");
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  useEffect(() => {
    if (path) {
      navigate(path);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <UserProvider>
      <div className="App mw-100">
        <div className="flex-grow-1 mw-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/reference" element={<Reference />} />
            <Route path="/reference/create_cube" element={<Reference_Create_Cube />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
