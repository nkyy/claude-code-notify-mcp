#!/bin/bash

echo "=== Notification Hook Logs ==="
if [ -f "/Users/nkygit/vscode-work/ccnotify/hooks/hook-debug.log" ]; then
    echo "最新の10行:"
    tail -10 "/Users/nkygit/vscode-work/ccnotify/hooks/hook-debug.log"
    echo ""
    echo "ログ件数: $(wc -l < /Users/nkygit/vscode-work/ccnotify/hooks/hook-debug.log)"
else
    echo "通知ログファイルが見つかりません"
fi

echo ""
echo "=== Stop Hook Logs ==="
if [ -f "/Users/nkygit/vscode-work/ccnotify/hooks/stop-hook.log" ]; then
    echo "最新の10行:"
    tail -10 "/Users/nkygit/vscode-work/ccnotify/hooks/stop-hook.log"
    echo ""
    echo "ログ件数: $(wc -l < /Users/nkygit/vscode-work/ccnotify/hooks/stop-hook.log)"
else
    echo "ストップログファイルが見つかりません"
fi

echo ""
echo "=== Debug Hook Logs ==="
if [ -f "/Users/nkygit/vscode-work/ccnotify/hooks/debug-detailed.log" ]; then
    echo "最新の10行:"
    tail -10 "/Users/nkygit/vscode-work/ccnotify/hooks/debug-detailed.log"
    echo ""
    echo "ログ件数: $(wc -l < /Users/nkygit/vscode-work/ccnotify/hooks/debug-detailed.log)"
else
    echo "デバッグログファイルが見つかりません"
fi