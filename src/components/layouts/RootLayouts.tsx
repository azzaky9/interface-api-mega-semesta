import { Outlet } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";

export default function RootLayouts() {
  return (
    <div className='flex flex-row w-full h-screen'>
      <Sidebar />
      <main className="w-full px-5 py-20 " >
        <Outlet />
      </main>
    </div>
  );
}
