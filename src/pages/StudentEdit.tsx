import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studentService } from '../services/studentService';
import type { StudentFormData } from '../types/Student';

const EMPTY: StudentFormData = {
  studentId: '',
  fullName: '',
  course: '',
  yearLevel: 1,
  email: '',
  status: 'enrolled',
};

export default function StudentEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<StudentFormData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    studentService
      .getById(id)
      .then((student) => {
        const { studentId, fullName, course, yearLevel, email, status } = student;
        setForm({ studentId, fullName, course, yearLevel, email, status });
      })
      .catch(() => setError('Student not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'yearLevel' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    setError('');
    try {
      await studentService.update(id, form);
      navigate(`/students/${id}`);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to update student. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
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

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Students</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/students/${id}`}>Profile</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm mx-auto" style={{ maxWidth: 600 }}>
        <div className="card-header bg-warning">
          <h5 className="mb-0 fw-bold">
            <i className="bi bi-pencil-square me-2"></i>Edit Student
          </h5>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">Student ID</label>
              <input
                type="text"
                name="studentId"
                className="form-control"
                value={form.studentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-sm-8">
                <label className="form-label fw-semibold">Course</label>
                <input
                  type="text"
                  name="course"
                  className="form-control"
                  value={form.course}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-sm-4">
                <label className="form-label fw-semibold">Year Level</label>
                <select
                  name="yearLevel"
                  className="form-select"
                  value={form.yearLevel}
                  onChange={handleChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map((y) => (
                    <option key={y} value={y}>
                      Year {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Status</label>
              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="enrolled">Enrolled</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-warning"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" />
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-1"></i>Update Student
                  </>
                )}
              </button>
              <Link to={`/students/${id}`} className="btn btn-outline-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
