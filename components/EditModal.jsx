// EditModal.js
import React, { useState, useEffect } from "react";

const EditModal = ({ session, grade, day, tableType, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    subject: "",
    time: "",
    location: "",
  });

  useEffect(() => {
    if (session) {
      setFormData({
        subject: session.subject,
        time: session.time,
        location: session.location,
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedSession = {
      ...session,
      ...formData,
      grade: session.grade, // Ensure grade is included
      day: session.day, // Ensure day is included
      tableType: session.tableType, // Ensure tableType is included
    };

    onUpdate(updatedSession);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
        <h2 className="text-2xl font-bold mb-4">Edit Session</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="time">
              Time
            </label>
            <input
              type="text"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 rounded-md px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default EditModal;
