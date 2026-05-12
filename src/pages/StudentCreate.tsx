import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { studentService } from '../services/studentService';
import type { StudentFormData } from '../types/Student';

const INITIAL: StudentFormData = {
  studentId: '',
  fullName: '',
  course: '',
  yearLevel: 1,
  email: '',
  status: 'enrolled',
};

export default function StudentCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState<StudentFormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    setSubmitting(true);
    setError('');
    try {
      const created = await studentService.create(form);
      navigate(`/students/${created._id}`);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to create student. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Students</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Student
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm mx-auto" style={{ maxWidth: 600 }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 fw-bold">
            <i className="bi bi-person-plus me-2"></i>Add New Student
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
                placeholder="e.g. 2024-00001"
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
                placeholder="e.g. Juan Dela Cruz"
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
                  placeholder="e.g. BSIT"
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
                placeholder="e.g. juan@school.edu"
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
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" />
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-1"></i>Save Student
                  </>
                )}
              </button>
              <Link to="/" className="btn btn-outline-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
