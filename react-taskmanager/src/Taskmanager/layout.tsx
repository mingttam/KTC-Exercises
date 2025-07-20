/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, Outlet } from "react-router-dom";

import routes from "./routes";
import { useAuthStore } from "./useAuthStore";

export default function MainLayout() {
  const { loggedInUser, logOut } = useAuthStore((state) => state);
  // Get array of user roles ["code"]
  const userRoles: string[] =
    loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [];
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Render Navigation Bar using Tailwind */}
      {loggedInUser && (
        <div className="flex bg-gray-800 items-center justify-between px-6 py-3 border-b border-gray-700 shadow-lg">
          <nav className="flex gap-6">
            {routes.map((route) => {
              if (route.showOnMenu === false) {
                return null; // Skip routes that should not be shown on the menu
              }

              const routeRoles: string[] =
                route.roles?.map((role: string) => role?.toLowerCase()) || [];
              const hasAccess = userRoles.some((role: string) => {
                return role === "administrators" || routeRoles.includes(role?.toLowerCase());
              });

              if (!hasAccess) {
                return null; // Skip routes that the user does not have access to
              }

              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md ${
                      isActive
                        ? "font-bold text-white bg-gray-700"
                        : "font-normal hover:bg-gray-700"
                    }`
                  }
                >
                  {route.name}
                </NavLink>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {loggedInUser?.username || "Guest"}</span>
            <button
              onClick={async () => {
                logOut().then(() => {
                  // Redirect to login page after logout
                  window.location.href = "/login";
                });
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <div className="p-6">
        {/* Render the child routes */}
        <Outlet />
      </div>
    </div>
  );
}
