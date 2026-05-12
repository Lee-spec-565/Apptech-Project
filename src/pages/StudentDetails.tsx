import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';
import type { Student } from '../types/Student';

export default function StudentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    studentService
      .getById(id)
      .then(setStudent)
      .catch(() => setError('Student not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!student) return;
    if (!confirm(`Delete "${student.fullName}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await studentService.remove(student._id);
      navigate('/');
    } catch {
      alert('Failed to delete student.');
      setDeleting(false);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error || !student)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error || 'Student not found.'}</div>
        <Link to="/" className="btn btn-secondary">
          Back to List
        </Link>
      </div>
    );

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Students</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {student.fullName}
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0 fw-bold">{student.fullName}</h4>
            <small className="opacity-75">Student ID: {student.studentId}</small>
          </div>
          <span
            className={`badge fs-6 rounded-pill ${
              student.status === 'enrolled' ? 'bg-success' : 'bg-secondary'
            }`}
          >
            {student.status}
          </span>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="text-muted mb-1 small">Course</p>
              <p className="fw-semibold mb-0">{student.course}</p>
            </div>
            <div className="col-sm-6">
              <p className="text-muted mb-1 small">Year Level</p>
              <p className="fw-semibold mb-0">Year {student.yearLevel}</p>
            </div>
            <div className="col-sm-6">
              <p className="text-muted mb-1 small">Email Address</p>
              <p className="fw-semibold mb-0">{student.email}</p>
            </div>
            <div className="col-sm-6">
              <p className="text-muted mb-1 small">Status</p>
              <p className="fw-semibold mb-0 text-capitalize">{student.status}</p>
            </div>
            <div className="col-sm-6">
              <p className="text-muted mb-1 small">Date Enrolled</p>
              <p className="fw-semibold mb-0">
                {new Date(student.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="col-sm-6">
              <p className="text-muted mb-1 small">Last Updated</p>
              <p className="fw-semibold mb-0">
                {new Date(student.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <Link to={`/students/${student._id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-1"></i> Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <span className="spinner-border spinner-border-sm me-1" />
            ) : (
              <i className="bi bi-trash me-1"></i>
            )}
            Delete
          </button>
          <Link to="/" className="btn btn-outline-secondary ms-auto">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}
