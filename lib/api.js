import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

// Login
export const login = async (usernameOrEmail, password, role) => {
  try {
    const response = await api.post("/api/login", {
      usernameOrEmail,
      password,
      role,
    });
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
    const response = await api.post("/api/students", studentData, {
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
export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/api/students/${id}`);
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

//get all grades tables
export const getAllGradesTables = async () => {
  try {
    const response = await api.get("/api/students/all-grades-tables");
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};

//get specific grade tables

export const getSpecificGradeTables = async (level) => {
  try {
    const response = await api.get(`/api/student/grade-${level}-tables`);
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

// Get Student by ID
export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/api/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};

// Update Student
export const updateStudent = async (id, data) => {
  try {
    const response = await api.put(`/api/students/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};

export const updateGradeTable = async (grade, updatedTable) => {
  try {
    const response = await api.post("/api/students/update-grade-table", {
      grade,
      updatedTable,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error;
  }
};
