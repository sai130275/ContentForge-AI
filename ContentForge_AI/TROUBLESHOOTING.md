# ContentForge AI - Troubleshooting Guide

## TypeScript Errors in IDE

### Issue
You may see TypeScript errors in your IDE like:
- "Cannot find module 'react'"
- "Cannot find module 'lucide-react'"
- "Property 'state' does not exist on type 'ErrorBoundary'"

### Cause
These are false positive errors from the TypeScript language server when `node_modules` is not present or not properly indexed by the IDE.

### Solution

#### 1. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- react
- react-dom
- lucide-react
- All other dependencies

#### 2. Restart TypeScript Server
In VS Code:
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

#### 3. Reload IDE
If the above doesn't work:
1. Close and reopen your IDE
2. Or reload the window (VS Code: `Cmd+R` or `Ctrl+R`)

### Verification
After installing dependencies, run:
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Build the project
npm run build

# Start development server
npm run dev
```

If these commands succeed, your code is correct and the IDE errors are false positives.

---

## Common Issues

### 1. Port Already in Use

**Error**: `Port 8080 is already in use`

**Solution**:
```bash
# Find and kill the process using port 8080
lsof -ti:8080 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### 2. Module Not Found

**Error**: `Cannot find module '@/components/...'`

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 3. Build Fails

**Error**: Build fails with errors

**Solution**:
```bash
# Check for actual TypeScript errors
npx tsc --noEmit

# Clear build cache
rm -rf dist
npm run build
```

### 4. Environment Variables Not Working

**Error**: Environment variables are undefined

**Solution**:
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your values
# Restart dev server
npm run dev
```

---

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd contentforge-ai

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### Verify Setup
```bash
# Run linting
npm run lint

# Run tests
npm test

# Build for production
npm run build
```

---

## IDE Configuration

### VS Code Recommended Extensions
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense

### VS Code Settings
Add to `.vscode/settings.json`:
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Performance Issues

### Slow Development Server

**Solution**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

### Large Bundle Size

**Check bundle size**:
```bash
npm run build
# Check dist/ folder size
```

**Optimize**:
- Lazy load components
- Use dynamic imports
- Remove unused dependencies

---

## Deployment Issues

### Build Succeeds Locally but Fails in CI/CD

**Solution**:
1. Check Node.js version matches
2. Ensure all dependencies are in `package.json`
3. Check environment variables are set
4. Review build logs for specific errors

### Environment Variables Not Working in Production

**Solution**:
1. Ensure variables are prefixed with `VITE_`
2. Set variables in deployment platform
3. Rebuild after changing variables

---

## Getting Help

### Check Documentation
- [README.md](./README.md) - Project overview
- [requirements.md](./requirements.md) - Feature specifications
- [design.md](./design.md) - Architecture details
- [UPGRADE_SUMMARY.md](./UPGRADE_SUMMARY.md) - Recent changes

### Debug Mode
Enable debug mode in `.env.local`:
```
VITE_ENABLE_DEBUG=true
```

### Report Issues
When reporting issues, include:
1. Error message (full stack trace)
2. Steps to reproduce
3. Environment (OS, Node version, npm version)
4. Browser (if applicable)

---

## FAQ

### Q: Why do I see TypeScript errors in my IDE?
**A**: Install dependencies with `npm install` and restart your TypeScript server.

### Q: How do I add new environment variables?
**A**: Add them to `.env.example` and `.env.local`, prefixed with `VITE_`.

### Q: How do I optimize bundle size?
**A**: Use lazy loading, dynamic imports, and remove unused dependencies.

### Q: How do I deploy to production?
**A**: Run `npm run build` and deploy the `dist/` folder to your hosting platform.

### Q: How do I add new pages?
**A**: Create a new file in `src/pages/`, add route in `App.tsx`, and lazy load it.

### Q: How do I add new components?
**A**: Create a new file in `src/components/`, export the component, and import where needed.

---

**Last Updated**: February 15, 2026  
**Version**: 2.0.0
