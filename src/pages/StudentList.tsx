import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../services/studentService';
import type { Student } from '../types/Student';

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll();
      setStudents(data);
    } catch {
      setError('Failed to load students. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await studentService.remove(id);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert('Failed to delete student.');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-0">Students</h2>
          <small className="text-muted">{students.length} total record{students.length !== 1 ? 's' : ''}</small>
        </div>
        <Link to="/create" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i> Add Student
        </Link>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, ID, or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-inbox display-4 d-block mb-2"></i>
          {search ? 'No students match your search.' : 'No students yet. Add one to get started!'}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Course</th>
                <th className="text-center">Year</th>
                <th>Email</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student._id}>
                  <td className="fw-semibold text-primary">{student.studentId}</td>
                  <td>{student.fullName}</td>
                  <td>{student.course}</td>
                  <td className="text-center">{student.yearLevel}</td>
                  <td>
                    <small>{student.email}</small>
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge rounded-pill ${
                        student.status === 'enrolled' ? 'bg-success' : 'bg-secondary'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-1 justify-content-center">
                      <Link
                        to={`/students/${student._id}`}
                        className="btn btn-sm btn-outline-primary"
                        title="View"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>
                      <Link
                        to={`/students/${student._id}/edit`}
                        className="btn btn-sm btn-outline-warning"
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                        disabled={deletingId === student._id}
                        onClick={() => handleDelete(student._id, student.fullName)}
                      >
                        {deletingId === student._id ? (
                          <span className="spinner-border spinner-border-sm" />
                        ) : (
                          <i className="bi bi-trash"></i>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
