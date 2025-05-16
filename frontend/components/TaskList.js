import { useState } from 'react';
import { toast } from 'react-hot-toast';
import TaskForm from './TaskForm';
import { updateTask, deleteTask } from '../utils/api';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (formData) => {
    try {
      const updatedTask = await updateTask(editingTask._id, formData);
      onTaskUpdated(updatedTask);
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
      console.error(error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await deleteTask(taskId);
        onTaskDeleted(taskId);
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error('Failed to delete task');
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center py-6">No tasks found. Create a new task to get started.</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="card">
          {editingTask && editingTask._id === task._id ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Edit Task</h3>
              <TaskForm
                onSubmit={handleUpdate}
                initialData={task}
                buttonText="Update Task"
              />
              <button
                onClick={() => setEditingTask(null)}
                className="mt-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                  {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
              
              {task.description && (
                <p className="mt-2 text-gray-600">{task.description}</p>
              )}
              
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-danger"
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;

 