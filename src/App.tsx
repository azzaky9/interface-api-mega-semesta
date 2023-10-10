import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayouts from "./components/layouts/RootLayouts";
import DashboardScreen from "./components/screen/DashboardScreen";
import MenuScreen from "./components/screen/MenuScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayouts />}>
          <Route
            path='/'
            element={<DashboardScreen />}
          />
          <Route
            path='/stock'
            element={<h1>Stock</h1>}
          />
          <Route
            path='/menu'
            element={<MenuScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
