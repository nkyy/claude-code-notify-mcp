# 🪝 Claude Code Hooks Integration

Claude Code の Notification Hook 統合により、ccnotify を使って Claude Code からの**すべての通知**を自動的に音付きの美しい通知に変換できます。

## 🚀 クイックスタート

### 1. セットアップ

#### オプション1: Claude Code 内で実行（推奨）

Claude Code で以下を実行:

```bash
cd /path/to/ccnotify && npm run setup-hooks
```

#### オプション2: 手動セットアップ

```bash
# ccnotify プロジェクトをクローン・ビルド
git clone <repository>
cd ccnotify
npm install && npm run build

# Hook を自動設定
npm run setup-hooks
```

これだけで完了！Claude Code を再起動すれば、すべての通知が音付きになります。

### 2. 使用方法

**特別な操作は不要です。** Claude Code を普通に使うだけで、通知が自動的に拡張されます：

#### Claude Code 内での例

```bash
# 例1: テスト実行
"Run npm test"
# → Claude Code が自動で「Tests completed」通知を送信
# → Hook が「✅ Tests completed」音付き通知に変換

# 例2: ビルド実行
"Build the project"  
# → 「Build successful」→「✅ Build successful」+ Glass音

# 例3: ファイル作成
"Create a new component"
# → 「Component created」→「✅ Component created」+ Glass音
```

#### Claude Code で試してみる

以下をClaude Codeで実行して動作確認:

```bash
# テスト通知送信（このコマンドをClaude Codeで実行）
echo "Setup test - this should trigger a notification"
```

## 🎵 自動音マッピング

通知内容を自動解析して、適切な音を選択します：

| 通知タイプ | 音 | 条件例 |
|-----------|---|-------|
| ✅ **成功** | Glass | "complete", "success", "passed", "✅" |
| 🚨 **エラー** | Basso | "error", "failed", "crash", "❌" |
| ⚠️ **警告** | Sosumi | "warning", "caution", "⚠️" |
| 💡 **情報** | Blow | 一般的な通知 |
| ⏳ **進行中** | Tink | "progress", "running", "installing" |

## 📋 実際の使用例

### 開発ワークフロー

```bash
# 1. テスト実行
"Run the test suite"
# Claude Code → "Test suite completed successfully"
# Hook → "✅ Test suite completed successfully" (Glass音)

# 2. ビルド実行  
"Build the project"
# Claude Code → "Build completed"
# Hook → "✅ Build completed" (Glass音)

# 3. エラー発生
"Run npm install but it fails"
# Claude Code → "Installation failed with errors" 
# Hook → "🚨 Installation failed with errors" (Basso音)
```

### 自動エモジ追加

通知にエモジがない場合、自動的に追加されます：

```
Before: "Build completed successfully"
After:  "✅ Build completed successfully"

Before: "Type errors found"  
After:  "🚨 Type errors found"

Before: "Installing dependencies"
After:  "⏳ Installing dependencies"
```

## 🔧 設定詳細

### Hook 設定ファイル

セットアップ後、Claude Code 設定 (`~/.config/claude-code/settings.json`) に以下が追加されます：

```json
{
  "mcpServers": {
    "ccnotify": {
      "command": "node",
      "args": ["/path/to/ccnotify/dist/index.js"]
    }
  },
  "hooks": {
    "Notification": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "node /path/to/ccnotify/hooks/notification-hook.js"
          }
        ]
      }
    ]
  }
}
```

### Hook スクリプト構成

```
hooks/
├── notification-hook.js           # メインの通知Hook
├── legacy-post-bash-hook.js      # 旧版（バックアップ）
├── legacy-pre-edit-hook.js       # 旧版（バックアップ）
└── legacy-completion-hook.js     # 旧版（バックアップ）
```

## 🎛️ カスタマイズ

### 音のカスタマイズ

`hooks/notification-hook.js` 内の `soundMap` を編集：

```javascript
const soundMap = {
  'success': 'Glass',    // 成功音を変更
  'error': 'Basso',      // エラー音を変更  
  'warning': 'Sosumi',   // 警告音を変更
  'info': 'Blow',        // 情報音を変更
  'progress': 'Tink'     // 進行音を変更
};
```

### 通知フィルタリング

不要な通知をスキップする条件を追加：

```javascript
function shouldSkipNotification(title, message) {
  const skipPatterns = [
    /debug/i, /verbose/i, /trace/i,
    /internal/i, /system/i,
    /your-custom-pattern/i  // カスタムパターン追加
  ];
  
  const content = `${title} ${message}`.toLowerCase();
  return skipPatterns.some(pattern => pattern.test(content));
}
```

### 新しい通知タイプの追加

カスタム通知パターンを追加：

```javascript
// analyzeNotificationContent 関数内に追加
const deployPatterns = [
  /deploy/i, /deployment/i, /publish/i,
  /🚀/i, /📦/i
];

if (deployPatterns.some(pattern => pattern.test(content))) {
  return 'success'; // またはカスタム音タイプ
}
```

## 🛠️ トラブルシューティング

### 通知が表示されない

1. **Claude Code の再起動**
   ```bash
   # Claude Code を完全に終了して再起動
   ```

2. **Hook スクリプトの実行権限確認**
   ```bash
   chmod +x /path/to/ccnotify/hooks/notification-hook.js
   ```

3. **macOS 通知権限の確認**
   - システム環境設定 → 通知とフォーカス
   - ターミナル/Claude Code の通知を許可

### Hook が動作しない

1. **パスの確認**
   ```bash
   # Hook スクリプトが存在することを確認
   ls -la /path/to/ccnotify/hooks/notification-hook.js
   ```

2. **デバッグログの有効化**
   ```javascript
   // notification-hook.js の main() 関数内に追加
   console.log('Hook triggered:', notificationTitle, notificationMessage);
   ```

3. **設定ファイルの確認**
   ```bash
   cat ~/.config/claude-code/settings.json | grep -A5 hooks
   ```

### Hook の無効化

一時的に Hook を無効にしたい場合：

```json
{
  "hooks": {
    // "Notification": [...] をコメントアウトまたは削除
  }
}
```

## 🔍 動作原理

```
Claude Code 通知送信
         ↓
Notification Hook イベント発火
         ↓  
notification-hook.js 実行
         ↓
通知内容を解析
         ↓
適切な音とエモジを決定
         ↓
拡張された通知を表示
```

## 📈 利点

### シンプルさ
- **1つのHookファイルのみ**
- **自動設定スクリプト**
- **手動の通知呼び出し不要**

### 自動化
- **全通知が自動拡張**
- **内容ベースの音選択**
- **エモジ自動追加**

### 保守性
- **既存コードの変更不要**
- **Claude Code の標準通知を活用**
- **設定ファイル1つで管理**

## 📚 関連ドキュメント

- [README.md](./README.md) - ccnotify の基本使用方法
- [Claude Code Hooks公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/hooks)

---

これで Claude Code での開発がより快適で効率的になります！🎉