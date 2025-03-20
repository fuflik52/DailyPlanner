export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
    calendarView: 'month' | 'week' | 'day';
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'overdue';
  tags: string[];
  checklist: { id: string; text: string; completed: boolean }[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  type: 'meeting' | 'deadline' | 'reminder' | 'other';
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
}

export interface TaskStats {
  completed: number;
  pending: number;
  overdue: number;
  total: number;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}