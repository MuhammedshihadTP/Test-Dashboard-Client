import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }:any) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
  
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);
  
    return <>{children}</>;
  };
  
  export default ProtectedRoutes;