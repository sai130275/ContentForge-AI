/**
 * Core type definitions for ContentForge AI
 */

export interface User {
  id: string;
  email: string;
  displayName: string;
  githubConnected: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  task: string;
  durationMin: number;
  errors: number;
  context?: Record<string, unknown>;
  source: "manual" | "github" | "vscode";
  timestamp: string;
}

export interface Insight {
  id: string;
  userId: string;
  date: string;
  bottlenecks: Bottleneck[];
  insights: InsightItem[];
  toolSuggestions: ToolSuggestion[];
  createdAt: string;
}

export interface Bottleneck {
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
  occurrences: number;
}

export interface InsightItem {
  category: string;
  message: string;
  actionable: boolean;
}

export interface ToolSuggestion {
  tool: string;
  reason: string;
  priority: "low" | "medium" | "high";
}

export interface Plan {
  id: string;
  userId: string;
  date: string;
  tomorrowTasks: Task[];
  learningTask: LearningTask;
  reflectionQuestion: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  estimatedMinutes: number;
  completed: boolean;
}

export interface LearningTask {
  topic: string;
  description: string;
  durationMinutes: number;
  resources?: string[];
}

export interface ProductivityScore {
  date: string;
  score: number;
  factors: {
    timeBalance: number;
    errorFrequency: number;
    taskCompletion: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Form types
export interface ActivityFormData {
  task: string;
  durationMin: number;
  errors: number;
  context?: string;
}

export interface UserProfileFormData {
  displayName: string;
  email: string;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}
