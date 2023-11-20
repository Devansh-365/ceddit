import { Route, Routes, HashRouter as Router } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { LoginPage } from "./pages/loginpage";
import { RegisterPage } from "./pages/registerpage";
import { CommunityPage } from "./pages/community-page";
import { ExplorePage } from "./pages/explore-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </>
  );
}

export default App;
