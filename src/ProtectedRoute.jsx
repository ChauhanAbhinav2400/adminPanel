import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("Protectedtoken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
export default ProtectedRoute