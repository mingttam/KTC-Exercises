import React from "react";
import { useParams } from "react-router-dom";
import { getUserById, removeRoleFromUser } from "../services/users.service";
import type { UserProfile } from "../types";

const RemoveRoles = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = React.useState<UserProfile | null>(null);
  const [selectedRoleIDs, setSelectedRoleIDs] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [userNotFound, setUserNotFound] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  //handle role selection
  const handleRoleSelection = (roleId: number) => {
    setSelectedRoleIDs((prev) => {
      if (prev.includes(roleId)) {
        return prev.filter((id) => id !== roleId);
      }
      const role = userData?.roles?.find((role) => role.id === roleId);
      if (role && role.id !== undefined) {
        return [...prev, role.id];
      }
      return prev;
    });
  };

  const handleRemoveRoles = async () => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    if (selectedRoleIDs.length === 0) {
      return;
    }

    setSubmitting(true);
    try {
      // Remove each selected role individually
      await Promise.all(
        selectedRoleIDs.map((roleId) => removeRoleFromUser(Number(userId), roleId))
      );
      setSuccess(true);
      setSelectedRoleIDs([]);

      // Refresh user data to show updated roles
      const updatedUserData = await getUserById(Number(userId));
      setUserData(updatedUserData.data || updatedUserData);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error removing roles:", error);
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setUserNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userResponse = await getUserById(Number(userId));
        setUserData(userResponse.data || userResponse);
      } catch (error: unknown) {
        console.error("Error fetching user data:", error);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-red-600 border-r-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (userNotFound || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-6">The user you're looking for doesn't exist.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <p className="text-green-800 font-medium">Roles removed successfully!</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl"></div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Remove Roles from User
                  </h1>
                  <p className="text-red-100 mt-1">Revoke user roles and reduce permissions</p>
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
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-8 border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg"></div>
                <h2 className="text-xl font-bold text-gray-900">User Information</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Full Name
                    </label>
                    <p className="text-lg text-gray-900 bg-white px-4 py-3 rounded-lg border border-gray-200">
                      {userData.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                    <p className="text-lg text-gray-900 bg-white px-4 py-3 rounded-lg border border-gray-200">
                      {userData.username}
                    </p>
                  </div>
                </div>

                {/* Current Roles Count */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-3">
                    Current Roles ({userData.roles?.length || 0})
                  </label>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 min-h-[120px]">
                    {userData.roles && userData.roles.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {userData.roles.map((role) => (
                          <span
                            key={role.id}
                            className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium border border-red-200"
                          >
                            {role.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic text-center py-8">No roles assigned</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Remove Roles Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">Remove Roles</h2>
              </div>

              {!userData.roles || userData.roles.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No roles to remove</h3>
                  <p className="text-gray-500">This user doesn't have any roles assigned.</p>
                </div>
              ) : (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-amber-800 mb-1">
                          Warning: Removing Roles
                        </h3>
                        <p className="text-sm text-amber-700">
                          Removing roles will immediately revoke the user's permissions associated
                          with those roles. Please confirm your selection carefully.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData.roles.map((role) => (
                      <label
                        key={role.id}
                        className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedRoleIDs.includes(role.id!)
                            ? "border-red-400 bg-red-50 shadow-md ring-2 ring-red-200"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRoleIDs.includes(role.id!)}
                          onChange={() => handleRoleSelection(role.id!)}
                          className="mt-1 h-5 w-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                        />
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {role.name}
                          </div>
                          {role.description && (
                            <div className="text-xs text-gray-600 leading-relaxed">
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
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => window.history.back()}
                      className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRemoveRoles}
                      disabled={submitting || selectedRoleIDs.length === 0}
                      className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                        submitting || selectedRoleIDs.length === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                          Removing Roles...
                        </>
                      ) : (
                        <>Remove Selected Roles ({selectedRoleIDs.length})</>
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

export default RemoveRoles;
