import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';
import AdminRoute from '../../utils/AdminRoute';
import { getAllTasks, adminDeleteTask } from '../../utils/api';

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await adminDeleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
        toast.success('Task deleted successfully');
      } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('Failed to delete task');
      }
    }
  };
  
  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800'
    };
    
    const statusDisplay = {
      'pending': 'Pending',
      'in-progress': 'In Progress',
      'completed': 'Completed'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusDisplay[status] || status}
      </span>
    );
  };

  return (
    <AdminRoute>
      <AdminLayout title="Manage Tasks">
        <h2 className="text-xl font-semibold mb-6">Tasks Management</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-12 h-12 border-t-2 border-b-2 border-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map(task => (
                  <tr key={task._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap font-medium">{task.title}</td>
                    <td className="py-4 px-4">
                      <div className="max-w-xs truncate">{task.description || '-'}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {task.user ? (
                        <div>
                          <div>{task.user.name}</div>
                          <div className="text-xs text-gray-500">{task.user.email}</div>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {tasks.length === 0 && (
              <p className="text-center py-4 text-gray-500">No tasks found.</p>
            )}
          </div>
        )}
      </AdminLayout>
    </AdminRoute>
  );
} 