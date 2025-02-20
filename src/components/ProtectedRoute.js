import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log('=====>user',user);
  
  const isGuest = sessionStorage.getItem("guest");
  return user  ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
