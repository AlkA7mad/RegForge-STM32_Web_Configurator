import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Configurator from "./pages/Configurator/Configurator";

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/configurator" element={<Configurator />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
