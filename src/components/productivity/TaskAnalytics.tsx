import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TaskAnalytics: React.FC = () => {
  interface TaskStats {
    completedTasks: number;
    totalTasks: number;
    tasksPerDay: { [date: string]: number };
    completionPerDay: { [date: string]: number };
    categories: { [category: string]: number };
  }

  const [stats, setStats] = useState<TaskStats>({
    completedTasks: 0,
    totalTasks: 0,
    tasksPerDay: {},
    completionPerDay: {},
    categories: {},
  });

  useEffect(() => {
    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    analyzeTaskData(tasks);
  }, []);

  const analyzeTaskData = (tasks: any[]) => {
    const taskStats: TaskStats = {
      completedTasks: 0,
      totalTasks: tasks.length,
      tasksPerDay: {},
      completionPerDay: {},
      categories: {},
    };

    tasks.forEach((task) => {
      // Count completed tasks
      if (task.completed) {
        taskStats.completedTasks++;
      }

      // Group by creation date (fallback to today for old data)
      const creationDate = task.createdAt 
        ? new Date(task.createdAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      taskStats.tasksPerDay[creationDate] = (taskStats.tasksPerDay[creationDate] || 0) + 1;

      // Group by completion date (only if task is completed)
      if (task.completed && task.completedAt) {
        const completionDate = new Date(task.completedAt).toISOString().split('T')[0];
        taskStats.completionPerDay[completionDate] =
          (taskStats.completionPerDay[completionDate] || 0) + 1;
      }

      // Group by category
      if (task.category) {
        taskStats.categories[task.category] =
          (taskStats.categories[task.category] || 0) + 1;
      }
    });

    setStats(taskStats);
  };

  const getLastNDays = (n: number) => {
    const dates = [];
    for (let i = n - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const taskTrendsData: ChartData<'line'> = {
    labels: getLastNDays(7),
    datasets: [
      {
        label: 'Tasks Created',
        data: getLastNDays(7).map((date) => stats.tasksPerDay[date] || 0),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Tasks Completed',
        data: getLastNDays(7).map((date) => stats.completionPerDay[date] || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const categoryData: ChartData<'bar'> = {
    labels: Object.keys(stats.categories),
    datasets: [
      {
        label: 'Tasks per Category',
        data: Object.values(stats.categories),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-gray-800/30 border border-emerald-500/10">
          <h3 className="text-lg font-semibold text-white">Total Tasks</h3>
          <p className="text-2xl text-emerald-400">{stats.totalTasks}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-800/30 border border-emerald-500/10">
          <h3 className="text-lg font-semibold text-white">Completed Tasks</h3>
          <p className="text-2xl text-emerald-400">{stats.completedTasks}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-800/30 border border-emerald-500/10">
          <h3 className="text-lg font-semibold text-white">Completion Rate</h3>
          <p className="text-2xl text-emerald-400">
            {stats.totalTasks
              ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
              : 0}
            %
          </p>
        </div>
      </div>

      {/* Task Trends Chart */}
      <div className="p-4 rounded-lg bg-gray-800/30 border border-emerald-500/10">
        <h3 className="text-lg font-semibold text-white mb-4">Task Trends (Last 7 Days)</h3>
        <Line data={taskTrendsData} options={chartOptions} />
      </div>

      {/* Category Distribution Chart */}
      <div className="p-4 rounded-lg bg-gray-800/30 border border-emerald-500/10">
        <h3 className="text-lg font-semibold text-white mb-4">Tasks by Category</h3>
        <Bar data={categoryData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TaskAnalytics;
