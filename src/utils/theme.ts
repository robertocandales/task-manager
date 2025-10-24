export const lightTheme = {
  colors: {
    primary: '#2563eb',
    background: '#fafafa',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    error: '#dc2626',
    success: '#059669',
    warning: '#d97706',
    // Additional colors for better segmented button contrast
    surfaceVariant: '#f3f4f6',
    onSurfaceVariant: '#6b7280',
    primaryContainer: '#2563eb',
    onPrimaryContainer: '#ffffff',
    // Material Design 3 colors for segmented buttons
    secondaryContainer: '#dbeafe',
    onSecondaryContainer: '#1e40af',
    outline: '#6b7280',
    onSurface: '#111827',
    priority: {
      high: '#dc2626',
      medium: '#d97706',
      low: '#059669',
    },
  },
};

export const darkTheme = {
  colors: {
    primary: '#3b82f6',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    border: '#334155',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    // Additional colors for better segmented button contrast
    surfaceVariant: '#334155',
    onSurfaceVariant: '#94a3b8',
    primaryContainer: '#3b82f6',
    onPrimaryContainer: '#ffffff',
    // Material Design 3 colors for segmented buttons
    secondaryContainer: '#1e3a8a',
    onSecondaryContainer: '#dbeafe',
    outline: '#64748b',
    onSurface: '#f8fafc',
    priority: {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981',
    },
  },
};

export type Theme = typeof lightTheme;
