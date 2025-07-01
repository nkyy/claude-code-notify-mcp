#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { NotificationManager } from './notifier.js';
import { NotificationOptions, NotificationSound } from './types.js';

class NotificationMCPServer {
  private server: Server;
  private notificationManager: NotificationManager;

  constructor() {
    this.server = new Server(
      {
        name: 'claude-code-notify-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.notificationManager = new NotificationManager();
    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'send_user_action_needed_notification',
            description: 'AUTOMATICALLY send urgent notifications when user input, decision, or immediate attention is required. Claude should proactively use this for: file conflicts, permission requests, critical errors requiring user choice, or when waiting for user response before proceeding. Essential for good UX - notify users immediately when blocked.',
            inputSchema: {
              type: 'object',
              properties: {
                action_needed: {
                  type: 'string',
                  description: 'What action the user needs to take',
                  maxLength: 200
                },
                context: {
                  type: 'string',
                  description: 'Context or reason why user action is needed',
                  maxLength: 300
                },
                urgency: {
                  type: 'string',
                  enum: ['low', 'medium', 'high', 'critical'],
                  description: 'Urgency level of the required action',
                  default: 'medium'
                },
                timeout: {
                  type: 'number',
                  description: 'How long to display the notification (seconds)',
                  minimum: 5,
                  maximum: 60,
                  default: 10
                }
              },
              required: ['action_needed'],
              additionalProperties: false
            }
          },
          {
            name: 'send_task_complete_notification',
            description: 'AUTOMATICALLY send success notifications when any significant task completes successfully. Claude should proactively use this for: builds finishing, tests passing, file operations completing, refactoring done, analysis complete, long operations finishing. Always notify users of completion for better UX.',
            inputSchema: {
              type: 'object',
              properties: {
                task: {
                  type: 'string',
                  description: 'Description of the completed task',
                  maxLength: 200
                },
                details: {
                  type: 'string',
                  description: 'Optional additional details about the completion',
                  maxLength: 300
                }
              },
              required: ['task'],
              additionalProperties: false
            }
          },
          {
            name: 'send_error_notification',
            description: 'AUTOMATICALLY send error notifications with error sound when anything fails. Claude must proactively use this when: compilation fails, tests fail, file operations fail, network requests fail, validation errors occur, bash commands fail. Critical for error awareness - always notify on failures.',
            inputSchema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Description of the error',
                  maxLength: 200
                },
                details: {
                  type: 'string',
                  description: 'Optional additional error details',
                  maxLength: 300
                }
              },
              required: ['error'],
              additionalProperties: false
            }
          },
          {
            name: 'auto_notify_if_appropriate',
            description: 'SMART AUTO-NOTIFICATION: Intelligently analyze context and automatically send appropriate notifications. Claude should use this proactively for: task completion detection, error analysis, user action evaluation, progress updates. This is the primary notification tool - use it frequently to keep users informed.',
            inputSchema: {
              type: 'object',
              properties: {
                context: {
                  type: 'string',
                  description: 'Current context or situation that might require notification',
                  maxLength: 500
                },
                todos_completed: {
                  type: 'boolean',
                  description: 'Whether all planned todos are completed',
                  default: false
                },
                error_occurred: {
                  type: 'boolean', 
                  description: 'Whether an error has occurred',
                  default: false
                },
                permission_required: {
                  type: 'boolean',
                  description: 'Whether user permission is required for an action',
                  default: false
                },
                error_details: {
                  type: 'string',
                  description: 'Details about the error if error_occurred is true',
                  maxLength: 300
                },
                permission_details: {
                  type: 'string', 
                  description: 'Details about the permission required if permission_required is true',
                  maxLength: 300
                }
              },
              required: ['context'],
              additionalProperties: false
            }
          }
        ]
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'send_user_action_needed_notification':
            return await this.handleUserActionNeededNotification(args as any);

          case 'send_task_complete_notification':
            return await this.handleTaskCompleteNotification(args as any);

          case 'send_error_notification':
            return await this.handleErrorNotification(args as any);

          case 'auto_notify_if_appropriate':
            return await this.handleAutoNotification(args as any);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`
            }
          ],
          isError: true
        };
      }
    });
  }


  private async handleTaskCompleteNotification(args: { task: string; details?: string }) {
    const options: NotificationOptions = {
      title: '✅ Claude Code - Task Complete',
      message: args.task,
      subtitle: args.details,
      sound: 'success' as NotificationSound
    };

    const result = await this.notificationManager.sendNotification(options);
    
    return {
      content: [
        {
          type: 'text',
          text: result.success 
            ? `✅ Task completion notification sent: "${args.task}"`
            : `❌ Failed to send task completion notification: ${result.error}`
        }
      ]
    };
  }

  private async handleErrorNotification(args: { error: string; details?: string }) {
    const options: NotificationOptions = {
      title: '❌ Claude Code - Error',
      message: args.error,
      subtitle: args.details,
      sound: 'error' as NotificationSound
    };

    const result = await this.notificationManager.sendNotification(options);
    
    return {
      content: [
        {
          type: 'text',
          text: result.success 
            ? `❌ Error notification sent: "${args.error}"`
            : `❌ Failed to send error notification: ${result.error}`
        }
      ]
    };
  }


  private async handleUserActionNeededNotification(args: { 
    action_needed: string; 
    context?: string; 
    urgency?: 'low' | 'medium' | 'high' | 'critical';
    timeout?: number;
  }) {
    const urgencyEmojis = {
      low: '💭',
      medium: '🔔',
      high: '⚠️',
      critical: '🚨'
    };

    const urgencySounds = {
      low: 'default' as NotificationSound,
      medium: 'reminder' as NotificationSound,
      high: 'warning' as NotificationSound,
      critical: 'error' as NotificationSound
    };

    const urgency = args.urgency || 'medium';
    
    const options: NotificationOptions = {
      title: `${urgencyEmojis[urgency]} Claude Code - Action Required`,
      message: args.action_needed,
      subtitle: args.context,
      sound: urgencySounds[urgency],
      timeout: args.timeout || 10,
      wait: urgency === 'critical' || urgency === 'high'
    };

    const result = await this.notificationManager.sendNotification(options);
    
    return {
      content: [
        {
          type: 'text',
          text: result.success 
            ? `${urgencyEmojis[urgency]} User action notification sent: "${args.action_needed}" (${urgency} priority)`
            : `❌ Failed to send user action notification: ${result.error}`
        }
      ]
    };
  }

  private async handleAutoNotification(args: {
    context: string;
    todos_completed?: boolean;
    error_occurred?: boolean;
    permission_required?: boolean;
    error_details?: string;
    permission_details?: string;
  }) {
    // Priority: Error > Permission > TODO completion
    
    if (args.error_occurred) {
      return await this.handleErrorNotification({
        error: args.error_details || 'An error occurred',
        details: args.context
      });
    }
    
    if (args.permission_required) {
      return await this.handleUserActionNeededNotification({
        action_needed: args.permission_details || 'Permission required for action',
        context: args.context,
        urgency: 'high' as const
      });
    }
    
    if (args.todos_completed) {
      return await this.handleUserActionNeededNotification({
        action_needed: 'All tasks completed - awaiting next instructions',
        context: args.context,
        urgency: 'medium' as const
      });
    }
    
    // No notification needed
    return {
      content: [
        {
          type: 'text',
          text: '💭 No notification needed for current context'
        }
      ]
    };
  }

  private setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Claude Code Notification MCP server running on stdio');
  }
}

const server = new NotificationMCPServer();
server.run().catch(console.error);