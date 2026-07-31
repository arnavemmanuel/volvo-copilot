import {
  LayoutDashboard,
  Calendar,
  Mail,
  FileText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h2 className="text-3xl font-bold mb-10">
        Digital Production Copilot
      </h2>

      <nav className="space-y-6">

<NavLink
  to="/"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive ? "bg-slate-700" : "hover:bg-slate-800"
    }`
  }
>
  <LayoutDashboard size={20} />
  Dashboard
</NavLink>

<NavLink
  to="/meetings"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive ? "bg-slate-700" : "hover:bg-slate-800"
    }`
  }
>
  <Calendar size={20} />
  Meetings
</NavLink>

 <NavLink
  to="/emails"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive ? "bg-slate-700" : "hover:bg-slate-800"
    }`
  }
>
  <Mail size={20} />
  Emails
</NavLink>

<NavLink
  to="/documents"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive ? "bg-slate-700" : "hover:bg-slate-800"
    }`
  }
>
  <FileText size={20} />
  Documents
</NavLink>

      </nav>

    </aside>
    
  );
}