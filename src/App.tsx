import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayouts from "./components/layouts/RootLayouts";
import MenuScreen from "./components/screen/MenuScreen";
import MainDashboard from "./components/screen/MainDashboard";
import DashboardScreen from "./components/screen/DashboardScreen";
import AuthScreen from "./components/screen/AuthScreen";
import { AuthProvider } from "./context/AuthContext";

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
              element={<p>stock</p>}
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
