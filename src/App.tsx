import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Welcome from "./pages/Welcome";

const App = () => (
  <Router>
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  </Router>
);

export default App;
