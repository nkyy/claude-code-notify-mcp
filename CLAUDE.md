# CLAUDE Global Development Methodology

_Universal AI-Human Collaboration Principles for All Projects_

## 🎯 **Core Philosophy**

This document establishes universal principles for AI-human collaborative development that can be applied across any software project, regardless of technology stack, domain, or scale.

---

## 🔄 **Universal Development Methodologies**

### 1. **Vibe Coding Methodology**

```
Concept: Developer as director, AI as code generation partner
Application: Any AI-assisted development project
Value: Shift focus from implementation details to architecture and design
Key Principle: Natural language prompts drive development workflow
```

**Implementation Pattern:**

- Express intent in natural language
- AI translates to architectural decisions
- Human validates and refines
- Iterative improvement through conversation

### 2. **Three-Phase Development Workflow**

```
Phase 1: AI-led Requirements Definition & Interview
Phase 2: AI-driven Implementation
Phase 3: Red-Green-Refactor Quality Assurance
```

**Universal Applications:**

- Web development
- Mobile applications
- API design
- Data processing systems
- Infrastructure automation

**Benefits:**

- Consistent quality through structured phases
- Reduced requirements ambiguity
- Built-in quality assurance

### 3. **Three-Agent Collaboration Framework**

```
Human: Express desires, needs, priorities (no technical constraints)
Primary AI: Logical design, implementation, architectural consistency, QA
Research AI: Investigation, technical research, latest information gathering
```

**Role Distribution:**

- **Human**: Vision and validation
- **Primary AI**: Design and implementation
- **Research AI**: Knowledge and exploration

**Applications:**

- Complex technical projects
- R&D initiatives
- New technology adoption
- Cross-functional team collaboration

---

## 🧠 **Learning & Improvement Systems**

### 4. **Self-Improvement Learning Cycles**

```
Feedback → Root Cause Analysis → Pattern Extraction → Protocol Update → Future Application
```

**Implementation Protocol:**

1. **Immediate Acknowledgment**: Recognize feedback as improvement input
2. **Root Cause Analysis**: Identify what led to sub-optimal approach
3. **Pattern Extraction**: Generalize learning beyond specific case
4. **Protocol Update**: Update documentation with new insights
5. **Future Application**: Apply learning to subsequent interactions

**Applications:**

- Team learning processes
- Process improvement
- Continuous delivery
- Quality enhancement

### 5. **Efficient Desire Extraction Process**

```
Stage 1: Intuitive Capture - "What feels wrong?"
Stage 2: Scenario Specification - "When does this happen?"
Stage 3: Ideal State Definition - "What would perfect look like?"
```

**Example Flow:**

```
User: "I want it to be more user-friendly"
AI: "Which operations feel cumbersome to you?"
User: "Usually first thing in the morning and during lunch break"
AI: "Ideally, you'd login once in the morning and stay logged in until lunch?"
```

**Applications:**

- Requirements gathering
- UX design
- Product planning
- Customer interviews

### 6. **Memory Management & Session Continuity**

```
Persistent Learning Structure:
project-memory/
├── user-preferences.md      # User patterns and preferences
├── implementation-log.md    # Implementation history and decisions
├── feedback-summary.md      # User feedback and satisfaction patterns
└── lessons-learned.md       # Extracted insights and improvements

Session State Preservation:
.claude-session/
├── current-state.json       # Latest work state
├── session-history/         # Historical sessions
├── pending-tasks.json       # Incomplete tasks
└── context-summary.md       # Contextual summary
```

**Auto-restoration Features:**

- Automatically detect previous work state
- Restore context with conversation history
- Generate continuation prompts
- Maintain development flow across interruptions

**Applications:**

- Long-term projects
- Team knowledge management
- Customer relationship management
- Cross-session state management

---

## ⚡ **Efficiency Optimization Protocols**

### 7. **Token Efficiency Protocol**

