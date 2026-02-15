# ContentForge AI

## Overview

ContentForge AI is an intelligent AI-powered productivity platform designed for developers and builders. It acts as an AI reasoning layer over your work, tracking patterns, detecting friction points, and generating actionable daily plans to help you ship better code every day.

## Features

- **Smart Activity Tracking** - Automatically capture and analyze your development workflow
- **AI-Powered Insights** - Get intelligent recommendations to eliminate bottlenecks
- **Daily Planning** - Receive personalized task recommendations based on your patterns
- **Productivity Analytics** - Track your coding time, debugging sessions, and overall efficiency
- **GitHub Integration** - Sync commits, issues, and PRs automatically
- **VS Code Extension** - Real-time telemetry and insights directly in your editor

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **AI**: OpenAI GPT-4 for insights and planning

## Getting Started

### Prerequisites

- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd contentforge-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
contentforge-ai/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── landing/    # Landing page components
│   │   └── ui/         # Reusable UI components (shadcn/ui)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── test/           # Test files
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Development

### Code Style

This project uses ESLint for code quality and consistency. Run `npm run lint` before committing changes.

### Testing

Tests are written using Vitest and React Testing Library. Run tests with:

```sh
npm test              # Run once
npm run test:watch    # Watch mode
```

## Deployment

Build the project for production:

```sh
npm run build
```

The optimized build will be in the `dist/` directory, ready to deploy to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ by the ContentForge AI team
