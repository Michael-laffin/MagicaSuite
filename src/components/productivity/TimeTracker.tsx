import React, { useState, useEffect } from 'react';

const TimeTracker: React.FC = () => {
  interface TimeEntry {
    id: number;
    taskName: string;
    startTime: number;
    endTime?: number;
    duration?: number;
  }

  const [entries, setEntries] = useState<TimeEntry[]>(() => {
    const saved = localStorage.getItem('timeEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentTask, setCurrentTask] = useState('');
  const [isTracking, setIsTracking] = useState<{ [key: number]: boolean }>({});
  const [startTimes, setStartTimes] = useState<{ [key: number]: number }>({});
  const [editEntry, setEditEntry] = useState<TimeEntry | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TimeEntry | null>(null);

  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(entries));
  }, [entries]);

  // Handle tracking multiple tasks
  const startTracking = () => {
    if (currentTask.trim() === '') return;
    const newEntry: TimeEntry = {
      id: Date.now(),
      taskName: currentTask.trim(),
      startTime: Date.now(),
    };
    setEntries([newEntry, ...entries]);
    setIsTracking({ ...isTracking, [newEntry.id]: true });
    setStartTimes({ ...startTimes, [newEntry.id]: newEntry.startTime });
    setCurrentTask('');
  };

  const stopTracking = (id: number) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry || !isTracking[id] || !startTimes[id]) return;

    const endTime = Date.now();
    const duration = Math.floor((endTime - startTimes[id]) / 1000); // in seconds

    const updatedEntry: TimeEntry = {
      ...entry,
      endTime,
      duration: (entry.duration || 0) + duration,
    };

    setEntries(entries.map((e) => (e.id === id ? updatedEntry : e)));
    setIsTracking({ ...isTracking, [id]: false });
    setStartTimes({ ...startTimes, [id]: 0 });
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleEdit = (entry: TimeEntry) => {
    setEditEntry(entry);
  };

  const saveEdit = () => {
    if (!editEntry) return;
    setEntries(entries.map((e) => (e.id === editEntry.id ? editEntry : e)));
    setEditEntry(null);
  };

  const handleDelete = (entry: TimeEntry) => {
    setConfirmDelete(entry);
  };

  const confirmDeletion = () => {
    if (!confirmDelete) return;
    setEntries(entries.filter((e) => e.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  const exportCSV = () => {
    const header = ['Task Name', 'Start Time', 'End Time', 'Duration (HH:MM:SS)'];
    const rows = entries.map((e) => [
      e.taskName,
      new Date(e.startTime).toLocaleString(),
      e.endTime ? new Date(e.endTime).toLocaleString() : 'In Progress',
      e.duration ? formatTime(e.duration) : 'In Progress',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [header, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = 'time_entries.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate total time per task
  const totalTimePerTask = entries.reduce<{ [key: string]: number }>((acc, entry) => {
    const task = entry.taskName;
    acc[task] = (acc[task] || 0) + (entry.duration || 0);
    return acc;
  }, {});

  return (
    <div className="space-y-6 p-4">
      {/* Current Task Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter task name..."
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          disabled={false}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
        <button
          onClick={startTracking}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors"
        >
          Start
        </button>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Total Time Summary */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">Total Time per Task</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {Object.keys(totalTimePerTask).length === 0 ? (
            <p className="text-gray-400">No tasks recorded.</p>
          ) : (
            Object.entries(totalTimePerTask).map(([task, total]) => (
              <div
                key={task}
                className="p-3 rounded-lg bg-gray-800/30 border border-emerald-500/10 flex justify-between items-center"
              >
                <span className="text-white">{task}</span>
                <span className="text-emerald-100/70">{formatTime(total)}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Current Timers */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Active Timers</h2>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {entries.filter((e) => isTracking[e.id]).length === 0 ? (
            <p className="text-gray-400">No active timers.</p>
          ) : (
            entries
              .filter((e) => isTracking[e.id])
              .map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10"
                >
                  <div>
                    <p className="text-white">{entry.taskName}</p>
                    <div className="text-sm text-emerald-100/70">
                      {formatTime(
                        Math.floor((Date.now() - startTimes[entry.id]) / 1000) +
                          (entry.duration || 0)
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => stopTracking(entry.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors text-sm"
                    >
                      Stop
                    </button>
                    <button
                      onClick={() => handleEdit(entry)}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-white transition-colors text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Time Entries List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Time Entries</h2>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {entries.length === 0 ? (
            <p className="text-center text-gray-400">No time entries yet.</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10"
              >
                <div>
                  <p className="text-white">{entry.taskName}</p>
                  <p className="text-sm text-emerald-100/70">Duration: {formatTime(entry.duration || 0)}</p>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="text-sm text-gray-400">
                    {new Date(entry.startTime).toLocaleTimeString()} -{' '}
                    {entry.endTime ? new Date(entry.endTime).toLocaleTimeString() : 'In Progress'}
                  </div>
                  <button
                    onClick={() => handleEdit(entry)}
                    className="px-2 py-1 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-white transition-colors text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editEntry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-white mb-4">Edit Task</h3>
            <input
              type="text"
              value={editEntry.taskName}
              onChange={(e) => setEditEntry({ ...editEntry, taskName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditEntry(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete the task "{confirmDelete.taskName}"?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletion}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTracker;
