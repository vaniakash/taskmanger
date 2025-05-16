import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!user) {
        router.push('/');
        return;
      }
      
      // If authenticated but not admin, redirect to dashboard
      if (!isAdmin) {
        router.push('/dashboard');
      }
    }
  }, [user, isAdmin, loading, router]);

  // If loading, show nothing or a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated or not admin, return null (will redirect in useEffect)
  if (!user || !isAdmin) {
    return null;
  }

  // If authenticated and admin, show the protected content
  return <>{children}</>;
};

export default AdminRoute; 