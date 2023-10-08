import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayouts from "./components/layouts/RootLayouts";
import DashboardPage from "./components/screen/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayouts />}>
          <Route
            path='/'
            element={<DashboardPage />}
          />
          <Route
            path='/stock'
            element={<h1>Stock</h1>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
