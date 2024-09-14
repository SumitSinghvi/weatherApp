import { Toaster } from "react-hot-toast";
import Dashboard from "./features/Dashboard";
import Sidebar from "./features/Sidebar";

export default function App() {
  return (
    <div className="flex h-screen text-slate-700 font-sans dark:text-slate-50">
      <Sidebar />
      <Dashboard />
      <Toaster />
    </div>
  )
}
