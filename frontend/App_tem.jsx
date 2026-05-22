<Routes>
  <Route path="/" element={<Login />} />
  <Route
    path="/admin"
    element={
      <ProtectedRoute roleRequired="admin">
        <Admin />
      </ProtectedRoute>
    }
  />
  <Route
    path="/employee"
    element={
      <ProtectedRoute roleRequired="employee">
        <Employee />
      </ProtectedRoute>
    }
  />
</Routes>;
