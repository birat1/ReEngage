import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendAPI } from '../../../constants';

export default function ResetPassword() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Fetch the list of students managed by the admin
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${backendAPI}api/get-students/`, { withCredentials: true });
        const managedStudents = response.data.filter(student => student.managed_by === response.data.admin_id); // Filter students managed by the admin
        setStudents(managedStudents);
      } catch (error) {
        setMessage('Failed to fetch students.');
      }
    };

    fetchStudents();
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendAPI}admin/reset-password/`, {
        student_id: selectedStudentId,
        new_password: newPassword,
      }, { withCredentials: true });

      setMessage(response.data.message || 'Password reset successfully!');
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Reset Student Password</h1>

      {/* Display the list of students */}
      <div className="mb-3">
        <label htmlFor="studentId" className="form-label">Select a Student</label>
        <select
          className="form-select"
          id="studentId"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          required
        >
          <option value="">-- Select a Student --</option>
          {students.map((student) => (
            <option key={student.user.id} value={student.user.id}>
              {student.firstname} {student.surname} (ID: {student.user.id})
            </option>
          ))}
        </select>
      </div>

      {/* Form to enter the new password */}
      <form onSubmit={handleResetPassword}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!selectedStudentId}>
          Reset Password
        </button>
      </form>

      {/* Display success or error messages */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}