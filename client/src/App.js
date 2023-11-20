import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { LoginPage } from "./pages/loginpage";
import { RegisterPage } from "./pages/registerpage";
import { CommunityPage } from "./pages/community-page";
import { ExplorePage } from "./pages/explore-page";
import ProtectedRoute from "./components/protected-route";
import { CommunityPostPage } from "./pages/community-post-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <ExplorePage />
            </ProtectedRoute>
          }
        />

        <Route path="/explore" element={<ExplorePage />} />

        <Route path="/community/:communityId" element={<CommunityPage />} />
        <Route
          path="/community/:communityId/:postId"
          element={<CommunityPostPage />}
        />
      </Routes>
    </>
  );
}

export default App;
