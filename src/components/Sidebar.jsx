import { NavLink } from "react-router-dom";
import {
  Home,
  Banknote,
  Users,
  ShieldCheck,
  School,
  BarChart,
  HelpCircle,
} from "lucide-react"; // optional icons
import emblem from '../assets/emblem.png'; // adjust the path as needed

export default function Sidebar() {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/bank-access", label: "Household Economic Strengthening" },
    { path: "/community-reached", label: "Parenting, Family Support and Relationship" },
    { path: "/coordinators-capacitated", label: "Coordination, Monitoring and Evaluation" },
    { path: "/agents-trained", label: "Law Enforcement Agents"},
    { path: "/school-mechanisms", label: "Safe Education/Learning Enviroment and Life Skills"},
    { path: "/vawc-cases", label: "Safe Environment in Public Spaces" },
    { path: "/women-help", label: "Response and Supportive Services" },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-gradient-to-b from-white to-gray-50 border-r shadow-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <img src={emblem} className="w-20 h-20" alt="national emblem" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">NPA-VAWC</h1>
      <nav className="flex flex-col space-y-1">
        {navItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