```
Internal Processing: English (efficiency)
User Communication: Native language (UX)
Documentation: Mixed (context-appropriate)
```

**Cost Optimization Strategy:**

- Minimize token usage in AI-to-AI communication
- Maximize clarity in human-facing outputs
- Balance efficiency with comprehension

**Applications:**

- Multilingual projects
- International teams
- Cost optimization
- Performance tuning

### 8. **Design Validation Protocol**

```
1. Competitive Analysis
2. Technical Research
3. Architecture Validation
4. Implementation Planning
5. User Feedback Integration
```

**Validation Checklist:**

- [ ] Market research completed
- [ ] Technical feasibility confirmed
- [ ] Architecture reviewed
- [ ] Implementation strategy defined
- [ ] User validation obtained

**Applications:**

- Product design
- Technology selection
- Architecture decisions
- Feature prioritization

### 9. **Scope Alignment Protocol**

```
1. Identify immediate use case
2. Design for current needs
3. Architect for future scale
4. Implement incrementally
5. Validate with real usage
```

**Implementation Strategy:**

- Start with minimal viable solution
- Design extensible architecture
- Implement in phases
- Validate assumptions early
- Scale based on proven value

**Applications:**

- MVP development
- Technical debt management
- Phased releases
- Risk mitigation

---

## 🎯 **Quality Assurance & Completeness**

### 10. **AI Stack Completeness Protocol**

```
Essential Components Checklist:
- [ ] LLM Integration
- [ ] Vector Database (RAG)
- [ ] Caching Strategy
- [ ] Monitoring/Metrics
- [ ] Fine-tuning Capability
- [ ] Multi-model Support
```

**Evaluation Framework:**

- Core functionality coverage
- Performance optimization
- Scalability considerations
- Monitoring and observability
- Maintenance and updates

**Applications:**

- AI system design
- Technology stack evaluation
- Architecture review
- Capability assessment

### 11. **Continuous Improvement Principles**

```
1. Fail Fast, Learn Faster - Every mistake is improvement data
2. Meta-Learning - Apply our own methodologies to ourselves
3. User as Teacher - Every interaction contains improvement signals
4. Documentation as Memory - Record learnings for compound improvement
5. Pattern Recognition - Extract generalizable insights from specific feedback
```

**Implementation Guidelines:**

- Embrace failures as learning opportunities
- Apply improvement methods recursively
- Treat user feedback as training data
- Maintain persistent learning records
- Look for patterns across interactions

**Applications:**

- Agile development
- DevOps practices
- Quality improvement
- Team growth
- Process optimization

---

## 🏗️ **Clean Architecture for AI Development**

### Robert C. Martin思想に基づく設計原則

```
依存性の法則: 内側の円は外側の円について何も知らない
ビジネスロジックがアーキテクチャの中心
フレームワークは詳細、ビジネスは本質
```

**AI開発に最適化されたClean Architecture:**

```
🎯 Entities (Enterprise Business Rules)
  ↑
🔧 Use Cases (Application Business Rules)  
  ↑
🔌 Interface Adapters (Controllers, Gateways, Presenters)
  ↑
📦 Frameworks & Drivers (Web, DB, External Interfaces)
```

### **AI実装戦略**

#### 1. **Screaming Architecture**
```
プロジェクト構造がその目的を叫ぶ
src/
├── user-management/     # 何をするかが明確
├── notification/        # ビジネス機能中心
├── analytics/          # フレームワーク中心ではない
└── shared/
    ├── entities/       # 中心的ビジネスルール
    ├── interfaces/     # 抽象化
    └── infrastructure/ # 実装詳細
```

#### 2. **Dependency Inversion for AI**
```typescript
// ❌ 依存が逆転していない
class UserService {
  private db = new PostgreSQLRepository(); // 具象に依存
}

// ✅ Clean Architecture準拠
class UserService {
  constructor(private userRepo: UserRepository) {} // 抽象に依存
}
```

