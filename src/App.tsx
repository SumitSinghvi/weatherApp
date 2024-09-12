import { Toaster } from "react-hot-toast";
import Dashboard from "./features/Dashboard";
import Sidebar from "./features/Sidebar";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Dashboard />
      <Toaster />
    </div>
  )
}
