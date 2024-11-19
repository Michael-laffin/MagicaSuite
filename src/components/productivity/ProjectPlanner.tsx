import React, { useState, useEffect } from 'react';

const ProjectPlanner: React.FC = () => {
  interface Task {
    id: number;
    name: string;
    completed: boolean;
  }

  interface Project {
    id: number;
    name: string;
    tasks: Task[];
    deadline?: string;
    teamMembers?: string[];
  }

  const [newProjectName, setNewProjectName] = useState('');
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (newProjectName.trim() !== '') {
      const newProj: Project = {
        id: Date.now(),
        name: newProjectName.trim(),
        tasks: [],
        teamMembers: [],
      };
      setProjects([...projects, newProj]);
      setNewProjectName('');
    }
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const addTaskToProject = () => {
    if (newTaskName.trim() !== '' && selectedProject) {
      const newTask: Task = {
        id: Date.now(),
        name: newTaskName.trim(),
        completed: false,
      };
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === selectedProject.id ? { ...proj, tasks: [...proj.tasks, newTask] } : proj
        )
      );
      setNewTaskName('');
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    if (selectedProject) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === selectedProject.id
            ? {
                ...proj,
                tasks: proj.tasks.map((task) =>
                  task.id === taskId ? { ...task, completed: !task.completed } : task
                ),
              }
            : proj
        )
      );
    }
  };

  const addTeamMember = () => {
    if (newTeamMember.trim() !== '' && selectedProject) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === selectedProject.id
            ? {
                ...proj,
                teamMembers: [...(proj.teamMembers || []), newTeamMember.trim()],
              }
            : proj
        )
      );
      setNewTeamMember('');
    }
  };

  const setProjectDeadline = (deadline: string) => {
    if (selectedProject) {
      setProjects((prev) =>
        prev.map((proj) => (proj.id === selectedProject.id ? { ...proj, deadline } : proj))
      );
    }
  };

  const calculateProgress = (project: Project) => {
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter((task) => task.completed).length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  return (
    <div className="space-y-4">
      {/* Add New Project */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="New project..."
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addProject();
          }}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
        <button
          onClick={addProject}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
        >
          Create
        </button>
      </div>

      {/* Projects List */}
      {selectedProject ? (
        <div className="space-y-4">
          {/* Back Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
          >
            ← Back to Projects
          </button>

          {/* Project Details */}
          <h3 className="text-xl font-semibold text-white">{selectedProject.name}</h3>
          <p className="text-sm text-emerald-100/70">
            Progress: {calculateProgress(selectedProject).toFixed(0)}%
          </p>

          {/* Deadline */}
          <div className="flex items-center space-x-2">
            <label className="text-white">Deadline:</label>
            <input
              type="date"
              value={selectedProject.deadline || ''}
              onChange={(e) => setProjectDeadline(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
            />
          </div>

          {/* Team Members */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white">Team Members</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add team member..."
                value={newTeamMember}
                onChange={(e) => setNewTeamMember(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
              />
              <button
                onClick={addTeamMember}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap">
              {(selectedProject.teamMembers || []).map((member, index) => (
                <span
                  key={index}
                  className="mr-2 mb-2 px-3 py-1 bg-emerald-600 text-white rounded-full"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white">Tasks</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="New task..."
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTaskToProject();
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
              />
              <button
                onClick={addTaskToProject}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
              >
                Add
              </button>
            </div>
            <div className="space-y-1 max-h-[200px] overflow-y-auto">
              {selectedProject.tasks.length === 0 ? (
                <p className="text-gray-400">No tasks added yet.</p>
              ) : (
                selectedProject.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="accent-emerald-500"
                      />
                      <span
                        className={`text-white ${
                          task.completed ? 'line-through text-gray-500' : ''
                        }`}
                      >
                        {task.name}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.length === 0 ? (
            <p className="text-center text-gray-400">No projects available.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                onClick={() => selectProject(project)}
                className="p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10 cursor-pointer hover:bg-gray-800/50"
              >
                <h4 className="text-white font-semibold">{project.name}</h4>
                <p className="text-sm text-emerald-100/70">
                  Progress: {calculateProgress(project).toFixed(0)}%
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectPlanner;
