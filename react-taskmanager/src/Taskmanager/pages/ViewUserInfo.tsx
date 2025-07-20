import { useParams } from "react-router-dom";
import { getUserById } from "../services/users.service";
import type { UserProfile } from "../types";
import React from "react";

const ViewUserInfo = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [userNotFound, setUserNotFound] = React.useState(false);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userResponse = await getUserById(Number(userId));
        setUserData(userResponse.data || userResponse);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
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
          <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
          <p className="text-gray-300 mb-6">The user you're looking for doesn't exist.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
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
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">User Details</h1>
                  <p className="text-blue-100 mt-1">View user information and permissions</p>
                </div>
              </div>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg"
              >
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>

          {/* User Information */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-600">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          User ID
                        </label>
                        <div className="bg-gray-700 px-4 py-3 rounded-lg border border-gray-600">
                          <span className="text-lg font-mono text-white">#{userData.id}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Full Name
                        </label>
                        <div className="bg-gray-700 px-4 py-3 rounded-lg border border-gray-600">
                          <span className="text-lg text-white">{userData.fullName || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="bg-gray-700 px-4 py-3 rounded-lg border border-gray-600 flex items-center gap-2">
                          <span className="text-lg text-white">{userData.username}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roles Section */}
              <div>
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-600">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    User Roles
                  </h2>

                  <div className="space-y-3">
                    {userData.roles && userData.roles.length > 0 ? (
                      userData.roles.map((role) => (
                        <div
                          key={role.id}
                          className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-white">{role.name}</h3>
                              {role.description && (
                                <p className="text-sm text-gray-300 mt-1">{role.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-300 font-medium">No roles assigned</p>
                        <p className="text-gray-400 text-sm mt-1">
                          This user has no roles in the system
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={() => window.history.back()}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-700"
              >
                Back to Users
              </button>
              <button
                onClick={() => (window.location.href = `/update-user/${userData.id}`)}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserInfo;
