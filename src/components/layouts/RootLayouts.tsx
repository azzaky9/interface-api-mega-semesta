import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";
import Profiles from "../auth-indicators/Profiles";
import { useAuth } from "../../context/AuthContext";
import Loader from "../utils/Loader";

export default function RootLayouts() {
  const { pathname } = useLocation();
  const { authWithEmail } = useAuth();

  const isLocationAuth = pathname === "/auth";

  if (authWithEmail.isLoading) {
    return (
      <div className='h-screen'>
        <Loader customLabel='Melakukan Autentikasi..' />
      </div>
    );
  }

  return (
    <div className='flex flex-row w-full h-screen'>
      {!isLocationAuth ? <Sidebar /> : null}
      <main className='relative w-full bg-gray-100  '>
        {!isLocationAuth ? <Profiles /> : null}
        <Outlet />
      </main>
    </div>
  );
}
