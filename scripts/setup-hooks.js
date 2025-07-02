#!/usr/bin/env node

/**
 * Claude Code Hooks Setup Script
 * Automatically configures Claude Code hooks for ccnotify
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { execSync } from 'child_process';

const CLAUDE_CONFIG_DIR = join(homedir(), '.config', 'claude-code');
const CLAUDE_SETTINGS_FILE = join(CLAUDE_CONFIG_DIR, 'settings.json');
const PROJECT_ROOT = dirname(dirname(import.meta.url.replace('file://', '')));

function log(message) {
  console.log(`🔧 ${message}`);
}

function error(message) {
  console.error(`❌ ${message}`);
}

function success(message) {
  console.log(`✅ ${message}`);
}

function ensureDirectoryExists(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
    log(`Created directory: ${dirPath}`);
  }
}

function loadClaudeSettings() {
  ensureDirectoryExists(CLAUDE_CONFIG_DIR);
  
  if (existsSync(CLAUDE_SETTINGS_FILE)) {
    try {
      const content = readFileSync(CLAUDE_SETTINGS_FILE, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      error(`Failed to parse existing settings: ${err.message}`);
      return {};
    }
  }
  
  log('No existing Claude Code settings found, creating new configuration');
  return {};
}

function saveClaudeSettings(settings) {
  try {
    writeFileSync(CLAUDE_SETTINGS_FILE, JSON.stringify(settings, null, 2));
    success(`Settings saved to ${CLAUDE_SETTINGS_FILE}`);
  } catch (err) {
    error(`Failed to save settings: ${err.message}`);
    process.exit(1);
  }
}

function getAbsolutePath(relativePath) {
  return join(PROJECT_ROOT, relativePath);
}

function makeExecutable(scriptPath) {
  try {
    execSync(`chmod +x "${scriptPath}"`, { stdio: 'ignore' });
    log(`Made executable: ${scriptPath}`);
  } catch (err) {
    error(`Failed to make executable: ${scriptPath}`);
  }
}

function setupHooks() {
  const settings = loadClaudeSettings();
  
  // Ensure mcpServers section exists
  if (!settings.mcpServers) {
    settings.mcpServers = {};
  }
  
  // Add ccnotify MCP server if not present
  const ccnotifyServerPath = getAbsolutePath('dist/index.js');
  if (!settings.mcpServers.ccnotify) {
    settings.mcpServers.ccnotify = {
      "command": "node",
      "args": [ccnotifyServerPath]
    };
    log('Added ccnotify MCP server configuration');
  } else {
    log('ccnotify MCP server already configured');
  }
  
  // Setup notification hook (single, simple hook)
  const notificationHookPath = getAbsolutePath('hooks/notification-hook.js');
  
  // Make hook script executable
  makeExecutable(notificationHookPath);
  
  // Create simple hooks configuration - just Notification event
  const hooksConfig = {
    "Notification": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": `node "${notificationHookPath}"`
          }
        ]
      }
    ]
  };
  
  // Merge with existing hooks if any
  if (!settings.hooks) {
    settings.hooks = {};
  }
  
  // Check if ccnotify notification hook already exists
  if (!settings.hooks.Notification) {
    settings.hooks.Notification = [];
  }
  
  const existingCcnotifyHooks = settings.hooks.Notification.filter(hookConfig => 
    hookConfig.hooks && hookConfig.hooks.some(hook => 
      hook.command && hook.command.includes('ccnotify')
    )
  );
  
  if (existingCcnotifyHooks.length === 0) {
    settings.hooks.Notification = settings.hooks.Notification.concat(hooksConfig.Notification);
    log('Added Notification hook');
  } else {
    log('Notification hook already configured');
  }
  
  return settings;
}

function validateSetup() {
  const requiredFiles = [
    'hooks/notification-hook.js',
    'dist/index.js'
  ];
  
  log('Validating setup...');
  
  let allValid = true;
  requiredFiles.forEach(file => {
    const fullPath = getAbsolutePath(file);
    if (existsSync(fullPath)) {
      log(`✓ ${file}`);
    } else {
      error(`✗ Missing: ${file}`);
      allValid = false;
    }
  });
  
  return allValid;
}

function displayUsageInstructions() {
  console.log(`
🎉 Claude Code Hooks Setup Complete!

📋 What was configured:
  • Notification Hook: Enhances ALL Claude Code notifications with sounds and emojis
  • ccnotify MCP Server: Core notification functionality

🚀 Next Steps:
  1. Restart Claude Code if it's currently running
  2. Test the setup by using Claude Code normally
     # All notifications will now have appropriate sounds!

🔧 Configuration Files:
  • Claude Code Settings: ${CLAUDE_SETTINGS_FILE}
  • Hook Script: ${getAbsolutePath('hooks/notification-hook.js')}

📚 Documentation:
  • Read HOOKS.md for detailed usage examples
  • See README.md for general ccnotify usage

🎯 How it works:
  Claude Code sends notifications → Hook intercepts them → Adds appropriate sounds and styling
  
  ✅ Success notifications → Glass sound
  🚨 Error notifications → Basso sound  
  ⚠️ Warning notifications → Sosumi sound
  💡 Info notifications → Blow sound
  ⏳ Progress notifications → Tink sound

🔇 Simple and automatic - no manual notification calls needed!

Need help? Check the troubleshooting section in HOOKS.md
`);
}

function main() {
  console.log('🔧 Setting up Claude Code Hooks for ccnotify...\n');
  
  // Validate required files exist
  if (!validateSetup()) {
    error('Setup validation failed. Make sure you have built the project with "npm run build"');
    process.exit(1);
  }
  
  // Setup hooks configuration
  const settings = setupHooks();
  
  // Save updated settings
  saveClaudeSettings(settings);
  
  // Display success message and instructions
  displayUsageInstructions();
  
  success('Hook setup completed successfully! 🎉');
}

main();