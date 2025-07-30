import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import emblem from "../assets/emblem.png";

export default function Sidebar() {
  const location = useLocation();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(
    location.pathname.startsWith("/data-collection") || location.pathname.startsWith("/thematic-config")
  );

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/bank-access", label: "Household Economic Strengthening" },
    { path: "/community-reached", label: "Parenting, Family Support and Relationship" },
    { path: "/coordinators-capacitated", label: "Coordination, Monitoring and Evaluation" },
    { path: "/agents-trained", label: "Implementation and Enforcement of Laws" },
    { path: "/school-mechanisms", label: "Safe Education/Learning Environment and Life Skills" },
    { path: "/vawc-cases", label: "Safe Environment in Public Spaces" },
    { path: "/women-help", label: "Response and Supportive Services" },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-gradient-to-b from-white to-gray-50 border-r shadow-lg flex flex-col">
      <div className="flex-shrink-0 p-6">
        <div className="flex items-center justify-center mb-4">
          <img src={emblem} className="w-20 h-20" alt="national emblem" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 text-center">NPA-VAWC</h1>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-1">

        {/* Main Nav Items */}
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors 
              ${isActive ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}`
            }
          >
            {label}
          </NavLink>
        ))}

        {/* Collapsible Submenu */}
        <div>
          <button
            onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <span>Configuration</span>
            {isSubmenuOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {isSubmenuOpen && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink
                to="/data-collection"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors 
                  ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}`
                }
              >
                Data Entry
              </NavLink>
              <NavLink
                to="/thematic-config"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors 
                  ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}`
                }
              >
                Thematic Areas
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
