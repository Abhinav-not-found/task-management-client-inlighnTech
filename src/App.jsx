import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/route/ProtectedRoute";
import PublicRoute from "./components/route/PublicRoute";
import Completed from "./pages/Completed";
import TagComponent from "./components/tag/TagComponent";
import Trash from "./pages/Trash";

function App() {
  return (
    <div className='px-4'>
      <Routes>
        <Route
          path='/'
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/tag/:id'
          element={
            <ProtectedRoute>
              <TagComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path='/completed'
          element={
            <ProtectedRoute>
              <Completed />
            </ProtectedRoute>
          }
        />
        <Route
          path='/trash'
          element={
            <ProtectedRoute>
              <Trash />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
