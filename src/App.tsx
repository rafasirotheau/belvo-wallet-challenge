import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authorization";
import { LoadingBackdrop } from "./components";
import BaseLayout from "./layouts/BaseLayout";

const Welcome = lazy(() => import("./pages/Welcome"));
const UserLogin = lazy(() => import("./pages/UserLogin"));
const UserWallet = lazy(() => import("./pages/UserWallet"));

const App = () => (
  <AuthProvider>
    <BaseLayout>
      <Router>
        <Suspense fallback={<LoadingBackdrop />}>
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/user/wallet" element={<UserWallet />} />
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </BaseLayout>
  </AuthProvider>
);

export default App;
