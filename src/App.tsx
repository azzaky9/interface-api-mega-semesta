import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayouts from "./components/layouts/RootLayouts";
import MenuScreen from "./components/screen/MenuScreen";
import MainDashboard from "./components/screen/MainDashboard";
import DashboardScreen from "./components/screen/DashboardScreen";
import AuthScreen from "./components/screen/AuthScreen";
import { AuthProvider } from "./context/AuthContext";
import SalesScreen from "./components/screen/SalesScreen";
import StockScreen from "./components/screen/StockScreen";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<RootLayouts />}>
            <Route
              path='/'
              element={<MainDashboard />}
            />
            <Route
              path='/stock'
              element={<StockScreen />}
            />
            <Route
              path='/menu'
              element={<MenuScreen />}
            />
            <Route
              path='/auth'
              element={<AuthScreen />}
            />
            <Route
              path='/register'
              element={<DashboardScreen />}
            />
            <Route
              path='/sales'
              element={<SalesScreen />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
