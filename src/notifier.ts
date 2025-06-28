import notifier from 'node-notifier';
import { exec } from 'child_process';
import { promisify } from 'util';
import { NotificationOptions, NotificationResult, NotificationSound } from './types.js';

const execAsync = promisify(exec);

export class NotificationManager {
  private readonly soundMap: Record<NotificationSound, string> = {
    success: 'Glass',
    info: 'Blow',
    warning: 'Sosumi',
    error: 'Basso',
    progress: 'Tink',
    reminder: 'Ping',
    default: 'default',
    silent: ''
  };

  async sendNotification(options: NotificationOptions): Promise<NotificationResult> {
    try {
      const { title, message, sound = 'default', subtitle, timeout, open, wait } = options;

      // Validate inputs
      if (!title || !message) {
        return {
          success: false,
          error: 'Title and message are required'
        };
      }

      // Use macOS native notifications for better integration
      if (process.platform === 'darwin') {
        return await this.sendMacNotification(options);
      } else {
        return await this.sendCrossPlatformNotification(options);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async sendMacNotification(options: NotificationOptions): Promise<NotificationResult> {
    const { title, message, sound = 'default', subtitle, timeout, open, wait } = options;
    
    let osascriptCommand = `display notification "${this.escapeString(message)}" with title "${this.escapeString(title)}"`;
    
    if (subtitle) {
      osascriptCommand += ` subtitle "${this.escapeString(subtitle)}"`;
    }
    
    if (sound !== 'silent') {
      const soundName = this.soundMap[sound];
      if (soundName && soundName !== '') {
        osascriptCommand += ` sound name "${soundName}"`;
      }
    }

    try {
      await execAsync(`osascript -e '${osascriptCommand}'`);
      
      // Handle additional actions
      if (open) {
        await execAsync(`open "${open}"`);
      }
      
      if (wait && timeout) {
        await new Promise(resolve => setTimeout(resolve, timeout * 1000));
      }

      return {
        success: true,
        message: 'Notification sent successfully'
      };
    } catch (error) {
      throw new Error(`Failed to send macOS notification: ${error}`);
    }
  }

  private async sendCrossPlatformNotification(options: NotificationOptions): Promise<NotificationResult> {
    return new Promise((resolve) => {
      const { title, message, sound = 'default', open, wait, timeout } = options;

      const notificationOptions: any = {
        title,
        message,
        wait: wait || false,
        timeout: timeout || 5
      };

      if (sound !== 'silent') {
        notificationOptions.sound = sound !== 'default';
      }

      if (open) {
        notificationOptions.open = open;
      }

      notifier.notify(notificationOptions, (err, response) => {
        if (err) {
          resolve({
            success: false,
            error: err.message
          });
        } else {
          resolve({
            success: true,
            message: 'Notification sent successfully'
          });
        }
      });
    });
  }

  private escapeString(str: string): string {
    return str.replace(/"/g, '\\"').replace(/'/g, "\\'");
  }

  getAvailableSounds(): NotificationSound[] {
    return Object.keys(this.soundMap) as NotificationSound[];
  }

  getSoundDescription(sound: NotificationSound): string {
    const descriptions: Record<NotificationSound, string> = {
      success: 'Success notification - task completion, successful operations',
      info: 'Information notification - status updates, general information',
      warning: 'Warning notification - attention needed, caution required',
      error: 'Error notification - failures, critical issues',
      progress: 'Progress notification - ongoing work, updates',
      reminder: 'Reminder notification - prompts, scheduled alerts',
      default: 'Default system notification sound',
      silent: 'No sound - silent notification'
    };
    
    return descriptions[sound];
  }
}