import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createRole } from "../services/roles.service";

interface ICreateRoleForm {
  code: string;
  name: string;
  description: string;
}

const schema = yup.object().shape({
  code: yup.string().required("Code is required"),
  name: yup.string().required("Name is required"),
  description: yup.string().optional().default(""),
});

const CreateRole = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICreateRoleForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ICreateRoleForm> = async (data: ICreateRoleForm) => {
    try {
      await createRole(data);
      window.history.back();
    } catch (error) {
      console.error("Failed to create role:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl"></div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Create New Role</h1>
                  <p className="text-green-100 mt-1">Add a new role to the system</p>
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

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Code Field */}
              <div>
                <label htmlFor="code" className="block text-sm font-semibold text-gray-300 mb-2">
                  Role Code <span className="text-red-400">*</span>
                </label>
                <input
                  id="code"
                  {...register("code")}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-white placeholder-gray-400 ${
                    errors.code ? "border-red-500 bg-red-900/20" : "border-gray-600"
                  }`}
                  placeholder="e.g., ADMIN, USER, MANAGER"
                />
                {errors.code && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <span className="font-medium">⚠</span>
                    {errors.code.message}
                  </p>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Role Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-white placeholder-gray-400 ${
                    errors.name ? "border-red-500 bg-red-900/20" : "border-gray-600"
                  }`}
                  placeholder="e.g., Administrator, Regular User, Manager"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <span className="font-medium">⚠</span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="Describe the role's purpose and permissions..."
                />
                <p className="mt-2 text-sm text-gray-400">
                  Provide a brief description of what this role can do (optional)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex-1 sm:flex-none px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>Create Role</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
