import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './features/auth/presentation/pages/LoginPage'
import RegisterPage from './features/auth/presentation/pages/RegisterPage'
import BookListPage from './features/books/presentation/pages/BookListPage'

export default function App() {
  return (
    <Routes>
      {/* Redirection par défaut */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Books */}
      <Route path="/books" element={<BookListPage />} />
    </Routes>
  )
}