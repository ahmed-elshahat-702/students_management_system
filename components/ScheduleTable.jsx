import React, { useState } from "react";
import { FaEdit, FaSave, FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ScheduleTable = ({
  scheduleType,
  tableData,
  grade,
  colorGradient,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(tableData || {});

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedData(tableData || {}); // Ensure tableData is an object
    setIsEditing(false);
  };

  const handleChange = (day, index, field, value) => {
    setEditedData((prev) => {
      const updatedDaySessions = prev[day].map((session, i) =>
        i === index ? { ...session, [field]: value } : session
      );
      return { ...prev, [day]: updatedDaySessions };
    });
  };

  const addNewDay = () => {
    const newDay = days.find((day) => !editedData[day]);
    if (newDay) {
      setEditedData((prev) => ({
        ...prev,
        [newDay]: [{ subject: "", time: "", location: "" }],
      }));
    }
  };

  const addNewSession = (day) => {
    setEditedData((prev) => ({
      ...prev,
      [day]: [...prev[day], { subject: "", time: "", location: "" }],
    }));
  };

  const deleteSession = (day, index) => {
    setEditedData((prev) => {
      const updatedDaySessions = prev[day].filter((_, i) => i !== index);
      return { ...prev, [day]: updatedDaySessions };
    });
  };

  const deleteDay = (day) => {
    setEditedData((prev) => {
      const { [day]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className="bg-background shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold capitalize mb-4 text-gray-900 dark:text-gray-100">{`${grade} ${scheduleType} Schedule`}</h2>
      <div className="flex justify-end mb-4 space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                JSON.stringify(tableData) === JSON.stringify(editedData)
              }
            >
              <FaSave className="mr-2" />
              Save Changes
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
            {Object.keys(editedData).length < 7 && (
              <button
                onClick={addNewDay}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <FaPlus className="mr-2" />
                Add New Day
              </button>
            )}
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Schedule
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        {Object.keys(editedData).length > 0 ? (
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className={`bg-gradient-to-r ${colorGradient}`}>
                <th className="px-6 py-3 text-sm font-semibold text-white">
                  Day
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-white">
                  Subject
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-white">
                  Time
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-white">
                  Location
                </th>
                {isEditing && (
                  <th className="px-6 py-3 text-sm font-semibold text-white">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.entries(editedData).map(
                ([day, daySessions], dayIndex) => (
                  <React.Fragment key={day}>
                    {daySessions.map((session, index) => (
                      <tr
                        key={`${day}-${index}`}
                        className={`transition-colors duration-200 max-w-full ${
                          dayIndex % 2 !== 0
                            ? "hover:bg-secondary/20 bg-gray-50 bg-secondary"
                            : "hover:bg-secondary/20"
                        }`}
                      >
                        {index === 0 && (
                          <td
                            className="px-6 py-4 font-medium border-r text-gray-900 dark:text-gray-100 space-x-4"
                            rowSpan={daySessions.length}
                          >
                            {isEditing && (
                              <button
                                onClick={() => deleteDay(day)}
                                className="ml-2 text-red-600 hover:text-red-800"
                                title="Delete Day"
                              >
                                <FaTrash />
                              </button>
                            )}
                            <span className="font-semibold">{day}</span>
                          </td>
                        )}
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                          {isEditing ? (
                            <input
                              type="text"
                              value={session.subject}
                              onChange={(e) =>
                                handleChange(
                                  day,
                                  index,
                                  "subject",
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                          ) : (
                            session.subject
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                          {isEditing ? (
                            <input
                              type="text"
                              value={session.time}
                              onChange={(e) =>
                                handleChange(day, index, "time", e.target.value)
                              }
                              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                          ) : (
                            session.time
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                          {isEditing ? (
                            <input
                              type="text"
                              value={session.location}
                              onChange={(e) =>
                                handleChange(
                                  day,
                                  index,
                                  "location",
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                          ) : (
                            session.location
                          )}
                        </td>
                        {isEditing && (
                          <td className="px-6 py-4 space-x-4 flex items-center text-sm">
                            <button
                              onClick={() => deleteSession(day, index)}
                              className="bg-red-600 hover:bg-red-800 flex items-center gap-4 text-white font-bold py-1 px-2 rounded"
                            >
                              <FaTrash />
                              Delete Session
                            </button>
                            {index === daySessions.length - 1 && (
                              <button
                                onClick={() => addNewSession(day)}
                                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                              >
                                Add Session
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )}
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
