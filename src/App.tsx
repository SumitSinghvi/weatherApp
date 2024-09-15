import { Toaster } from "react-hot-toast";
import Dashboard from "./features/Dashboard";
import Sidebar from "./features/Sidebar";
import { useState } from "react";

export default function App() {
  const [nav, setNav] = useState<string>('week');
  return (
    <div className="flex flex-col md:flex-row h-screen text-slate-700 font-sans dark:text-slate-50">
      <Sidebar setNav={setNav} nav={nav}/>
      <Dashboard setNav={setNav} nav={nav}/>
      <Toaster />
    </div>
  )
}
