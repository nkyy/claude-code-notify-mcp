export interface NotificationOptions {
  title: string;
  message: string;
  sound?: NotificationSound;
  subtitle?: string;
  timeout?: number;
  open?: string;
  wait?: boolean;
}

export type NotificationSound = 
  | 'success'    // Task completion, successful operation
  | 'info'       // Information, status updates
  | 'warning'    // Warnings, attention needed
  | 'error'      // Errors, failures
  | 'progress'   // Progress updates, ongoing work
  | 'reminder'   // Reminders, prompts
  | 'default'    // Default system sound
  | 'silent';    // No sound

export interface NotificationResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface McpNotificationConfig {
  enableSounds: boolean;
  defaultSound: NotificationSound;
  maxTitleLength: number;
  maxMessageLength: number;
}