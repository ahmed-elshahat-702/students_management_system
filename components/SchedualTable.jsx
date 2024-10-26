import React from "react";

const ScheduleTable = ({ scheduleType, tableData, grade, colorGradient }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg pt-6">
      <h2 className="text-3xl font-bold capitalize text-gray-800 mx-6 mb-6">{`${grade} ${scheduleType} schedule`}</h2>
      <div className="overflow-x-auto">
        {tableData && Object.keys(tableData).length > 0 ? (
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className={`bg-gradient-to-r ${colorGradient} text-white`}>
                <th className="px-6 py-4 text-sm font-semibold">Day</th>
                <th className="px-6 py-4 text-sm font-semibold">Subject</th>
                <th className="px-6 py-4 text-sm font-semibold">Time</th>
                <th className="px-6 py-4 text-sm font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tableData).map(([day, daySessions], dayIndex) => (
                <React.Fragment key={day}>
                  {daySessions.map((session, index) => (
                    <tr
                      key={session.id}
                      className={`hover:bg-gray-50 transition-colors duration-200 ${
                        dayIndex % 2 !== 0 ? "bg-gray-100" : ""
                      } ${index === 0 ? "border-t border-gray-200" : ""}`}
                    >
                      {index === 0 && (
                        <td
                          className="px-6 py-4 font-medium text-gray-700 border-r"
                          rowSpan={daySessions.length}
                        >
                          {day}
                        </td>
                      )}
                      <td className="px-6 py-4 text-gray-600">
                        {session.subject}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {session.time}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {session.location}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-red-600 text-xl py-6">
            No {scheduleType} schedule for {grade}
          </p>
        )}
      </div>
    </div>
  );
};

export default ScheduleTable;
