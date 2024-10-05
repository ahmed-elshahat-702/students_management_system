import React from "react";

const ExamsTable = ({ student }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded overflow-hidden">
          {/* Tables Section */}
          <div className="p-8">
            {/* Exams Table Table */}
            <h2
              id="personal-info"
              className="text-2xl font-semibold mb-6 border-b pb-2"
            >
              Exams Table
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsTable;
