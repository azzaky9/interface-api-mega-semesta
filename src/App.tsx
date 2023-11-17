import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayouts from "./components/layouts/RootLayouts";
import MenuScreen from "./components/screen/MenuScreen";
import MainDashboard from "./components/screen/MainDashboard";
import DashboardScreen from "./components/screen/DashboardScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayouts />}>
          <Route
            path='/'
            element={<MainDashboard />}
          />
          <Route
            path='/stock'
            element={<p>stock</p>}
          />
          <Route
            path='/menu'
            element={<MenuScreen />}
          />
          <Route path="/register" element={<DashboardScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
