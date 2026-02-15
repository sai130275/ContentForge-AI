# ContentForge AI - Requirements Document

## Project Overview

ContentForge AI is an intelligent AI-powered productivity platform designed for developers and builders. It acts as an AI reasoning layer over a developer's work, tracking patterns, detecting friction points, and generating actionable daily plans to help ship better code every day.

## Core Features

### 1. Landing Page
- Modern, developer-focused design with dark theme
- Hero section with compelling value proposition
- "How It Works" section explaining the 3-step process (Capture → Analyze → Recommend)
- Features showcase highlighting key capabilities
- Call-to-action buttons for user signup
- Responsive design for all device sizes

### 2. Authentication System
- Google OAuth integration via Supabase Auth
- User profile management (email, display name, GitHub connection status)
- Protected routes for authenticated users
- Automatic redirect to dashboard after successful login
- Secure session management

### 3. Activity Tracking
- Manual activity logging via dashboard form
  - Task description
  - Duration in minutes
  - Errors encountered
  - Optional context/notes
  - Auto-tagged source (manual/github/vscode)
- Activity history view with filtering and sorting
- Real-time activity updates

### 4. Dashboard

#### Panel 1: Today's Activity (Top)
- Stacked bar chart showing time distribution:
  - Coding time
  - Debugging time
  - Documentation time
- Summary statistics:
  - Total errors encountered
  - Build attempts
  - Active hours

#### Panel 2: AI Insights (Middle Left)
- Bottleneck detection and analysis
- Actionable insights and recommendations
- Tool and workflow suggestions
- Color-coded severity indicators
- Card-based layout for easy scanning

#### Panel 3: Productivity Score (Middle Right)
- Daily productivity score (0-100)
- Score calculation based on:
  - Time balance across activities
  - Error frequency
  - Task completion rate
- 7-day trend visualization
- Historical comparison

#### Panel 4: Tomorrow's Plan (Bottom)
- 3 high-impact tasks with checkboxes
- 1 learning task (30-60 minutes) with:
  - Topic recommendation
  - Estimated duration
  - Learning resources
- 1 reflection question for self-assessment

### 5. AI Integration

#### Analyzer Function
- Processes daily activity logs
- Returns structured JSON output:
  - Identified bottlenecks
  - Actionable insights
  - Tool recommendations
  - Pattern analysis
- Uses AI tool calling for structured output

#### Planner Function
- Inputs:
  - User goals and preferences
  - Today's activity data
  - Analyzer output
- Outputs:
  - Tomorrow's prioritized tasks
  - Learning task recommendation
  - Reflection question
- Uses AI tool calling for structured output

### 6. GitHub Integration
- GitHub OAuth setup and connection
- Automatic sync of:
  - Commits with timestamps
  - Issues and their status
  - Pull requests and reviews
- Activity entries auto-created from GitHub data
- Source tagged as "github"
- Sync status and controls on integrations page

### 7. VS Code Extension Support
- Telemetry endpoint (`/receive-telemetry`)
- Accepts POST requests with:
  - Active file time tracking
  - Terminal errors
  - Build/run attempts
  - Extension events
- API key-based authentication
- Data stored as activity entries with source "vscode"
- Setup documentation on integrations page

### 8. Settings & Integrations

#### Settings Page
- Profile management
  - Display name
  - Email (read-only)
  - Avatar
- Account preferences
  - Notification settings
  - Privacy controls
  - Data export

#### Integrations Page
- GitHub connection status
  - Connect/disconnect controls
  - Last sync timestamp
  - Sync now button
- VS Code extension setup
  - API key generation and management
  - Setup instructions
  - Connection status
- Future integration placeholders

## Technical Requirements

### Frontend
- React 18+ with TypeScript
- Vite for build tooling
- shadcn/ui component library
- Tailwind CSS for styling
- TanStack Query for data fetching
- React Router v6 for navigation

### Backend
- Supabase for:
  - Authentication (Google OAuth)
  - PostgreSQL database
  - Edge Functions for AI integration
  - Real-time subscriptions
  - Row Level Security (RLS)

### Database Schema

#### profiles
- user_id (UUID, primary key)
- email (text)
- display_name (text)
- github_connected (boolean)
- created_at (timestamp)
- updated_at (timestamp)

#### daily_activity
- id (UUID, primary key)
- user_id (UUID, foreign key)
- task (text)
- duration_min (integer)
- errors (integer)
- context (JSONB)
- source (enum: manual, github, vscode)
- timestamp (timestamp)

#### insights
- id (UUID, primary key)
- user_id (UUID, foreign key)
- date (date)
- bottlenecks (JSONB)
- insights (JSONB)
- tool_suggestions (JSONB)
- created_at (timestamp)

#### plans
- id (UUID, primary key)
- user_id (UUID, foreign key)
- date (date)
- tomorrow_tasks (JSONB)
- learning_task (JSONB)
- reflection_question (text)
- created_at (timestamp)

### Security
- Row Level Security on all tables
- Users can only access their own data
- API key authentication for VS Code extension
- Secure OAuth flows
- HTTPS only in production

### Performance
- Lazy loading for dashboard components
- Optimistic UI updates
- Efficient data caching with TanStack Query
- Debounced search and filters
- Code splitting for faster initial load

## User Experience

### Onboarding Flow
1. Land on homepage
2. Click "Get Started"
3. Sign in with Google
4. Brief welcome tour
5. Redirect to dashboard
6. Prompt to log first activity or connect integrations

### Daily Workflow
1. User logs activities throughout the day (or auto-synced)
2. At end of day, click "Generate Insights"
3. AI analyzes activities and generates insights
4. AI creates tomorrow's plan
5. User reviews and adjusts plan
6. Next day, user follows plan and logs new activities

## Success Metrics
- User engagement (daily active users)
- Activity logging frequency
- Insight generation usage
- Plan completion rate
- Integration adoption (GitHub, VS Code)
- User retention (7-day, 30-day)

## Future Enhancements
- Slack integration
- Jira/Linear integration
- Team collaboration features
- Custom AI prompts
- Advanced analytics
- Mobile app
- Browser extension
