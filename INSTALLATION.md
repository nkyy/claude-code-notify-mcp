# Installation Guide

## Quick Setup

1. **Install Dependencies**
   ```bash
   cd /Users/nkygit/vscode-work/ccnotify
   npm install
   npm run build
   ```

2. **Test the Notification System**
   ```bash
   node test-notification.js
   ```

3. **Configure Claude Code MCP**

   Add this to your Claude Code MCP configuration file:

   ```json
   {
     "mcpServers": {
       "claude-code-notify": {
         "command": "node",
         "args": ["/Users/nkygit/vscode-work/ccnotify/dist/index.js"]
       }
     }
   }
   ```

   **Configuration File Locations:**
   - **macOS**: `~/Library/Application Support/Claude Code/mcp_servers.json`
   - **Windows**: `%APPDATA%/Claude Code/mcp_servers.json`
   - **Linux**: `~/.config/claude-code/mcp_servers.json`

4. **Restart Claude Code**

   After adding the configuration, restart Claude Code to load the MCP server.

## Verification

Once configured, Claude Code will have access to these new tools:

- `send_notification` - Send custom notifications
- `send_task_complete_notification` - Quick success notifications
- `send_error_notification` - Quick error alerts
- `send_progress_notification` - Progress updates
- `list_notification_sounds` - View available sounds

## Usage Examples

### In Claude Code Conversations

**Task Completion:**
```
"Please send a notification when you're done refactoring this code"
→ Claude Code will use send_task_complete_notification() when finished
```

**Error Reporting:**
```
"Alert me if the build fails"
→ Claude Code will use send_error_notification() if errors occur
```

**Progress Updates:**
```
"Keep me posted on the installation progress"
→ Claude Code will use send_progress_notification() during long operations
```

### Direct Tool Usage

Claude Code can now call:
```javascript
// Success notification with Glass sound
send_task_complete_notification({
  task: "Code analysis completed",
  details: "Found 3 optimization opportunities"
})

// Error notification with Basso sound  
send_error_notification({
  error: "TypeScript compilation failed",
  details: "5 errors in user-service.ts"
})

// Custom notification with specific sound
send_notification({
  title: "🔍 Review Required",
  message: "Security scan found potential issues", 
  sound: "warning",
  subtitle: "Click to view report"
})
```

## Troubleshooting

### Notifications Not Appearing

1. **Check macOS Notification Settings**
   - Open System Preferences → Notifications & Focus
   - Ensure Terminal/Script Editor has notification permissions
   - Test with: `osascript -e "display notification \"test\""`

2. **Verify MCP Server is Running**
   - Check Claude Code logs for MCP connection errors
   - Test server manually: `node dist/index.js`

3. **Check File Permissions**
   - Ensure the script is executable: `chmod +x dist/index.js`
   - Verify correct paths in MCP configuration

### Sound Not Playing

1. **Check System Volume**
   - Ensure system volume is not muted
   - Test notification sounds in System Preferences

2. **Verify Sound Names**
   - Use `list_notification_sounds` to see available options
   - Try with `sound: "default"` first

### Configuration Issues

1. **Invalid JSON**
   - Validate your MCP configuration with a JSON validator
   - Check for trailing commas or syntax errors

2. **Path Issues**
   - Use absolute paths in MCP configuration
   - Verify the `dist/index.js` file exists after building

## Advanced Configuration

### Custom Sound Mapping

Edit `src/notifier.ts` to customize sound mappings:

```typescript
private readonly soundMap: Record<NotificationSound, string> = {
  success: 'Glass',     // Change to your preferred sound
  error: 'Basso',       // Customize error sound
  // ... other mappings
};
```

Then rebuild: `npm run build`

### Adding New Notification Types

1. Add new sound type to `src/types.ts`
2. Add sound mapping in `src/notifier.ts`  
3. Add new tool in `src/index.ts`
4. Rebuild and restart Claude Code