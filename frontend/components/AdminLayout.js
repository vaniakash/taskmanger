import Layout from './Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminLayout = ({ children, title }) => {
  const router = useRouter();
  
  const isActivePath = (path) => {
    return router.pathname === path;
  };
  
  return (
    <Layout title={title || 'Admin Dashboard'}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="flex border-b mb-6">
            <Link
              href="/admin"
              className={`px-4 py-2 mr-2 ${
                isActivePath('/admin')
                  ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/admin/users"
              className={`px-4 py-2 mr-2 ${
                isActivePath('/admin/users')
                  ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Users
            </Link>
            <Link
              href="/admin/tasks"
              className={`px-4 py-2 mr-2 ${
                isActivePath('/admin/tasks')
                  ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Tasks
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default AdminLayout; 