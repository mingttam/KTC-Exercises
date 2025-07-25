import React from "react";
import { useParams } from "react-router-dom";
import { addRoleToUser, getUserById } from "../services/users.service";
import { getRoles } from "../services/roles.service";
import type { Role, UserProfile } from "../types";

const AddRoles = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = React.useState<UserProfile | null>(null);
  const [allRoles, setAllRoles] = React.useState<Role[]>([]);
  const [selectedRoleIDs, setSelectedRoleIDs] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [userNotFound, setUserNotFound] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Use useMemo to calculate available roles (better performance)
  const rolesNotInUserRoles = React.useMemo(() => {
    if (!userData || allRoles.length === 0) return [];
    return allRoles.filter((role) => {
      return !userData.roles?.some((userRole) => userRole.id === role.id);
    });
  }, [userData, allRoles]);

  //handle role selection
  const handleRoleSelection = (roleId: number) => {
    setSelectedRoleIDs((prev) => {
      if (prev.includes(roleId)) {
        return prev.filter((id) => id !== roleId);
      }
      const role = rolesNotInUserRoles.find((role) => role.id === roleId);
      if (role && role.id !== undefined) {
        return [...prev, role.id];
      }
      return prev;
    });
  };

  const handleAddRoles = async () => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    if (selectedRoleIDs.length === 0) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null); // Clear any previous errors

      // Add each role individually since the API accepts one role at a time
      const addRolePromises = selectedRoleIDs.map((roleId) =>
        addRoleToUser(Number(userId), roleId)
      );

      await Promise.all(addRolePromises);

      // Refresh user data to show updated roles
      const userResponse = await getUserById(Number(userId));
      setUserData(userResponse.data || userResponse);
      setSelectedRoleIDs([]);
      setSuccess(true);

      // Auto hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding roles:", error);

      // Show more specific error message if available
      let errorMessage = "Failed to add roles. Please try again.";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: { message?: string; error?: string };
          };
        };
        errorMessage =
          axiosError.response?.data?.message || axiosError.response?.data?.error || errorMessage;
      }

      setError(errorMessage);
      // Auto hide error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user and roles in parallel
        const [userResponse, rolesResponse] = await Promise.all([
          getUserById(Number(userId)),
          getRoles(),
        ]);

        setUserData(userResponse.data || userResponse);
        setAllRoles(rolesResponse.data || rolesResponse);
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response?: { status?: number } };
          if (axiosError.response?.status === 404) {
            setUserNotFound(true);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-blue-500 border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (userNotFound || !userData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-700">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900 mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
          <p className="text-gray-300 mb-6">The user you're looking for doesn't exist.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-900 border border-green-700 rounded-xl p-4 flex items-center gap-3">
            <p className="text-green-300 font-medium">Roles added successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-900 border border-red-700 rounded-xl p-4 flex items-center gap-3">
            <p className="text-red-300 font-medium">{error}</p>
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl"></div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Add Roles to User</h1>
                  <p className="text-blue-100 mt-1">Assign new roles to enhance user permissions</p>
                </div>
              </div>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200"
              >
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* User Information */}
            <div className="bg-gray-750 rounded-xl p-6 mb-8 border border-gray-600">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-800 rounded-lg"></div>
                <h2 className="text-xl font-bold text-white">User Information</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name
                    </label>
                    <p className="text-lg text-white bg-gray-700 px-4 py-3 rounded-lg border border-gray-600">
                      {userData.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                    <p className="text-lg text-white bg-gray-700 px-4 py-3 rounded-lg border border-gray-600">
                      {userData.username}
                    </p>
                  </div>
                </div>

                {/* Current Roles */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Current Roles
                  </label>
                  <div className="bg-gray-700 rounded-lg border border-gray-600 p-4 min-h-[120px]">
                    {userData.roles && userData.roles.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {userData.roles.map((role) => (
                          <span
                            key={role.id}
                            className="inline-flex items-center px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm font-medium border border-blue-700"
                          >
                            {role.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic text-center py-8">No roles assigned</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Add Roles Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">Add New Roles</h2>
              </div>

              {rolesNotInUserRoles.length === 0 ? (
                <div className="text-center py-12 bg-gray-750 rounded-xl border-2 border-dashed border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    All roles are already assigned
                  </h3>
                  <p className="text-gray-400">This user has all available roles in the system.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rolesNotInUserRoles.map((role) => (
                      <label
                        key={role.id}
                        className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedRoleIDs.includes(role.id!)
                            ? "border-green-500 bg-green-900 shadow-md ring-2 ring-green-600"
                            : "border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-650 hover:shadow-sm"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRoleIDs.includes(role.id!)}
                          onChange={() => handleRoleSelection(role.id!)}
                          className="mt-1 h-5 w-5 text-green-600 bg-gray-600 border-gray-500 rounded focus:ring-green-500 focus:ring-2"
                        />
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-semibold text-white mb-1">{role.name}</div>
                          {role.description && (
                            <div className="text-xs text-gray-300 leading-relaxed">
                              {role.description}
                            </div>
                          )}
                        </div>
                        {selectedRoleIDs.includes(role.id!) && (
                          <div className="absolute top-2 right-2"></div>
                        )}
                      </label>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                    <button
                      onClick={() => window.history.back()}
                      className="flex-1 sm:flex-none px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddRoles}
                      disabled={submitting || selectedRoleIDs.length === 0}
                      className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                        submitting || selectedRoleIDs.length === 0
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Adding Roles...
                        </>
                      ) : (
                        <>Add Selected Roles ({selectedRoleIDs.length})</>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoles;
