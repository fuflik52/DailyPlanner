import { create } from 'zustand';
import { User, Task, Event } from '../types';

interface AppState {
  user: User | null;
  tasks: Task[];
  events: Event[];
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  notification: { message: string; type: 'success' | 'error' | 'info' | null } | null;
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setNotification: (notification: { message: string; type: 'success' | 'error' | 'info' } | null) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}

// Initialize user from local storage
const getInitialUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Initialize theme from local storage or from user preferences
const getInitialTheme = (): 'light' | 'dark' => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) return storedTheme as 'light' | 'dark';

  const user = getInitialUser();
  if (user?.preferences?.theme) return user.preferences.theme;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useStore = create<AppState>((set) => ({
  user: getInitialUser(),
  tasks: [],
  events: [],
  isLoading: false,
  error: null,
  theme: getInitialTheme(),
  notification: null,
  setUser: (user) => set({ user }),
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
    // Update user preferences if user exists
    set((state) => {
      if (!state.user) return state;
      const updatedUser = {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          theme
        }
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
  setNotification: (notification) => set({ notification }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== taskId),
  })),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) => set((state) => ({
    events: state.events.map((e) => (e.id === event.id ? event : e)),
  })),
  deleteEvent: (eventId) => set((state) => ({
    events: state.events.filter((e) => e.id !== eventId),
  })),
}));