import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../../hooks/useAdminStorage";

export default function AdminIndex() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/admin/dashboard");
    } else {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, setLocation]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}