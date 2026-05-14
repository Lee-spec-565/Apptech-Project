import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentList from './pages/StudentList';
import StudentDetails from './pages/StudentDetails';
import StudentCreate from './pages/StudentCreate';
import StudentEdit from './pages/StudentEdit';

export default function App() {
  return (
    <BrowserRouter basename="/Apptech-Project/">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/create" element={<StudentCreate />} />
          <Route path="/students/:id/edit" element={<StudentEdit />} />
          <Route
            path="*"
            element={
              <div className="container py-5 text-center">
                <h2 className="text-muted">404 — Page not found</h2>
              </div>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