#### 3. **Plugin Architecture Pattern**
```
Core Business Logic (安定)
    ↑
Interface (契約)
    ↑
Plugin Implementation (変更可能)
```

### **AI開発における利点**

1. **テスタビリティ**: 各層が独立してテスト可能
2. **理解しやすさ**: 依存関係が明確
3. **変更容易性**: 外側の変更が内側に影響しない
4. **フレームワーク独立性**: ビジネスロジックが保護される

### **実装ガイドライン**

#### Phase 1: Entities設計
- ビジネスの核となるルールを定義
- フレームワークから独立
- 最も安定した層

#### Phase 2: Use Cases設計  
- アプリケーション固有のビジネスルール
- Entitiesのオーケストレーション
- 入出力データ構造の定義

#### Phase 3: Interface Adapters
- 外部からの入力をUse Casesに変換
- Use Casesの出力を外部形式に変換
- Controllers, Presenters, Gateways

#### Phase 4: Frameworks & Drivers
- 具体的な実装詳細
- データベース、Web フレームワーク
- 外部API統合

### **SOLID原則の適用**

```
S - Single Responsibility: 各クラスは一つの変更理由のみ
O - Open/Closed: 拡張に開放、修正に閉鎖
L - Liskov Substitution: 派生クラスは基底クラスと置換可能
I - Interface Segregation: クライアント固有のインターフェース
D - Dependency Inversion: 抽象に依存、具象に依存しない
```

---

## 🧩 **Modern Development Methodologies**

### Martin Fowler's Refactoring & Design Patterns

#### **Evolutionary Architecture**
```
Small, frequent changes > Big design upfront
継続的リファクタリング > 完璧な初期設計
Code as Communication > Code as Implementation
```

**AI実装での適用:**

1. **Red-Green-Refactor Cycle**
```
🔴 Red: テストを書く（失敗する）
🟢 Green: 最小限の実装で通す  
🔵 Refactor: 設計を改善
```

2. **Microcommits Pattern**
```
Each commit should tell a story:
- Add failing test for user validation
- Make test pass with minimal code
- Extract validation logic to domain service
- Add edge case handling
```

3. **Fowlerのリファクタリングパターン**
```typescript
// Extract Method
const validateUser = (user: User) => {
  return isValidEmail(user.email) && 
         isValidAge(user.age) && 
         isValidName(user.name);
}

// Replace Magic Number with Named Constant
const MAX_RETRY_ATTEMPTS = 3;
const CACHE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
```

### t-wada's Testing Philosophy

#### **テストの構造化原則**

1. **Given-When-Then Pattern**
```typescript
describe('UserService', () => {
  it('should create user when valid data provided', () => {
    // Given (前提条件)
    const validUserData = { name: 'John', email: 'john@example.com' };
    const mockRepo = new MockUserRepository();
    
    // When (実行)
    const result = userService.createUser(validUserData);
    
    // Then (検証)
    expect(result.isSuccess).toBe(true);
    expect(mockRepo.savedUser).toEqual(validUserData);
  });
});
```

2. **テストダブルの適切な使用**
```typescript
// Stub: 決まった値を返す
const stubEmailService = {
  send: () => Promise.resolve(true)
};

// Mock: 呼び出しを検証
const mockLogger = {
  log: jest.fn(),
  error: jest.fn()
};

// Spy: 既存オブジェクトの監視
const emailServiceSpy = jest.spyOn(emailService, 'send');
```

3. **テストの独立性とDRY原則**
```typescript
// ❌ テスト間の依存
let globalUser: User;
test('create user', () => {
  globalUser = createUser(); // 次のテストに影響
});

// ✅ 各テストが独立
describe('User operations', () => {
  let userService: UserService;
  
  beforeEach(() => {
    userService = new UserService(new MockRepository());
  });
});
```

### Kent C. Dodds' Testing Trophy & Best Practices

