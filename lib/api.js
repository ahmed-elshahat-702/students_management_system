import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

// Login
export const login = async (username, password, role) => {
  try {
    const response = await api.post("/api/login", { username, password, role });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};

// Authorization
export const authorize = async () => {
  try {
    const response = await api.get("/api/authorization");
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};

export const getStudent = async (username) => {
  try {
    const response = await api.get(`/api/student?username=${username}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};

// Add Student
export const addStudent = async (studentData) => {
  try {
    const response = await api.post("/api/student", studentData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Delete Student
export const deleteStudent = async (username) => {
  try {
    const response = await api.delete(`/api/student?username=${username}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Get All Students
export const getAllStudents = async () => {
  try {
    const response = await api.get("/api/students");
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};

// Get All Teachers
export const getAllTeachers = async () => {
  try {
    const response = await api.get("/api/teachers");
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// Delete Teacher
export const deleteTeacher = async (username) => {
  try {
    const response = await api.delete(`/api/teacher?username=${username}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await api.post("/api/logout");
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
