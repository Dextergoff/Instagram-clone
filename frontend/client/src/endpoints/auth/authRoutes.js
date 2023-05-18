import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth } from "./user";
function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, verifydone, loading } = useSelector(
    (state) => state.user
  );
  if (verifydone && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}
// fix this going to login page since redux is setting isAuthenticated to false so actions are happening twice
export { ProtectedRoute };
