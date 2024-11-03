import React, { useState } from "react";
import {
  FaEdit,
  FaSave,
  FaPlus,
  FaTrash,
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarDay,
  FaBook,
  FaClock,
  FaCog,
} from "react-icons/fa";
import { useIsMobile } from "@/hooks/use-mobile";

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
  isModerator,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(tableData || {});
  const isMobile = useIsMobile();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedData(tableData || {});
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
    <div className="bg-background shadow-lg rounded-lg p-2 sm:p-6 mb-8">
      <h2 className="text-xl sm:text-2xl font-bold capitalize mb-4 text-gray-900 dark:text-gray-100">{`${grade} ${scheduleType} Schedule`}</h2>
      <div className="flex justify-end mb-4 space-x-2">
        {isModerator &&
          (isEditing ? (
            <div
              className={`flex ${
                isMobile ? "flex-col space-y-2" : "space-x-2"
              }`}
            >
              <button
                onClick={handleSaveClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                disabled={
                  JSON.stringify(tableData) === JSON.stringify(editedData)
                }
              >
                <FaSave className="mr-2" />
                {isMobile ? "Save" : "Save Changes"}
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center justify-center text-sm sm:text-base"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
              {Object.keys(editedData).length < 7 && (
                <button
                  onClick={addNewDay}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center justify-center text-sm sm:text-base"
                >
                  <FaPlus className="mr-2" />
                  {isMobile ? "New Day" : "Add New Day"}
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 sm:px-4 rounded flex items-center text-sm sm:text-base"
            >
              <FaEdit className="mr-2" />
              Edit Schedule
            </button>
          ))}
      </div>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        {Object.keys(editedData).length > 0 ? (
          <table className="min-w-full table-auto text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className={`bg-gradient-to-r ${colorGradient}`}>
                <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <FaCalendarDay />
                    <span>Day</span>
                  </div>
                </th>
                <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <FaBook />
                    <span>Subject</span>
                  </div>
                </th>
                <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>Time</span>
                  </div>
                </th>
                {!isMobile && (
                  <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt />
                      <span>Location</span>
                    </div>
                  </th>
                )}
                {isEditing && isModerator && (
                  <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <FaCog />
                      <span>Actions</span>
                    </div>
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
                            className="px-2 sm:px-6 py-2 sm:py-4 font-medium border-r text-gray-900 dark:text-gray-100 space-x-2 sm:space-x-4"
                            rowSpan={daySessions.length}
                          >
                            {isEditing && isModerator && (
                              <button
                                onClick={() => deleteDay(day)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete Day"
                              >
                                <FaTrash className="text-xs sm:text-sm" />
                              </button>
                            )}
                            <span className="font-semibold text-xs sm:text-sm">
                              {isMobile ? day.slice(0, 3) : day}
                            </span>
                          </td>
                        )}
                        <td className="px-2 sm:px-6 py-2 sm:py-4 text-gray-900 dark:text-gray-100">
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
                              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
                            />
                          ) : (
                            <div className="text-xs sm:text-sm">
                              {session.subject}
                            </div>
                          )}
                          {isMobile && !isEditing && session.location && (
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <FaMapMarkerAlt className="text-red-500" />
                              <span>{session.location}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 text-gray-900 dark:text-gray-100">
                          {isEditing ? (
                            <input
                              type="text"
                              value={session.time}
                              onChange={(e) =>
                                handleChange(day, index, "time", e.target.value)
                              }
                              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
                            />
                          ) : (
                            <div className="text-xs sm:text-sm">
                              {session.time}
                            </div>
                          )}
                        </td>
                        {isMobile && isEditing && (
                          <td className="px-2 sm:px-6 py-2 sm:py-4 text-gray-900 dark:text-gray-100">
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
                              placeholder="Location"
                              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs"
                            />
                          </td>
                        )}
                        {!isMobile && (
                          <td className="px-2 sm:px-6 py-2 sm:py-4 text-gray-900 dark:text-gray-100">
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
                                className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-sm"
                              />
                            ) : (
                              <div className="text-xs sm:text-sm">
                                {session.location}
                              </div>
                            )}
                          </td>
                        )}
                        {isEditing && isModerator && (
                          <td className="px-2 sm:px-6 py-2 sm:py-4 space-x-2 sm:space-x-4 flex items-center">
                            <button
                              onClick={() => deleteSession(day, index)}
                              className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded flex items-center text-xs sm:text-sm"
                            >
                              <FaTrash className="mr-1 sm:mr-2" />
                              {!isMobile && "Delete"}
                            </button>
                            {index === daySessions.length - 1 && (
                              <button
                                onClick={() => addNewSession(day)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm"
                              >
                                {isMobile ? "+" : "Add"}
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
          <p className="text-center text-red-600 text-sm sm:text-xl py-6">
            No {scheduleType} schedule for {grade}
          </p>
        )}
      </div>
    </div>
  );
};

export default ScheduleTable;
