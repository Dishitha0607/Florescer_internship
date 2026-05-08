import React from "react";

const EmployeeDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* TOPBAR */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Employee Dashboard
            </h1>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow">
            + New Idea
          </button>

        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* CARD 1 */}
          <div className="bg-yellow-100 p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Pending
            </h2>

            <p className="text-sm text-gray-500">
              Draft Ideas
            </p>

            <h1 className="text-4xl font-bold mt-4 text-yellow-600">
              12
            </h1>
          </div>

          {/* CARD 2 */}
          <div className="bg-blue-100 p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold text-gray-700">
              Waiting for Approval
            </h2>

            <h1 className="text-4xl font-bold mt-4 text-blue-600">
              8
            </h1>
          </div>

          {/* CARD 3 */}
          <div className="bg-orange-100 p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold text-gray-700">
              Pending {'>'} 7 Days
            </h2>

            <h1 className="text-4xl font-bold mt-4 text-orange-600">
              5
            </h1>
          </div>

          {/* CARD 4 */}
          <div className="bg-green-100 p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold text-gray-700">
              Completed
            </h2>

            <h1 className="text-4xl font-bold mt-4 text-green-600">
              15
            </h1>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;