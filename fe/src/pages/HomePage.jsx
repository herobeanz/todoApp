import Header from '@/components/Header';
import AddTask from '@/components/AddTask';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import React, { useEffect, useState } from 'react'
import api from '@/lib/axios';

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompletedTasksCount(res.data.completedCount);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Error fetching tasks');
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  // Filter tasks
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "all":
        return true;
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
    }
  });

  return (
    
<div className="min-h-screen w-full bg-[#fff9f5] relative">
  {/* Warm Light Apricot & Coral */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 220, 190, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 245, 238, 0.35) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 210, 180, 0.15) 0%, transparent 50%)`,
    }}
  />

      {/* Your Content/Components */}
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="p-6 mx-auto space-y-6 w-full max-w-2xl">
          {/* Header */}
          <Header />

          {/* Add Task */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Stats and Filters */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
          />

          {/* Task List */}
          <TaskList 
          filteredTasks={filteredTasks} 
          filter={filter}
          handleTaskChanged={handleTaskChanged}
          />

          {/* Pagination and Date Filter */}
          <div className="flex flex-col gap-6 justify-between items-center sm:flex-row">
            <TaskListPagination/>
            <DateTimeFilter/>
          </div>

          {/* Footer */}
          <Footer
          activeTasksCount={activeTasksCount}
          completedTasksCount={completedTasksCount}
          />           
        </div>
      </div>
    </div>
  );
}

export default HomePage