#### **Testing Trophy優先度**

```
           🏆 E2E Tests (少数、高信頼性)
         /   \
    🥈 Integration Tests (中程度)
   /     \
🥉 Unit Tests (多数、高速)
Static Analysis (型チェック、リント)
```

**AI実装での適用:**

1. **Testing Trophy Strategy**
```typescript
// Static Analysis (型安全性)
type User = {
  id: string;
  email: string;
  name: string;
}

// Unit Tests (純粋関数、ビジネスロジック)
const calculateTax = (amount: number, rate: number): number => {
  return amount * rate;
}

// Integration Tests (複数モジュールの協調)
const createUserWithNotification = async (userData: UserData) => {
  const user = await userService.create(userData);
  await notificationService.sendWelcome(user.email);
  return user;
}

// E2E Tests (ユーザージャーニー全体)
test('user can register and receive welcome email', async () => {
  await page.goto('/register');
  await page.fill('[data-testid=email]', 'test@example.com');
  await page.click('[data-testid=submit]');
  await expect(page.locator('[data-testid=success]')).toBeVisible();
});
```

2. **Kent C. Doddsのテスト原則**

```typescript
// ❌ Implementation Details をテストしない
expect(component.state.isLoading).toBe(true);

// ✅ User Behavior をテストする
expect(screen.getByText('Loading...')).toBeInTheDocument();

// ❌ モックしすぎない
const mockEverything = jest.fn(() => mockResult);

// ✅ 必要最小限のモック
const mockApiCall = jest.fn();
```

3. **"Write tests. Not too many. Mostly integration."**
```
Unit Tests: 20-30% (複雑なビジネスロジック)
Integration Tests: 50-60% (モジュール間の協調)
E2E Tests: 10-20% (クリティカルなユーザーフロー)
```

### **統合された開発フロー**

#### **AI-Driven Development Cycle**

```
1. 📝 Write Failing Test (Kent C. Dodds)
   ↓
2. 🟢 Make It Work (Uncle Bob)
   ↓  
3. 🔵 Make It Right (Martin Fowler)
   ↓
4. 🧪 Verify Behavior (t-wada)
   ↓
5. 🚀 Deploy Small (Fowler's CI/CD)
```

#### **Quality Gates**

```typescript
// 1. Static Analysis
npm run typecheck && npm run lint

// 2. Unit Tests  
npm run test:unit

// 3. Integration Tests
npm run test:integration

// 4. E2E Tests (Critical paths only)
npm run test:e2e

// 5. Performance Tests
npm run test:performance
```

---

## 📁 **Implementation Patterns**

### 12. **Feature File Management**

```
Dedicated directory for specification files
Natural language specifications to direct implementation conversion
Version control for requirement evolution
```

**Structure Example:**

```
features/
├── user-authentication.feature
├── data-processing.feature
└── integration-apis.feature
```

**Applications:**

- BDD development
- Test-driven development
- Requirements management
- Documentation as code

### 13. **Session State Preservation**

```
State Management Structure:
.session-state/
├── current-context.json     # Current work context
├── interaction-history/     # Previous sessions
├── pending-actions.json     # Incomplete tasks
├── learned-patterns.md      # Accumulated insights
└── user-preferences.json    # Personalization data
```

**Restoration Capabilities:**

- Automatic context recovery
- Seamless session transitions
- Knowledge accumulation
- Preference learning

**Applications:**

- Development environments
- Team collaboration tools
- Project management systems
- Customer service platforms

---

## 📋 **Instruction Execution Protocol**

### 14. **Self-Driving Instruction Execution Process**

```
True Self-Driving = Following instructions while proactively solving problems
Reckless Driving = Ignoring instructions and making arbitrary decisions
```

**Correct Self-Driving 5-Stage Process:**

#### Stage 1: Instruction Understanding & Validation
```
1. Verify instruction feasibility
2. Test required tools and resources
3. Check technical constraints and dependencies
```

