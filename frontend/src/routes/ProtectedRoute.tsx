import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  roles?: string[];
  Component: React.ComponentType;
}

const ProtectedRoute= ({ roles, Component }: ProtectedRouteProps) => {
  const authContext = useAuth();
  const user = authContext?.user;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;