# lbenie.me

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/lbenie/deploys)

My personal bilingual portfolio and blog, built with [Astro](https://astro.build) 🚀

## 🌐 Live Site

Visit [lbenie.me](https://lbenie.me)

## ✨ Features

- 🌍 **Bilingual Support** - English and French content with seamless language switching
- ⚡ **Lightning Fast** - Built with Astro for optimal performance
- 📝 **Blog** - Technical articles and thoughts in both languages
- 🎨 **Modern UI** - Clean, accessible design with Tailwind CSS
- 🌙 **Dark Mode** - Automatic theme switching
- ♿ **Accessible** - WCAG compliant with semantic HTML
- 📱 **Responsive** - Works beautifully on all devices
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and sitemap
- 🚀 **Deploy Ready** - Configured for Netlify with CI/CD

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **i18n**: [astro-i18next](https://github.com/yassinedoghri/astro-i18next)
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Code Quality**: [Biome](https://biomejs.dev)
- **Deployment**: [Netlify](https://netlify.com)

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/lbenie/lbenie.git
cd lbenie

# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev

# Open http://localhost:4321
```

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Quality

```bash
# Run Biome linter
pnpm lint

# Format code with Biome
pnpm format

# Check code quality
pnpm check
```

## 📁 Project Structure

```
lbenie/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Content collections (blog posts, etc.)
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── astro.config.mjs     # Astro configuration
├── astro-i18next.config.mjs  # i18n configuration
├── biome.jsonc          # Biome configuration
├── tailwind.config.mjs  # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## 🌍 Internationalization

The site supports English (en) and French (fr) with automatic language detection and switching.

Content is organized by language:
- English: `/en/*`
- French: `/fr/*`

Default language is French with automatic redirection from root.

## 🚢 Deployment

This project is configured for deployment on Netlify:

1. Push changes to the `astro-migration` branch
2. Netlify automatically builds and deploys
3. Build command: `pnpm run build`
4. Publish directory: `dist`

## 📝 Adding Content

### Blog Posts

Create new blog posts in `src/content/blog/[lang]/`:

```markdown
---
title: "Your Post Title"
description: "Post description"
date: 2024-01-01
author: "Lucien Bénié"
tags: ["tag1", "tag2"]
---

Your content here...
```

## 🤝 Contributing

This is a personal portfolio, but if you find bugs or have suggestions, feel free to open an issue!

## 📄 License

See [LICENSE](LICENSE) file for details.

## 👨‍💻 About Me

I'm Lucien Bénié, a Staff Software Developer who loves coding and learning new things about the web.

- 🌐 Website: [lbenie.me](https://lbenie.me)
- 💼 LinkedIn: [lbenie](https://www.linkedin.com/in/lbenie/)
- 💻 GitHub: [@lbenie](https://github.com/lbenie)

---

Built with ❤️ using Astro
