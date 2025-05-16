import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ProtectedRoute from '../utils/ProtectedRoute';
import { getTasks, createTask } from '../utils/api';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const data = await getTasks();
        setTasks(data);
        setError('');
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again.');
        toast.error('Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (formData) => {
    try {
      const newTask = await createTask(formData);
      setTasks([newTask, ...tasks]);
      toast.success('Task created successfully');
      return newTask;
    } catch (error) {
      toast.error('Failed to create task');
      throw error;
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <ProtectedRoute>
      <Layout title="Dashboard">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Tasks</h1>

          <div className="mb-8">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
              <TaskForm onSubmit={handleCreateTask} />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-12 h-12 border-t-2 border-b-2 border-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">
              {error}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Task List</h2>
              <TaskList
                tasks={tasks}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
} 