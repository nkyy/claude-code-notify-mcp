# 🔔 Claude Code Notification MCP Server

A Model Context Protocol (MCP) server that enables Claude Code to send desktop notifications with contextual sounds for different types of events.

## ✨ Features

- 🔔 **Desktop Notifications**: Native notifications for macOS/Windows/Linux
- 🎵 **Contextual Sounds**: Different sounds for success, error, warning, and other event types
- 🚀 **Easy Setup**: One-command installation and configuration
- 📋 **Pre-built Notification Types**: Common notification patterns for quick use
- 🖱️ **Interactive**: Support for click actions and user interaction

## 🚀 Quick Start

### 1. Installation

```bash
git clone <this-repository>
cd ccnotify
npm install && npm run build
```

### 2. Configure Claude Code

Add to your Claude Code settings file (`~/.config/claude-code/settings.json`):

```json
{
  "mcpServers": {
    "ccnotify": {
      "command": "node",
      "args": ["/path/to/ccnotify/dist/index.js"]
    }
  }
}
```

### 3. Test It Out

Ask Claude Code:

```
Send me a test notification
```

If you see a notification, you're all set! 🎉

## 📱 Basic Usage

### Task Completion Notifications
```
Notify me when the build finishes
```

### Error Alerts
```
Alert me if there are any compilation errors
```

### Progress Updates
```
Show progress notifications during package installation
```

## 🎵 Available Sounds

| Sound | Use Case | macOS Sound |
|-------|----------|-------------|
| `success` | Task completion, success | Glass |
| `error` | Errors, failures | Basso |
| `warning` | Warnings, attention needed | Sosumi |
| `info` | Information, status updates | Blow |
| `progress` | Progress updates, ongoing work | Tink |
| `reminder` | Reminders, prompts | Ping |
| `default` | System default notification sound | - |
| `silent` | No sound | - |

## 🛠️ Advanced Usage

### Custom Notifications

```typescript
// Available tool in Claude Code
send_notification({
  title: "🔍 Code Analysis Complete",
  message: "Found 3 potential improvements",
  sound: "info",
  subtitle: "Click to view recommendations",
  open: "file:///path/to/report.html"
})
```

### Pre-built Notification Types

```typescript
// Task completion notification
send_task_complete_notification({
  task: "Refactoring completed successfully",
  details: "Processed 15 files, fixed 23 issues"
})

// Error notification
send_error_notification({
  error: "TypeScript compilation failed",
  details: "3 type errors found in user-service.ts"
})

// Progress notification
send_progress_notification({
  status: "Installing dependencies (2/5)",
  details: "Installing @types/node..."
})
```

## 🌍 Real-World Examples

### Development Workflow

**Long-running Tasks**
```
"Running test suite... please notify when complete"
→ ✅ "Tests Complete: All 127 tests passed"
```

**Error Monitoring**
```
"Let me know if the build fails"
→ 🚨 "Build Error: Type definitions not found"
```

**Progress Tracking**
```
"Show progress while downloading large files"
→ 📊 "Download Progress: 67% (340MB/500MB)"
```

### Custom Use Cases

**Meeting Reminders**
```typescript
send_notification({
  title: "📅 Meeting in 5 minutes",
  message: "Daily standup meeting starting soon",
  sound: "reminder",
  wait: true
})
```

**Code Review Completion**
```typescript
send_task_complete_notification({
  task: "Pull Request #123 reviewed",
  details: "Approved - ready to merge"
})
```

**CI/CD Pipeline Updates**
```typescript
send_progress_notification({
  status: "Deployment in progress",
  details: "Stage 2/4: Running integration tests"
})
```

## 🔧 Development

### Development Commands
```bash
npm run dev    # Development mode with auto-reload
npm run build  # Production build
npm start      # Start production server
```

### Platform Support
- **macOS**: Full native support with `osascript` and system sounds
- **Windows/Linux**: Cross-platform support via `node-notifier` package

### Architecture
- Type-safe TypeScript implementation
- MCP (Model Context Protocol) compliant
- Automatic platform-specific implementation switching
- Extensible notification type system

## 📋 Available Tools

### 1. `send_notification`
Send a custom notification with full control over all parameters.

**Parameters:**
- `title` (required): Notification title
- `message` (required): Notification message
- `sound` (optional): Sound type - see Available Sounds
- `subtitle` (optional): Additional subtitle text
- `timeout` (optional): Timeout in seconds (1-60, macOS only)
- `open` (optional): URL/file to open when clicked
- `wait` (optional): Wait for user interaction

### 2. `send_task_complete_notification`
Quick notification for task completion with success sound.

**Parameters:**
- `task` (required): Description of completed task
- `details` (optional): Additional completion details

### 3. `send_error_notification`
Quick notification for errors with error sound.

**Parameters:**
- `error` (required): Error description
- `details` (optional): Additional error details

### 4. `send_progress_notification`
Quick notification for progress updates with progress sound.

**Parameters:**
- `status` (required): Current progress status
- `details` (optional): Additional progress details

### 5. `list_notification_sounds`
List all available sounds and their intended use cases.

## 🤝 Contributing

Bug reports and feature requests are welcome! Please open an [issue](../../issues).

## 📄 License

MIT License