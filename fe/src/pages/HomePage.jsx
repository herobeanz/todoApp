import Header from '@/components/Header';
import AddTask from '@/components/AddTask';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import React from 'react'

const HomePage = () => {
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
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu Trang */}
          <Header />

          {/* Tạo Nhiệm Vụ */}
          <AddTask 
          // handleNewTaskAdded={handleTaskChanged} 
          />

          {/* Thống Kê và Bộ lọc */}
          <StatsAndFilters
            // filter={filter}
            // setFilter={setFilter}
            // activeTasksCount={activeTaskCount}
            // completedTasksCount={completeTaskCount}
          />

          {/* Danh Sách Nhiệm Vụ */}
          <TaskList
            // filteredTasks={visibleTasks}
            // filter={filter}
            // handleTaskChanged={handleTaskChanged}
          />

          {/* Phân Trang và Lọc Theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              // handleNext={handleNext}
              // handlePrev={handlePrev}
              // handlePageChange={handlePageChange}
              // page={page}
              // totalPages={totalPages}
            />
            <DateTimeFilter
              // dateQuery={dateQuery}
              // setDateQuery={setDateQuery}
            />
          </div>

          {/* Chân Trang */}
          <Footer
            // activeTasksCount={activeTaskCount}
            // completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage