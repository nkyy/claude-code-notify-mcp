#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testNotifications() {
  console.log('Testing macOS notifications...\n');
  
  const tests = [
    {
      title: '✅ Success Test',
      message: 'Task completed successfully!',
      sound: 'Glass'
    },
    {
      title: '❌ Error Test', 
      message: 'An error occurred during processing',
      sound: 'Basso'
    },
    {
      title: 'ℹ️ Info Test',
      message: 'Here is some important information',
      sound: 'Blow'
    },
    {
      title: '⚠️ Warning Test',
      message: 'Please review this warning',
      sound: 'Sosumi'
    },
    {
      title: '⏳ Progress Test',
      message: 'Operation is 50% complete',
      sound: 'Tink'
    }
  ];

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    console.log(`${i + 1}. Testing: ${test.title}`);
    
    try {
      const command = `osascript -e "display notification \\"${test.message}\\" with title \\"${test.title}\\" sound name \\"${test.sound}\\""`;
      await execAsync(command);
      console.log(`   ✅ Success`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
    }
    
    // Wait 2 seconds between notifications
    if (i < tests.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\nNotification test complete!');
}

testNotifications().catch(console.error);