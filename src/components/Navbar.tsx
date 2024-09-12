import { CgProfile } from "react-icons/cg";
import { RiCelsiusLine, RiFahrenheitLine } from "react-icons/ri";


export default function Navbar() {
  return (
    <div className="flex items-center justify-between text-2xl">
      <div className="space-x-10">
        <button>Today</button>
        <button className="border-b-2 border-black">Week</button>
      </div>
      <div className="space-x-10 flex items-center justify-between">
            <div className="space-x-4">
            <button className="text-2xl p-1 font-semibold bg-white rounded-full"><RiCelsiusLine /></button>
            <button className="text=2xl p-1 font-semibold bg-black text-white rounded-full"><RiFahrenheitLine /></button>
        </div>
        <CgProfile size={40}/>
      </div>
    </div>
  )
}
