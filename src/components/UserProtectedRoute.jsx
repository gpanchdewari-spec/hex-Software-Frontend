import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

export default function UserProtectedRoute({ children }) {
  const { user, loading } = useUserAuth();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center pt-32">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-blue" />

          <p className="mt-4 font-semibold text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
