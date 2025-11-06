
export type TaskPriority = 'low' | 'medium' | 'high' | 'none';

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  tags?: string[];
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  tags?: string[];
  completed?: boolean;
}

export interface TaskFilters {
  status?: 'all' | 'active' | 'completed';
  priority?: TaskPriority | 'all';
  tags?: string[];
  searchQuery?: string;
}

export interface TaskStoreState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
}