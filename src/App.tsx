import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './features/auth/presentation/pages/LoginPage'
import RegisterPage from './features/auth/presentation/pages/RegisterPage'
import ProtectedRoute from './shared/components/layout/ProtectedRoute'
import AdminRoute from './shared/components/layout/AdminRoute'
import Navbar from './shared/components/layout/Navbar'
import BookListPage from './features/books/presentation/pages/BookListPage'

export default function App() {
  return (
    <Routes>
      {/* Route par défaut → /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* AUTH — routes publiques */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* <Route path={''} (
        <ProtectedRoute>
        <Navbar/>
        </ProtectedRoute>
      )/> */}

      {/* LECTEUR — routes protégées */}
      <Route path="/books" element={
        <ProtectedRoute>
          <Navbar/>
          <BookListPage/>
        </ProtectedRoute>
      } />
      <Route path="/loans" element={
        <ProtectedRoute>
          <Navbar/>
          <div>Loans Page — Sprint 3</div>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Navbar/>
          <div>Profile Page</div>
        </ProtectedRoute>
      } />

      {/* ADMIN — routes protégées admin */}
      <Route path="/admin/dashboard" element={
        <AdminRoute>
          <div>Admin Dashboard — Sprint 4</div>
        </AdminRoute>
      } />

    </Routes>
  )
}