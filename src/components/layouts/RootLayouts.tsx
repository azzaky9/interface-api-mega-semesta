import { Outlet } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";

export default function RootLayouts() {
  return (
    <div className='flex flex-row w-full h-screen'>
      <Sidebar />
      <main className='w-full bg-gray-100  '>
        <Outlet />
      </main>
    </div>
  );
}
