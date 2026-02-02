import { useState, useEffect } from 'react';
import {
  Plus,
  ListTodo,
  TrendingUp,
  Award,
  Target,
  CheckCircle2,
  Flame,
  BarChart3,
  LogOut,
} from 'lucide-react';
import type { Task, Category, Priority, UserStats } from './types';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import StatsCard from './components/StatsCard';
import AchievementBadge from './components/AchievementBadge';
import ProgressBar from './components/ProgressBar';
import FilterBar from './components/FilterBar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import {
  calculatePoints,
  calculateLevel,
  pointsToNextLevel,
  checkAchievements,
  calculateStreak,
} from './Utils/gamification';
import { api } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<'home' | 'login' | 'signup'>('home');
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'tasks' | 'stats' | 'achievements'>('tasks');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      loadTasks(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const loadTasks = async (authToken: string) => {
    try {
      const data = await api.getTasks(authToken);
      if (!data.error) {
        const formattedTasks = data.map((task: any) => ({
          id: task._id,            // correct mapping
          title: task.title,
          description: task.description,
          category: task.category,
          priority: task.priority,
          dueDate: task.due_date,  // map _date fields
          completed: task.completed,
          createdAt: task.created_at,
          completedAt: task.completed_at,
        }));


        setTasks(formattedTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    setIsAuthenticated(true); // important to switch to dashboard
  };



  const handleSignup = (token: string, user: any) => {
    localStorage.setItem('token', token);
    setUser(user);
  };


  const handleLogout = () => {
    // optional: call backend to invalidate token
    // if you want to ignore errors, just catch them
    if (token) {
      api.logout(token).catch((err) => console.warn('Logout API failed', err));
    }

    // remove local state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setTasks([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // optionally, go to home
    setAuthView('home');
  };


  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => {
    if (!token) return;

    try {
      const payload = {
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        priority: taskData.priority,
        due_date: taskData.dueDate || null,  // backend expects due_date
        completed: taskData.completed || false, // default to false
      };

      const result = await api.createTask(token, payload);

      if (!result.error) {
        const newTask: Task = {
          id: result._id,            // <-- use _id returned from backend
          title: result.title,
          description: result.description,
          category: result.category,
          priority: result.priority,
          dueDate: result.due_date || null,
          completed: result.completed,
          createdAt: result.created_at,
          completedAt: result.completed_at,
        };
        setTasks([newTask, ...tasks]);
      }
      else {
        console.error('Error creating task:', result.error);
      }
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'> & { id: string }) => {
    if (!token) return;

    try {
      const result = await api.updateTask(token, taskData.id, {
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        priority: taskData.priority,
        due_date: taskData.dueDate || null,
        completed: taskData.completed || false,
      });

      if (!result.error) {
        setTasks(tasks.map((t) => (t.id === taskData.id ? {
          ...t,
          ...result,
          dueDate: result.due_date,
          completedAt: result.completed_at,
        } : t)));
        setShowForm(false); // close form after update
        setEditingTask(null);
      } else {
        console.error('Error updating task:', result.error);
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };


  const handleToggleTask = async (id: string) => {
    if (!token) return;

    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const result = await api.updateTask(token, id, {
        completed: !task.completed,
        due_date: task.dueDate,  // map frontend field to backend
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
      });

      if (!result.error) {
        setTasks(
          tasks.map((t) =>
            t.id === id
              ? {
                ...t,
                completed: result.completed,
                completedAt: result.completed_at,
              }
              : t
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!token) return;

    if (confirm('Are you sure you want to delete this task?')) {
      try {
        const result = await api.deleteTask(token, id);

        if (!result.error) {
          setTasks(tasks.filter((task) => task.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (authView === 'home') {
      return (
        <Home
          onGetStarted={() => setAuthView('signup')}
          onLogin={() => setAuthView('login')}
        />
      );
    } else if (authView === 'login') {
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthView('signup')}
        />
      );
    } else {
      return (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }
  }

  const completedTasks = tasks.filter((t) => t.completed);
  const totalPoints = completedTasks.reduce((sum, task) => sum + calculatePoints(task), 0);
  const currentLevel = calculateLevel(totalPoints);
  const pointsForNext = pointsToNextLevel(totalPoints);
  const streak = calculateStreak(completedTasks);
  const achievements = checkAchievements(tasks, completedTasks);

  const stats: UserStats = {
    totalTasks: tasks.length,
    completedTasks: completedTasks.length,
    points: totalPoints,
    streak,
    level: currentLevel,
    achievements,
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;
    if (selectedPriority !== 'all' && task.priority !== selectedPriority) return false;
    if (selectedStatus === 'active' && task.completed) return false;
    if (selectedStatus === 'completed' && !task.completed) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeTasks = filteredTasks.filter((t) => !t.completed);
  const completedFilteredTasks = filteredTasks.filter((t) => t.completed);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-top">
            <div className="header-title">
              <h1>
                <ListTodo className="icon-large" />
                TaskMaster Pro
              </h1>
              <p className="subtitle">Achieve more with gamified task management</p>
            </div>
            <div className="header-actions">
              <div className="user-info">
                <span>Welcome, {user?.email}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout">
                <LogOut className="icon-small" />
                Logout
              </button>
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowForm(true);
                }}
                className="btn-primary"
              >
                <Plus className="icon-small" />
                New Task
              </button>
            </div>
          </div>

          <div className="tabs">
            <button
              onClick={() => setActiveTab('tasks')}
              className={activeTab === 'tasks' ? 'tab active' : 'tab'}
            >
              <ListTodo className="icon-small" />
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={activeTab === 'stats' ? 'tab active' : 'tab'}
            >
              <BarChart3 className="icon-small" />
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={activeTab === 'achievements' ? 'tab active' : 'tab'}
            >
              <Award className="icon-small" />
              Achievements
            </button>
          </div>
        </header>

        <div className="stats-grid">
          <StatsCard
            icon={Target}
            label="Total Tasks"
            value={stats.totalTasks}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatsCard
            icon={CheckCircle2}
            label="Completed"
            value={stats.completedTasks}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            icon={TrendingUp}
            label="Level"
            value={stats.level}
            color="text-amber-600"
            bgColor="bg-amber-100"
          />
          <StatsCard
            icon={Flame}
            label="Day Streak"
            value={stats.streak}
            color="text-red-600"
            bgColor="bg-red-100"
          />
        </div>


        {activeTab === 'tasks' && (
          <>
            <FilterBar
              selectedCategory={selectedCategory}
              selectedPriority={selectedPriority}
              selectedStatus={selectedStatus}
              onCategoryChange={setSelectedCategory}
              onPriorityChange={setSelectedPriority}
              onStatusChange={setSelectedStatus}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="tasks-section">
              {activeTasks.length > 0 && (
                <div className="task-group">
                  <h2 className="section-title">
                    <Target className="icon-medium" />
                    Active Tasks ({activeTasks.length})
                  </h2>
                  <div className="task-list">
                    {activeTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                      />
                    ))}
                  </div>
                </div>
              )}

              {completedFilteredTasks.length > 0 && (
                <div className="task-group">
                  <h2 className="section-title">
                    <CheckCircle2 className="icon-medium" />
                    Completed Tasks ({completedFilteredTasks.length})
                  </h2>
                  <div className="task-list">
                    {completedFilteredTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredTasks.length === 0 && (
                <div className="empty-state">
                  <ListTodo className="icon-empty" />
                  <h3>No tasks found</h3>
                  <p>
                    {searchQuery || selectedCategory !== 'all' || selectedPriority !== 'all'
                      ? 'Try adjusting your filters'
                      : 'Create your first task to get started!'}
                  </p>
                  {!searchQuery && selectedCategory === 'all' && selectedPriority === 'all' && (
                    <button onClick={() => setShowForm(true)} className="btn-primary">
                      Create Task
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <div className="stats-detail">
            <div className="card">
              <h2 className="section-title">
                <TrendingUp className="icon-medium" />
                Your Progress
              </h2>

              <div className="progress-section">
                <div className="level-card">
                  <div className="level-info">
                    <div>
                      <h3>Level {currentLevel}</h3>
                      <p>{totalPoints} total points</p>
                    </div>
                    <div className="level-next">
                      <p className="points-next">{pointsForNext}</p>
                      <p className="points-label">points to level {currentLevel + 1}</p>
                    </div>
                  </div>
                  <ProgressBar current={totalPoints % 100} total={100} color="bg-blue-500" />
                  <ProgressBar current={stats.completedTasks} total={stats.totalTasks} label="Tasks Completed" color="bg-green-500" />
                  <ProgressBar current={achievements.filter(a => a.unlocked).length} total={achievements.length} label="Achievements Unlocked" color="bg-amber-500" />


                </div>

                <div className="stats-breakdown">
                  <div>
                    <h4>Completion Rate</h4>
                    <ProgressBar
                      current={stats.completedTasks}
                      total={stats.totalTasks || 1} // prevent division by zero
                      label="Tasks Completed"
                      color="bg-green-500"
                    />

                  </div>

                  <div>
                    <h4>Category Breakdown</h4>
                    <div className="category-list">
                      {(['work', 'personal', 'health', 'learning', 'other'] as Category[]).map(
                        (cat) => {
                          const count = tasks.filter((t) => t.category === cat).length;
                          return (
                            <div key={cat} className="category-item">
                              <span className="category-name">{cat}</span>
                              <span className="category-count">{count}</span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4>Priority Distribution</h4>
                  <div className="priority-grid">
                    {(['high', 'medium', 'low'] as Priority[]).map((priority) => {
                      const count = tasks.filter((t) => t.priority === priority).length;
                      return (
                        <div key={priority} className={`priority-card priority-${priority}`}>
                          <p className="priority-count">{count}</p>
                          <p className="priority-label">{priority}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="card">
            <h2 className="section-title">
              <Award className="icon-medium" />
              Achievements
            </h2>
            <div className="achievement-progress">
              <ProgressBar
                current={achievements.filter((a) => a.unlocked).length}
                total={achievements.length || 1} // prevent division by zero
                label="Achievements Unlocked"
                color="bg-amber-500"
              />

            </div>
            <div className="achievement-grid">
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {showForm && (
          <TaskForm
            onSubmit={(data) => {
              if (editingTask) {
                handleUpdateTask({ ...data, id: editingTask.id });
              } else {
                handleCreateTask(data);
              }
            }}
            onClose={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
            editTask={editingTask}
          />

        )}
      </div>
    </div>
  );
}

export default App;
