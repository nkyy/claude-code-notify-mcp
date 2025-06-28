# Claude Code Notification MCP Server

A Model Context Protocol (MCP) server that enables Claude Code to send desktop notifications with contextual sounds for different types of events.

## Features

- 🔔 **Desktop Notifications**: Native macOS notifications using `osascript` with cross-platform fallback
- 🎵 **Contextual Sounds**: Different sounds for different notification types (success, error, warning, etc.)
- 🚀 **Multiple Notification Types**: Pre-built notification types for common Claude Code use cases
- ⚙️ **Flexible Configuration**: Customizable titles, messages, sounds, and behaviors
- 🖱️ **Interactive**: Support for click actions and waiting for user interaction

## Installation

```bash
npm install
npm run build
```

## Usage

### As MCP Server

Add to your Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "claude-code-notify": {
      "command": "node",
      "args": ["/path/to/ccnotify/dist/index.js"]
    }
  }
}
```

### Available Tools

#### 1. `send_notification`
Send a custom notification with full control over all parameters.

**Parameters:**
- `title` (required): Notification title
- `message` (required): Notification message  
- `sound` (optional): Sound type - see Available Sounds below
- `subtitle` (optional): Additional subtitle text
- `timeout` (optional): Timeout in seconds (1-60)
- `open` (optional): URL/file to open when clicked
- `wait` (optional): Wait for user interaction

#### 2. `send_task_complete_notification`
Quick notification for task completion with success sound.

**Parameters:**
- `task` (required): Description of completed task
- `details` (optional): Additional completion details

#### 3. `send_error_notification`  
Quick notification for errors with error sound.

**Parameters:**
- `error` (required): Error description
- `details` (optional): Additional error details

#### 4. `send_progress_notification`
Quick notification for progress updates with progress sound.

**Parameters:**
- `status` (required): Current progress status
- `details` (optional): Additional progress details

#### 5. `list_notification_sounds`
List all available sounds and their intended use cases.

## Available Sounds

- **`success`**: Task completion, successful operations (Glass sound)
- **`info`**: Information, status updates (Blow sound)  
- **`warning`**: Warnings, attention needed (Sosumi sound)
- **`error`**: Errors, failures (Basso sound)
- **`progress`**: Progress updates, ongoing work (Tink sound)
- **`reminder`**: Reminders, prompts (Ping sound)
- **`default`**: Default system notification sound
- **`silent`**: No sound

## Common Use Cases

### Task Completion
```typescript
// When Claude Code finishes a long-running task
send_task_complete_notification({
  task: "Code refactoring completed successfully",
  details: "Processed 15 files, fixed 23 issues"
})
```

### Error Alerts
```typescript
// When Claude Code encounters an error
send_error_notification({
  error: "Build failed with TypeScript errors",
  details: "3 type errors found in user-service.ts"
})
```

### Progress Updates
```typescript
// During long operations
send_progress_notification({
  status: "Installing dependencies (2/5)",
  details: "Installing @types/node..."
})
```

### Custom Notifications
```typescript
// For specific scenarios
send_notification({
  title: "🔍 Code Analysis Complete",
  message: "Found 3 potential improvements",
  sound: "info",
  subtitle: "Click to view recommendations",
  open: "file:///path/to/analysis-report.html"
})
```

## Development

```bash
# Install dependencies
npm install

# Development mode with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Platform Support

- **macOS**: Full native support with `osascript` and system sounds
- **Windows/Linux**: Cross-platform support via `node-notifier` package

## Architecture

The MCP server follows the Playwright MCP pattern with:

- **Type-safe interfaces** for all notification options
- **Modular notification manager** with platform-specific implementations  
- **Clean MCP tool definitions** with proper input validation
- **Error handling** with meaningful error messages
- **Extensible design** for adding new notification types

## License

MIT