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
            name: 'send_notification',
            description: 'Send a desktop notification with customizable sound for different use cases',
            inputSchema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'The notification title',
                  maxLength: 100
                },
                message: {
                  type: 'string',
                  description: 'The notification message content',
                  maxLength: 500
                },
                sound: {
                  type: 'string',
                  enum: ['success', 'info', 'warning', 'error', 'progress', 'reminder', 'default', 'silent'],
                  description: 'Sound type for the notification context: success (task completion), info (status updates), warning (attention needed), error (failures), progress (ongoing work), reminder (prompts), default (system sound), silent (no sound)',
                  default: 'default'
                },
                subtitle: {
                  type: 'string',
                  description: 'Optional subtitle for the notification',
                  maxLength: 100
                },
                timeout: {
                  type: 'number',
                  description: 'Timeout in seconds (macOS only)',
                  minimum: 1,
                  maximum: 60,
                  default: 5
                },
                open: {
                  type: 'string',
                  description: 'URL or file path to open when notification is clicked',
                },
                wait: {
                  type: 'boolean',
                  description: 'Whether to wait for user interaction',
                  default: false
                }
              },
              required: ['title', 'message'],
              additionalProperties: false
            }
          },
          {
            name: 'list_notification_sounds',
            description: 'List available notification sounds and their intended use cases',
            inputSchema: {
              type: 'object',
              properties: {},
              additionalProperties: false
            }
          },
          {
            name: 'send_task_complete_notification',
            description: 'Send a task completion notification with success sound',
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
            description: 'Send an error notification with error sound',
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
            name: 'send_progress_notification',
            description: 'Send a progress update notification with progress sound',
            inputSchema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  description: 'Current progress status',
                  maxLength: 200
                },
                details: {
                  type: 'string',
                  description: 'Optional progress details',
                  maxLength: 300
                }
              },
              required: ['status'],
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
          case 'send_notification':
            return await this.handleSendNotification(args as any);

          case 'list_notification_sounds':
            return this.handleListSounds();

          case 'send_task_complete_notification':
            return await this.handleTaskCompleteNotification(args as any);

          case 'send_error_notification':
            return await this.handleErrorNotification(args as any);

          case 'send_progress_notification':
            return await this.handleProgressNotification(args as any);

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

  private async handleSendNotification(options: NotificationOptions) {
    const result = await this.notificationManager.sendNotification(options);
    
    return {
      content: [
        {
          type: 'text',
          text: result.success 
            ? `✅ Notification sent: "${options.title}" with ${options.sound || 'default'} sound`
            : `❌ Failed to send notification: ${result.error}`
        }
      ]
    };
  }

  private handleListSounds() {
    const sounds = this.notificationManager.getAvailableSounds();
    const soundList = sounds.map(sound => 
      `• **${sound}**: ${this.notificationManager.getSoundDescription(sound)}`
    ).join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `## Available Notification Sounds\n\n${soundList}`
        }
      ]
    };
  }

  private async handleTaskCompleteNotification(args: { task: string; details?: string }) {
    const options: NotificationOptions = {
      title: '✅ Task Complete',
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
      title: '❌ Error Occurred',
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

  private async handleProgressNotification(args: { status: string; details?: string }) {
    const options: NotificationOptions = {
      title: '⏳ Progress Update',
      message: args.status,
      subtitle: args.details,
      sound: 'progress' as NotificationSound
    };

    const result = await this.notificationManager.sendNotification(options);
    
    return {
      content: [
        {
          type: 'text',
          text: result.success 
            ? `⏳ Progress notification sent: "${args.status}"`
            : `❌ Failed to send progress notification: ${result.error}`
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