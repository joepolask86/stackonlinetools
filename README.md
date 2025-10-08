# 🧰 Stack Online Tools

**All Online Tools in "One Box"** - A modern, fast, and privacy-first online utility platform with 100+ tools for developers, marketers, and creators.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎯 **100+ Free Tools** across 10+ categories
- ⚡ **Lightning Fast** - Sub-1-second page loads
- 🔒 **Privacy First** - Client-side processing where possible
- 🌙 **Dark Mode** - Seamless light/dark theme switching
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⌨️ **Keyboard Shortcuts** - Power user features (⌘K for search)
- 💾 **No Registration** - Use tools without signing up
- 🎨 **Modern UI** - Clean, accessible design with shadcn/ui

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Fix npm cache permissions (if needed)
sudo chown -R $(whoami) ~/.npm

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
stackonlinetools/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Home page
│   ├── tool/[slug]/         # Dynamic tool pages
│   └── globals.css          # Global styles with design tokens
├── components/
│   ├── home/                # Home page components
│   │   ├── hero.tsx
│   │   ├── tool-categories.tsx
│   │   └── featured-tools.tsx
│   ├── layout/              # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── theme-toggle.tsx
│   │   └── mobile-nav.tsx
│   ├── tools/               # Tool components
│   │   ├── tool-layout.tsx  # Shared tool layout
│   │   ├── case-converter.tsx
│   │   ├── word-counter.tsx
│   │   ├── base64-tool.tsx
│   │   └── json-formatter.tsx
│   ├── ui/                  # shadcn/ui components
│   └── providers/           # Context providers
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── tool-registry.ts    # Tool metadata and registry
│   └── store/              # Zustand stores
│       ├── favorites.ts
│       └── theme.ts
├── types/
│   └── tool.ts             # TypeScript interfaces
└── public/                 # Static assets
```

## 🛠️ Tech Stack

### Core

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### State & Data

- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Data Processing:**
  - lodash - Utility functions
  - crypto-js - Hashing and encryption
  - papaparse - CSV parsing
  - qrcode - QR code generation
  - date-fns - Date manipulation
  - colord - Color manipulation

### Deployment

- **Hosting:** Vercel / Cloudflare Pages
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Better-Auth
- **Analytics:** Matomo (privacy-friendly)

## 🎨 Design System

### Colors (Light Mode)

- **Primary:** `#2563EB` (Blue)
- **Background:** `#FFFFFF` (White)
- **Surface:** `#F8FAFC` (Light Gray)
- **Text Primary:** `#0F172A` (Dark Slate)
- **Text Secondary:** `#475569` (Slate)

### Colors (Dark Mode)

- **Primary:** `#3B82F6` (Lighter Blue)
- **Background:** `#0F172A` (Dark Slate)
- **Surface:** `#1E293B` (Slate)
- **Text Primary:** `#F8FAFC` (Light Gray)
- **Text Secondary:** `#CBD5E1` (Light Slate)

### Typography

- **Font Family:** Inter (Sans-serif), JetBrains Mono (Monospace)
- **Base Size:** 16px
- **Headings:** 24px - 36px (responsive)

## 📦 Available Tools

### Text Tools (4)
- Case Converter ✅
- Word Counter ✅
- Text Diff Checker
- Lorem Ipsum Generator

### Encoding & Decoding (7)
- Base64 Encoder/Decoder ✅
- URL Encoder/Decoder
- HTML Entity Encoder
- JWT Decoder
- QR Code Generator
- Hash Generator
- UUID Generator

### JSON & Data (3)
- JSON Formatter ✅
- JSON to CSV
- CSV to JSON

### Code & Developer (4)
- Code Formatter
- Code Minifier
- Regex Tester
- Color Picker

### SEO & Marketing (2)
- Meta Tag Generator
- URL Slug Generator

✅ = Currently implemented

## 🏗️ Tool Plugin Architecture

Adding a new tool is simple with our modular architecture:

### 1. Add Tool Metadata

```typescript
// lib/tool-registry.ts
{
  id: "my-tool",
  slug: "my-tool",
  name: "My Tool",
  description: "Description of my tool",
  category: "text",
  tags: ["tag1", "tag2"],
  icon: "IconName",
}
```

### 2. Create Tool Component

```tsx
// components/tools/my-tool.tsx
"use client";

export default function MyTool() {
  return (
    <div>
      {/* Tool UI */}
    </div>
  );
}
```

### 3. Register in Dynamic Routes

```tsx
// app/tool/[slug]/page.tsx
const toolComponents = {
  "my-tool": dynamic(() => import("@/components/tools/my-tool")),
};
```

## 🔑 Key Features Implementation

### Favorites & Recent Tools

Implemented using Zustand with localStorage persistence:

```typescript
import { useFavoritesStore } from "@/lib/store/favorites";

const { addFavorite, removeFavorite, isFavorite, recentTools } = useFavoritesStore();
```

### Dark Mode

Implemented using next-themes with smooth transitions:

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
```

### Copy to Clipboard & Download

Utility functions for common tool actions:

```typescript
import { copyToClipboard, downloadAsFile } from "@/lib/utils";
```

## 📝 Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🎯 Roadmap

### Phase 1: MVP (Current)
- ✅ Core infrastructure setup
- ✅ 4 essential tools implemented
- ✅ Basic UI/UX implementation
- ✅ Dark mode
- ✅ Mobile responsiveness
- ⏳ Search functionality
- ⏳ Favorites system

### Phase 2: Growth (Next 2-3 months)
- [ ] Expand to 30+ tools
- [ ] User accounts & sync
- [ ] SEO optimization
- [ ] Blog for tool guides
- [ ] Analytics integration

### Phase 3: Scale (Next 6-12 months)
- [ ] 100+ tools complete
- [ ] Batch processing capabilities
- [ ] Tool chaining feature
- [ ] Browser extension
- [ ] API access
- [ ] Premium features

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [10015.io](https://10015.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

**Joseph Twumasi** - Product Owner

- Twitter: [@yourusername](https://twitter.com/yourusername)
- Email: your.email@example.com

---

<p align="center">Made with ❤️ for developers, by developers</p>
