# ContentForge AI - Design Document

## Architecture Overview

ContentForge AI follows a modern, serverless architecture with a React frontend and Supabase backend.

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  React + TypeScript + Vite + Tailwind + shadcn/ui          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API/Backend Layer                       │
│              Supabase (Auth, DB, Edge Functions)            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      External Services                       │
│         OpenAI API, GitHub API, VS Code Extension           │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── landing/              # Landing page components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── Footer.tsx
│   ├── dashboard/            # Dashboard components
│   │   ├── ActivityPanel.tsx
│   │   ├── InsightsPanel.tsx
│   │   ├── ProductivityPanel.tsx
│   │   └── PlanPanel.tsx
│   ├── activity/             # Activity tracking components
│   │   ├── ActivityForm.tsx
│   │   ├── ActivityList.tsx
│   │   └── ActivityCard.tsx
│   ├── integrations/         # Integration components
│   │   ├── GitHubConnect.tsx
│   │   └── VSCodeSetup.tsx
│   └── ui/                   # Reusable UI components (shadcn/ui)
├── pages/
│   ├── Index.tsx             # Landing page
│   ├── Dashboard.tsx         # Main dashboard
│   ├── Settings.tsx          # User settings
│   ├── Integrations.tsx      # Integrations management
│   └── NotFound.tsx          # 404 page
├── hooks/
│   ├── useAuth.ts            # Authentication hook
│   ├── useActivity.ts        # Activity data hook
│   ├── useInsights.ts        # Insights data hook
│   └── usePlans.ts           # Plans data hook
├── lib/
│   ├── supabase.ts           # Supabase client
│   ├── api.ts                # API utilities
│   └── utils.ts              # Helper functions
├── types/
│   ├── activity.ts           # Activity types
│   ├── insights.ts           # Insights types
│   └── plans.ts              # Plans types
└── App.tsx                   # Main app component
```

### State Management

- **TanStack Query** for server state management
  - Automatic caching and refetching
  - Optimistic updates
  - Background synchronization
- **React Context** for global UI state
  - Theme preferences
  - User session
  - Navigation state
- **Local component state** for UI interactions

### Routing

```typescript
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
  <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Backend Architecture

### Supabase Services

#### Authentication
- Google OAuth provider
- JWT-based session management
- Automatic token refresh
- Secure cookie storage

#### Database
- PostgreSQL with Row Level Security
- Real-time subscriptions for live updates
- Automatic timestamps
- Foreign key constraints

#### Edge Functions

**1. Analyzer Function** (`/functions/analyze-activity`)
```typescript
Input: {
  userId: string;
  date: string;
  activities: Activity[];
}

Output: {
  bottlenecks: Bottleneck[];
  insights: Insight[];
  toolSuggestions: ToolSuggestion[];
}
```

**2. Planner Function** (`/functions/generate-plan`)
```typescript
Input: {
  userId: string;
  date: string;
  todayActivities: Activity[];
  insights: Insights;
  userGoals?: string[];
}

Output: {
  tomorrowTasks: Task[];
  learningTask: LearningTask;
  reflectionQuestion: string;
}
```

**3. Telemetry Endpoint** (`/functions/receive-telemetry`)
```typescript
Input: {
  apiKey: string;
  userId: string;
  events: TelemetryEvent[];
}

Output: {
  success: boolean;
  activitiesCreated: number;
}
```

**4. GitHub Sync Function** (`/functions/sync-github`)
```typescript
Input: {
  userId: string;
  githubToken: string;
  since?: string;
}

Output: {
  commits: number;
  issues: number;
  pullRequests: number;
  activitiesCreated: number;
}
```

## Database Schema Design

### Entity Relationship Diagram

```
┌─────────────────┐
│    profiles     │
├─────────────────┤
│ user_id (PK)    │
│ email           │
│ display_name    │
│ github_connected│
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │
         │ 1:N
         │
    ┌────┴────────────────────────────────┐
    │                                     │
    ▼                                     ▼
┌─────────────────┐              ┌─────────────────┐
│ daily_activity  │              │    insights     │
├─────────────────┤              ├─────────────────┤
│ id (PK)         │              │ id (PK)         │
│ user_id (FK)    │              │ user_id (FK)    │
│ task            │              │ date            │
│ duration_min    │              │ bottlenecks     │
│ errors          │              │ insights        │
│ context         │              │ tool_suggestions│
│ source          │              │ created_at      │
│ timestamp       │              └─────────────────┘
└─────────────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│     plans       │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ date            │
│ tomorrow_tasks  │
│ learning_task   │
│ reflection_q    │
│ created_at      │
└─────────────────┘
```

### Row Level Security Policies

```sql
-- profiles table
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- daily_activity table
CREATE POLICY "Users can view own activities"
  ON daily_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON daily_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- insights table
CREATE POLICY "Users can view own insights"
  ON insights FOR SELECT
  USING (auth.uid() = user_id);

-- plans table
CREATE POLICY "Users can view own plans"
  ON plans FOR SELECT
  USING (auth.uid() = user_id);
```

