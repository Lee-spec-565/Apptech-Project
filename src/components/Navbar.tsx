import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Student Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link${pathname === '/' ? ' active fw-semibold' : ''}`}
                to="/"
              >
                All Students
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${pathname === '/create' ? ' active fw-semibold' : ''}`}
                to="/create"
              >
                Add Student
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
