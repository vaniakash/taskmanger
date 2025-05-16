import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';
import AdminRoute from '../../utils/AdminRoute';
import { getAllUsers, getAllTasks, makeAdmin } from '../../utils/api';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    userCount: 0,
    taskCount: 0,
    loading: true,
  });
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, tasks] = await Promise.all([
          getAllUsers(),
          getAllTasks(),
        ]);
        
        setStats({
          userCount: users.length,
          taskCount: tasks.length,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load admin statistics');
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };
    
    fetchStats();
  }, []);
  
  const handleMakeAdmin = async () => {
    try {
      await makeAdmin();
      toast.success('First user has been made an admin');
    } catch (error) {
      console.error('Error making admin:', error);
      toast.error('Failed to make admin');
    }
  };

  return (
    <AdminRoute>
      <AdminLayout title="Admin Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            
            {stats.loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Total Users</span>
                  <span className="text-xl font-semibold">{stats.userCount}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Total Tasks</span>
                  <span className="text-xl font-semibold">{stats.taskCount}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/admin/users"
                className="block w-full py-2 px-4 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
              >
                Manage Users
              </Link>
              <Link
                href="/admin/tasks" 
                className="block w-full py-2 px-4 bg-green-100 text-green-800 rounded hover:bg-green-200 transition"
              >
                Manage Tasks
              </Link>
              <button
                onClick={handleMakeAdmin}
                className="block w-full py-2 px-4 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition"
              >
                Make First User Admin
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                This is a development environment. The data will be reset when the server restarts.
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
} 