import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // If loading, show nothing or a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, return null (will redirect in useEffect)
  if (!user) {
    return null;
  }

  // If authenticated, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute; 