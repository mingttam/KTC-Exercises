import React from "react";
import { getUsers } from "../services/users.service";
import type { UserProfile } from "../types";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../useAuthStore";

const UsersPage = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAuthStore((state) => state);
  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [loading, setLoading] = React.useState(true);

  const userRoles = loggedInUser?.roles?.map((role) => role.code?.toLowerCase()) || [];

  const canAccessUsers = userRoles.some((role) => ["administrators", "managers"].includes(role));

  const canViewUser = userRoles.some((role) => ["administrators", "managers"].includes(role));

  const canManageRoles = userRoles.some((role) => ["administrators"].includes(role));

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      // Ensure we always have an array, even if response.data is undefined
      const usersData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];
      setUsers(usersData as UserProfile[]);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // Set empty array on error to prevent undefined access
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-blue-500 border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  // Access control check
  if (!canAccessUsers) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to access user management. Only Administrators, Leaders, and
            Managers can view this page.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">User Management</h1>
                  <p className="text-purple-100 mt-1">
                    Manage user accounts and permissions ({users?.length || 0} users)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            {!users || users.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No users found</h3>
                <p className="text-gray-400">Get started by adding your first user.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Roles
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {users &&
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-750 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {user.fullName
                                    ? user.fullName.charAt(0).toUpperCase()
                                    : user.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {user.fullName || "N/A"}
                              </div>
                              <div className="text-sm text-gray-400">ID: {user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{user.username}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {user.roles && user.roles.length > 0 ? (
                              user.roles.map((role) => (
                                <span
                                  key={role.id}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300"
                                >
                                  {role.name}
                                </span>
                              ))
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                                No roles
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate(`/userinformation/${user.id}`)}
                              disabled={!canViewUser}
                              className={`px-3 py-2 rounded-lg transition-colors duration-200 text-xs font-medium ${
                                canViewUser
                                  ? "text-blue-300 hover:text-blue-100 hover:bg-blue-900 bg-blue-800"
                                  : "text-gray-500 cursor-not-allowed bg-gray-700"
                              }`}
                              title={canViewUser ? "View user" : "No permission to view user"}
                            >
                              view
                            </button>

                            <button
                              onClick={() => navigate(`/addroles/${user.id}`)}
                              disabled={!canManageRoles}
                              className={`px-3 py-2 rounded-lg transition-colors duration-200 text-xs font-medium ${
                                canManageRoles
                                  ? "text-green-300 hover:text-green-100 hover:bg-green-900 bg-green-800"
                                  : "text-gray-500 cursor-not-allowed bg-gray-700"
                              }`}
                              title={canManageRoles ? "Add roles" : "No permission to manage roles"}
                            >
                              add role
                            </button>
                            <button
                              onClick={() => navigate(`/removeroles/${user.id}`)}
                              disabled={!canManageRoles}
                              className={`px-3 py-2 rounded-lg transition-colors duration-200 text-xs font-medium ${
                                canManageRoles
                                  ? "text-orange-300 hover:text-orange-100 hover:bg-orange-900 bg-orange-800"
                                  : "text-gray-500 cursor-not-allowed bg-gray-700"
                              }`}
                              title={
                                canManageRoles ? "Remove roles" : "No permission to manage roles"
                              }
                            >
                              {" "}
                              remove role
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
