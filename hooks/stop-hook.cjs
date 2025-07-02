#!/usr/bin/env node

/**
 * Claude Code Stop Hook
 * Handles session stop events with different sound and styling
 */

const { execSync } = require('child_process');
const { appendFileSync, readFileSync } = require('fs');
const { join } = require('path');

const logFile = join(__dirname, 'stop-hook.log');

function debugLog(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] STOP HOOK: ${message}\n`;
  try {
    appendFileSync(logFile, logEntry);
  } catch (error) {
    console.error('Stop hook logging failed:', error.message);
  }
}

function getStopData() {
  let stopData = {};
  let stopTitle = '';
  let stopMessage = '';

  try {
    const input = readFileSync(0, 'utf-8');
    debugLog(`Raw stdin input: "${input}"`);
    if (input.trim()) {
      stopData = JSON.parse(input);
      stopTitle = stopData.title || 'Claude Code Session';
      stopMessage = stopData.message || 'Session Stopped';
    }
  } catch (error) {
    debugLog(`Error reading stdin: ${error.message}`);
    const args = process.argv.slice(2);
    stopTitle = args[0] || 'Claude Code';
    stopMessage = args[1] || 'Stop Event';
  }

  return { stopData, stopTitle, stopMessage };
}

function sendStopNotification(title, message) {
  try {
    // Stop用の特別な通知スタイル
    const stopTitle = `🐱 ${title}`;
    const stopMessage = `セッション終了: ${message}`;
    
    // 通知を先に表示
    const script = `display notification "${stopMessage}" with title "${stopTitle}"`;
    execSync(`osascript -e '${script}'`, { stdio: 'ignore' });
    debugLog(`Stop notification sent: ${stopTitle} - ${stopMessage}`);
    
    // 通知の後に猫の音声を再生
    const audioFile = join(__dirname, '..', 'cat-meow-1-fx-323465.mp3');
    try {
      execSync(`afplay "${audioFile}"`, { stdio: 'ignore' });
      debugLog(`Cat sound played: ${audioFile}`);
    } catch (audioError) {
      debugLog(`Failed to play cat sound: ${audioError.message}`);
    }
    
  } catch (error) {
    console.error('Failed to send stop notification:', error.message);
    debugLog(`Stop notification error: ${error.message}`);
    console.log(`${title}: ${message}`);
  }
}

function main() {
  try {
    debugLog('=== STOP HOOK TRIGGERED ===');
    
    const { stopData, stopTitle, stopMessage } = getStopData();
    
    debugLog(`Stop Title: "${stopTitle}"`);
    debugLog(`Stop Message: "${stopMessage}"`);
    debugLog(`Stop Data: ${JSON.stringify(stopData)}`);
    
    if (!stopTitle && !stopMessage) {
      debugLog('No stop data, exiting');
      process.exit(0);
    }
    
    sendStopNotification(stopTitle, stopMessage);
    
  } catch (error) {
    console.error('Stop hook error:', error.message);
    debugLog(`Stop hook error: ${error.message}`);
  }
}

main();