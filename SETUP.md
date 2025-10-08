# 🚀 Setup Guide

This guide will help you get Stack Online Tools running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** ([Download](https://git-scm.com/))

## Step-by-Step Setup

### 1. Fix npm Permission Issues (macOS/Linux)

If you encounter npm permission errors, run:

```bash
sudo chown -R $(whoami) ~/.npm
```

This fixes npm cache ownership issues.

### 2. Install Dependencies

Choose one of the following methods:

#### Using npm:
```bash
npm install
```

#### Using yarn (alternative):
```bash
# Install yarn if you don't have it
npm install -g yarn

# Install dependencies
yarn install
```

#### Using pnpm (alternative):
```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Stack Online Tools landing page!

## Common Issues & Solutions

### Issue: "npm ERR! code EACCES"

**Solution:** Run the permission fix command:
```bash
sudo chown -R $(whoami) ~/.npm
```

### Issue: "Module not found" errors

**Solution:** Delete node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:** Either:
1. Stop the process using port 3000, or
2. Run on a different port:
```bash
PORT=3001 npm run dev
```

### Issue: TypeScript errors

**Solution:** Ensure you're using the correct Node.js version:
```bash
node --version  # Should be 18.17 or higher
```

## Project Structure Overview

```
stackonlinetools/
├── app/              # Next.js pages and routes
├── components/       # React components
│   ├── home/        # Landing page components
│   ├── layout/      # Header, footer, navigation
│   ├── tools/       # Individual tool components
│   └── ui/          # Reusable UI components
├── lib/             # Utility functions and stores
├── types/           # TypeScript type definitions
└── public/          # Static assets
```

## Development Workflow

### Adding a New Tool

1. **Add metadata** in `lib/tool-registry.ts`
2. **Create component** in `components/tools/your-tool.tsx`
3. **Register route** in `app/tool/[slug]/page.tsx`
4. **Test** at `/tool/your-tool-slug`

### Testing Dark Mode

Click the moon/sun icon in the header to toggle themes.

### Testing Mobile View

1. Open DevTools (F12)
2. Click device toolbar icon
3. Select a mobile device

## Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
```

## Next Steps

- 📖 Read the [README.md](README.md) for detailed documentation
- 🎨 Customize colors in `app/globals.css`
- 🛠️ Add new tools following the plugin architecture
- 🚀 Deploy to Vercel or your preferred hosting platform

## Getting Help

- Check existing issues: [GitHub Issues](https://github.com/yourusername/stackonlinetools/issues)
- Join our community: [Discord/Slack link]
- Read the docs: [Documentation](https://docs.stackonlinetools.com)

---

Happy coding! 🎉

