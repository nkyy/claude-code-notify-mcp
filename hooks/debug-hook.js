#!/usr/bin/env node

/**
 * Debug Hook for Claude Code - Detailed Input Analysis
 * This script logs all hook invocation details for troubleshooting
 */

import { appendFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logFile = join(__dirname, 'debug-detailed.log');

function debugLog(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  try {
    appendFileSync(logFile, logEntry);
  } catch (error) {
    console.error('Logging failed:', error.message);
  }
}

function main() {
  debugLog('=== HOOK INVOCATION START ===');
  
  // Log environment
  debugLog(`Process ID: ${process.pid}`);
  debugLog(`Working Directory: ${process.cwd()}`);
  debugLog(`Script Path: ${__filename}`);
  
  // Log command line arguments
  debugLog(`Command Line Args: ${JSON.stringify(process.argv)}`);
  debugLog(`Args Count: ${process.argv.length}`);
  
  // Log environment variables related to Claude Code
  const claudeEnvVars = Object.keys(process.env)
    .filter(key => key.toLowerCase().includes('claude'))
    .reduce((obj, key) => {
      obj[key] = process.env[key];
      return obj;
    }, {});
  debugLog(`Claude Environment Variables: ${JSON.stringify(claudeEnvVars)}`);
  
  // Read and log stdin
  try {
    const stdinData = readFileSync(0, 'utf-8');
    debugLog(`STDIN Raw Length: ${stdinData.length}`);
    debugLog(`STDIN Raw Content: "${stdinData}"`);
    debugLog(`STDIN Hex Dump: ${Buffer.from(stdinData).toString('hex')}`);
    
    if (stdinData.trim()) {
      try {
        const parsed = JSON.parse(stdinData);
        debugLog(`STDIN Parsed JSON: ${JSON.stringify(parsed, null, 2)}`);
      } catch (parseError) {
        debugLog(`STDIN JSON Parse Error: ${parseError.message}`);
      }
    } else {
      debugLog('STDIN is empty');
    }
  } catch (stdinError) {
    debugLog(`STDIN Read Error: ${stdinError.message}`);
  }
  
  // Log current timestamp for correlation
  debugLog(`Invocation Timestamp: ${Date.now()}`);
  
  debugLog('=== HOOK INVOCATION END ===');
  debugLog(''); // Empty line separator
}

main();