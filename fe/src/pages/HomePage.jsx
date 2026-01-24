import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

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

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  // Adjust page if current page is out of bounds
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    } else if (page < 1 && totalPages > 0) {
      setPage(1);
    }
  }, [totalPages, page]);

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
          filteredTasks={visibleTasks} 
          filter={filter}
          handleTaskChanged={handleTaskChanged}
          />

          {/* Pagination and Date Filter */}
          <div className="flex flex-col gap-6 justify-between items-center sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
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