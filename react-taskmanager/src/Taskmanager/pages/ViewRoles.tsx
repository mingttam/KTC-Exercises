import React from "react";
import { deleteRole, getRoles } from "../services/roles.service";
import type { Role } from "../types";
import { useNavigate } from "react-router-dom";

const ViewRoles = () => {
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [deleting, setDeleting] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const navigate = useNavigate();

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const rolesData = await getRoles();
      setRoles(rolesData.data || rolesData);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRoles();
  }, []);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError(null);
  };

  const handleDeleteRole = async (role: Role) => {
    if (window.confirm(`Are you sure you want to delete the role: ${role.name}?`)) {
      if (role.id !== undefined) {
        try {
          setDeleting(role.id);
          setError(null); // Clear any previous errors
          await deleteRole(role.id);
          setRoles((prevRoles) => prevRoles.filter((r) => r.id !== role.id));
        } catch (error) {
          console.error("Failed to delete role:", error);

          // Show user-friendly error message
          let errorMessage = "Failed to delete role. Please try again.";
          if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as {
              response?: {
                status?: number;
                data?: {
                  message?: string | string[];
                  error?: string;
                  statusCode?: number;
                };
              };
            };

            if (axiosError.response?.status === 400) {
              // Handle both string and array message formats
              const apiMessage = axiosError.response?.data?.message;
              if (Array.isArray(apiMessage) && apiMessage.length > 0) {
                errorMessage = apiMessage[0]; // Use the first message from the array
              } else if (typeof apiMessage === "string") {
                errorMessage = apiMessage;
              } else {
                errorMessage =
                  "Cannot delete this role because it is currently assigned to users. Please remove it from all users first.";
              }
            } else {
              const apiMessage = axiosError.response?.data?.message;
              const apiError = axiosError.response?.data?.error;

              if (Array.isArray(apiMessage) && apiMessage.length > 0) {
                errorMessage = apiMessage[0];
              } else if (typeof apiMessage === "string") {
                errorMessage = apiMessage;
              } else if (typeof apiError === "string") {
                errorMessage = apiError;
              }
            }
          }

          setError(errorMessage);
          setShowErrorModal(true);
        } finally {
          setDeleting(null);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-blue-500 border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 font-medium">Loading roles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative p-5 border w-96 shadow-lg rounded-md bg-gray-800 border-gray-700">
              <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900 mb-4">
                  <svg
                    className="h-6 w-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg leading-6 font-medium text-white mb-3">
                  Cannot Delete Role
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-300">{error}</p>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    onClick={handleCloseErrorModal}
                    className="px-6 py-3 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Role Management</h1>
                  <p className="text-green-100 mt-1">
                    Manage system roles and permissions ({roles.length} roles)
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/createroles")}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="hidden sm:inline">Create Role</span>
              </button>
            </div>
          </div>

          {/* Roles Table */}
          <div className="overflow-x-auto">
            {roles.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No roles found</h3>
                <p className="text-gray-400">Get started by creating your first role.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Role Information
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {roles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-750 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                {role.name ? role.name.charAt(0).toUpperCase() : "R"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-white">{role.name}</div>
                            <div className="text-sm text-gray-400">ID: #{role.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300 border border-blue-700">
                          {role.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 max-w-xs">
                          {role.description ? (
                            <span className="line-clamp-2">{role.description}</span>
                          ) : (
                            <span className="text-gray-500 italic">No description provided</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/roles/update/${role.id}`)}
                            className="flex items-center gap-1 px-3 py-2 text-amber-400 hover:text-amber-300 hover:bg-amber-900/20 rounded-lg transition-colors duration-200 border border-amber-700/50 hover:border-amber-600"
                            title="Edit role"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            <span className="text-xs font-medium">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteRole(role)}
                            disabled={deleting === role.id}
                            className="flex items-center gap-1 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-700/50 hover:border-red-600"
                            title="Delete role"
                          >
                            {deleting === role.id ? (
                              <div className="w-4 h-4 border-2 border-red-400 border-r-transparent rounded-full animate-spin"></div>
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                            <span className="text-xs font-medium">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Table Footer */}
          {roles.length > 0 && (
            <div className="bg-gray-750 px-6 py-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-300">
                    Showing <span className="font-semibold text-white">{roles.length}</span>{" "}
                    {roles.length === 1 ? "role" : "roles"}
                  </div>
                  <div className="h-4 w-px bg-gray-600"></div>
                  <div className="text-xs text-gray-400">Total system roles</div>
                </div>
                <button
                  onClick={fetchRoles}
                  className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 font-medium transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRoles;
