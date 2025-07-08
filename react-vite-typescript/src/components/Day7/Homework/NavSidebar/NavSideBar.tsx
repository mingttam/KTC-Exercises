import { Link, useLocation } from "react-router-dom";
import {
  FaUserFriends,
  FaChartPie,
  FaMapMarkerAlt,
  FaBuilding,
  FaUserMd,
  FaHistory,
  FaCog,
} from "react-icons/fa";

const navItems = [
  { to: "/patients", label: "Patients", icon: <FaUserFriends /> },
  { to: "/", label: "Overview", icon: <FaChartPie /> },
  { to: "/map", label: "Map", icon: <FaMapMarkerAlt /> },
  { to: "/departments", label: "Departments", icon: <FaBuilding /> },
  { to: "/doctors", label: "Doctors", icon: <FaUserMd /> },
  { to: "/history", label: "History", icon: <FaHistory /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

const NavSideBar = () => {
  const location = useLocation();
  return (
    <aside className="h-screen w-56 bg-white shadow flex flex-col justify-between py-6 px-2">
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item, idx) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-gray-400 hover:text-purple-600 hover:bg-purple-50 ${
                  location.pathname === item.to || (item.to === "/" && location.pathname === "/")
                    ? "text-purple-600 bg-purple-50 font-semibold"
                    : ""
                } ${idx === navItems.length - 1 ? "mt-8" : ""}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default NavSideBar;