#### Stage 2: Purpose & Benefit Clarification
```
When instruction purpose is unclear:
- "What is the goal of this instruction?"
- "What outcome do you expect?"
- "Why this approach over alternatives?"
```

#### Stage 3: Feasibility Verification
```
Technical constraint verification:
- Tool functionality testing
- Dependency confirmation
- Environment setup validation
```

#### Stage 4: Complete Plan Understanding & Agreement
```
Final confirmation before execution:
- Understanding of all steps
- Clear expected outcomes
- Risk assessment and mitigation
```

#### Stage 5: Complete Execution
```
No mid-course arbitrary changes:
- Execute all instructed steps
- No unauthorized shortcuts or modifications
- Report and consult when problems arise
```

**Self-Driving vs Reckless Driving Criteria:**

| Action | Self-Driving ✅ | Reckless Driving ❌ |
|--------|-----------------|---------------------|
| Instruction interpretation | Ask for clarification when unclear | Make arbitrary interpretations |
| Additional research | Within instruction scope | Ignore instructions to do own research |
| Problem handling | Report and consult | Change direction without permission |
| Completion criteria | Use instructed conditions | Use personal judgment |

**Implementation Example:**

```typescript
// ❌ Reckless Driving Pattern
async function executeTask(instruction: string) {
  // Judge based on existing knowledge without reading instruction
  if (seemsRedundant(instruction)) {
    return "Already completed similar task";
  }
  // Execute only part and quit
  const partialResult = doPartOfTask();
  return partialResult;
}

// ✅ Self-Driving Pattern  
async function executeTask(instruction: string) {
  // 1. Instruction validation
  const feasibility = await validateInstruction(instruction);
  if (!feasibility.possible) {
    throw new Error(`Cannot execute: ${feasibility.reason}`);
  }
  
  // 2. Purpose confirmation
  if (!feasibility.purposeClear) {
    await askForClarification("What is the expected outcome?");
  }
  
  // 3. Feasibility verification
  await verifyPrerequisites(instruction);
  
  // 4. Complete execution
  const result = await executeAllSteps(instruction);
  
  // 5. Completion report
  return formatCompletionReport(result);
}
```

**Learning Persistence:**

- Document immediately when this protocol is not followed
- Record failure patterns as concrete examples
- Connect to improvements for next time

---

## 🚀 **Implementation Guidelines**

### Getting Started

1. **Choose Applicable Patterns**: Select methodologies relevant to your project
2. **Establish Basic Structure**: Implement memory and session management
3. **Define Collaboration Roles**: Clarify human-AI responsibilities
4. **Set Up Learning Cycles**: Create feedback and improvement loops
5. **Iterate and Refine**: Continuously improve based on results

### Best Practices

- Start with simple implementations
- Focus on user value over technical complexity
- Maintain clear documentation
- Establish regular review cycles
- Adapt patterns to project context

### Success Metrics

- Reduced development time
- Improved code quality
- Enhanced user satisfaction
- Faster learning cycles
- Better requirement clarity

---

## 📚 **Pattern Library**

### Common Combinations

1. **Rapid Prototyping**: Vibe Coding + Three-Phase Workflow + Scope Alignment
2. **Quality-First Development**: Design Validation + Completeness Protocol + Improvement Cycles
3. **Collaborative Development**: Three-Agent Framework + Session Continuity + Memory Management
4. **Learning Organization**: Self-Improvement Cycles + Pattern Recognition + Documentation as Memory

### Customization Guidelines

- Adapt role definitions to team structure
- Modify protocols based on project constraints
- Scale patterns according to project size
- Integrate with existing development workflows

---

_This document evolves based on practical application and feedback. Contribute improvements through the Self-Improvement Learning Cycles methodology._

**Version**: 1.0  
**Last Updated**: 2025-01-28  
**Contributors**: Development teams using AI-human collaboration patterns
