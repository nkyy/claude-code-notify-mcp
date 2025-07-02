# 🔔 Claude Code Notification Hooks

> **⚠️ DEPRECATED**: This project has been superseded by [cat-ccnotify-hook](https://github.com/nkygit/cat-ccnotify-hook). Please use the new standalone package for better performance and easier installation.

Enhanced Claude Code experience with automatic desktop notifications and contextual sounds for all events. No manual notification calls needed - works automatically with all Claude Code operations!

## ✨ Features

- 🔔 **Automatic Notifications**: Intercepts ALL Claude Code notifications and enhances them
- 🎵 **Contextual Sounds**: Different sounds for success, error, warning, and other event types
- 🚀 **Zero Configuration**: Automatic detection and enhancement of notification types
- 📋 **Smart Sound Mapping**: Intelligent analysis of notification content for appropriate sounds
- 🖱️ **Native System Integration**: Uses macOS/Windows/Linux native notification systems

## 🚀 Quick Start

### Method 1: One-Command Setup (Recommended)

Run this in Claude Code:

```bash
cd /path/to/ccnotify && npm run setup-hooks
```

### Method 2: Manual Setup

1. **Clone and build:**
```bash
git clone <this-repository>
cd ccnotify
npm install && npm run build
```

2. **Run setup:**
```bash
npm run setup-hooks
```

3. **Restart Claude Code** if it's currently running

### 3. That's It!

All Claude Code notifications will now automatically have enhanced sounds and styling. No additional configuration needed!

## 📱 How It Works

The notification hook automatically detects and enhances all Claude Code notifications:

### Automatic Sound Assignment
- ✅ **Success/Completion** → Glass sound (macOS)
- 🚨 **Errors/Failures** → Basso sound (macOS)  
- ⚠️ **Warnings/Attention** → Sosumi sound (macOS)
- 💡 **Info/Updates** → Blow sound (macOS)
- ⏳ **Progress/Ongoing** → Tink sound (macOS)

### Examples in Action
```bash
# Building a project
npm run build
# → Automatic success notification with Glass sound when complete
# → Automatic error notification with Basso sound if failed

# Running tests  
npm test
# → Automatic progress notification with Tink sound while running
# → Automatic completion notification when finished

# Git operations
git push origin main
# → Automatic notifications for each step with appropriate sounds
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

## 🛠️ Advanced Configuration

### Customizing Sound Mappings

Edit the hook script at `hooks/notification-hook.js` to customize sound mappings:

```javascript
// Example: Add custom sound rules
const customSoundRules = [
  { pattern: /deployment/i, sound: 'Ping' },
  { pattern: /security/i, sound: 'Funk' },
  { pattern: /backup/i, sound: 'Purr' }
];
```

### Troubleshooting

**Hook not working?**
```bash
# Check if hook is properly installed
cat ~/.config/claude-code/settings.json | grep -A 10 "hooks"

# Verify hook script is executable
ls -la hooks/notification-hook.js

# Re-run setup if needed
npm run setup-hooks
```

**Sounds not playing?**
```bash
# Test system sound (macOS)
afplay /System/Library/Sounds/Glass.aiff

# Check notification permissions in System Preferences
```

## 🌍 Real-World Examples

### Automatic Enhancement Examples

**Claude Code Operations** → **Enhanced Notifications**

```bash
# File operations
"Create a new React component"
→ ✅ "Component created successfully" + Glass sound

# Build processes  
"Run the build process"
→ ⏳ "Build in progress..." + Tink sound
→ ✅ "Build completed successfully" + Glass sound

# Error scenarios
"Fix the TypeScript errors"
→ 🚨 "3 type errors found" + Basso sound

# Git operations
"Commit these changes"
→ ✅ "Changes committed successfully" + Glass sound
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

## 📋 Technical Details

### Hook Architecture

The notification hook intercepts Claude Code's notification system and enhances it:

1. **Interception**: Hook receives all notification calls from Claude Code
2. **Analysis**: Analyzes notification content using pattern matching
3. **Enhancement**: Adds appropriate sounds and styling based on content
4. **Native Integration**: Uses platform-specific notification APIs

### Installation Structure

```
~/.config/claude-code/settings.json  # Claude Code configuration
hooks/notification-hook.js            # Main hook script  
dist/index.js                        # Built MCP server (optional)
scripts/setup-hooks.js               # Automated setup script
```

### Platform Support
- **macOS**: Full native support with `osascript` and system sounds
- **Windows/Linux**: Cross-platform support via `node-notifier` package

### Legacy MCP Server (Optional)

For advanced users who want manual notification control, the MCP server is still available:

```json
{
  "mcpServers": {
    "ccnotify": {
      "command": "node",
      "args": ["/absolute/path/to/ccnotify/dist/index.js"]
    }
  }
}
```

## 🤝 Contributing

Bug reports and feature requests are welcome! Please open an [issue](../../issues).

## 📄 License

MIT License