## AI Integration Design

### OpenAI Integration

**Model**: GPT-4 Turbo
**Features Used**: Function calling for structured output

#### Analyzer Prompt Template
```
You are an AI productivity analyst. Analyze the following developer activities and identify:
1. Bottlenecks (repeated errors, time sinks)
2. Actionable insights (what's working, what's not)
3. Tool suggestions (libraries, workflows, practices)

Activities:
{activities_json}

Return structured JSON with bottlenecks, insights, and tool_suggestions arrays.
```

#### Planner Prompt Template
```
You are an AI productivity planner. Based on today's activities and insights, create a plan for tomorrow:
1. 3 high-impact tasks (prioritized by value and feasibility)
2. 1 learning task (30-60 min, addressing a detected gap)
3. 1 reflection question (for self-assessment)

Today's Activities:
{activities_json}

Insights:
{insights_json}

User Goals:
{user_goals}

Return structured JSON with tomorrow_tasks, learning_task, and reflection_question.
```

## UI/UX Design

### Design System

#### Color Palette
- **Primary**: Vibrant blue (#3B82F6) - Actions, highlights
- **Accent**: Purple (#8B5CF6) - Secondary actions, accents
- **Background**: Dark gray (#0A0A0A) - Main background
- **Card**: Slightly lighter gray (#1A1A1A) - Card backgrounds
- **Border**: Subtle gray (#2A2A2A) - Borders and dividers
- **Text**: White (#FFFFFF) - Primary text
- **Muted**: Gray (#A0A0A0) - Secondary text

#### Typography
- **Headings**: Inter, bold, tracking-tight
- **Body**: Inter, regular
- **Code**: JetBrains Mono, monospace

#### Spacing
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

#### Components
- Rounded corners: 8-12px
- Shadows: Subtle, colored (primary/5)
- Transitions: 200ms ease
- Hover states: Scale 1.02, border color change

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│                        Navbar                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │         Today's Activity (Stacked Bar Chart)      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─────────────────────────┐ ┌─────────────────────┐  │
│  │                         │ │                     │  │
│  │     AI Insights         │ │  Productivity Score │  │
│  │   (Card Layout)         │ │   (Gauge + Chart)   │  │
│  │                         │ │                     │  │
│  └─────────────────────────┘ └─────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │              Tomorrow's Plan                      │ │
│  │  • Task 1                                         │ │
│  │  • Task 2                                         │ │
│  │  • Task 3                                         │ │
│  │  📚 Learning: [Topic] (30-60 min)                │ │
│  │  💭 Reflection: [Question]                       │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### Activity Logging Flow
```
User Input → ActivityForm → Supabase Insert → Real-time Update → Dashboard Refresh
```

### Insights Generation Flow
```
User Clicks "Generate" → Fetch Activities → Call Analyzer Function → 
Store Insights → Call Planner Function → Store Plan → Update UI
```

### GitHub Sync Flow
```
User Connects GitHub → OAuth Flow → Store Token → 
Periodic Sync (Edge Function) → Fetch Commits/Issues/PRs → 
Create Activity Entries → Update Dashboard
```

### VS Code Telemetry Flow
```
VS Code Extension → POST /receive-telemetry → Validate API Key → 
Parse Events → Create Activity Entries → Real-time Update
```

## Security Considerations

1. **Authentication**: JWT tokens with automatic refresh
2. **Authorization**: Row Level Security on all tables
3. **API Keys**: Hashed storage, rate limiting
4. **Data Privacy**: User data isolated, GDPR compliant
5. **HTTPS**: Enforced in production
6. **Input Validation**: Server-side validation for all inputs
7. **Rate Limiting**: Applied to AI functions and telemetry endpoint

## Performance Optimization

1. **Code Splitting**: Lazy load dashboard components
2. **Image Optimization**: WebP format, lazy loading
3. **Caching**: TanStack Query with stale-while-revalidate
4. **Database Indexes**: On user_id, date, timestamp columns
5. **Edge Functions**: Deployed globally for low latency
6. **Bundle Size**: Tree shaking, minimal dependencies

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel/Netlify                       │
│              (Frontend Static Hosting)                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Supabase Cloud                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │   Auth       │ │  PostgreSQL  │ │Edge Functions│   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Testing Strategy

1. **Unit Tests**: Vitest for utility functions and hooks
2. **Component Tests**: React Testing Library
3. **Integration Tests**: Test API interactions
4. **E2E Tests**: Playwright for critical user flows
5. **Performance Tests**: Lighthouse CI

## Monitoring & Analytics

1. **Error Tracking**: Sentry for frontend errors
2. **Analytics**: PostHog for user behavior
3. **Performance**: Vercel Analytics
4. **Database**: Supabase built-in monitoring
5. **Logs**: Edge Function logs in Supabase dashboard
