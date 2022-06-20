import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authorization";
import { LoadingBackdrop } from "./components/commons";
import BaseLayout from "./layouts/BaseLayout";
import RestrictedPages from "./layouts/RestrictedPages";

const UserLogin = lazy(() => import("./pages/UserLogin"));
const UserWallet = lazy(() => import("./pages/UserWallet"));

const App = () => (
  <AuthProvider>
    <Router>
      <BaseLayout>
        <Suspense fallback={<LoadingBackdrop />}>
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route
              path="/user/wallet"
              element={
                <RestrictedPages>
                  <UserWallet />
                </RestrictedPages>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BaseLayout>
    </Router>
  </AuthProvider>
);

export default App;
