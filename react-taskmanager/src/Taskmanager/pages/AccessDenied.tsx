const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-gray-300 mb-6">You don't have permission to access this resource.</p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
