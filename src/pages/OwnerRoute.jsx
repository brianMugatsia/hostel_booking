import { Navigate } from "react-router-dom";

function OwnerRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "OWNER") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default OwnerRoute;
