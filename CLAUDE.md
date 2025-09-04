# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for 梁来养 (Liang Laiyang) - a static website built with vanilla HTML, CSS, and JavaScript. The site tells the inspiring story of a journey from rural China to becoming a Technology Director, with features for multilingual support, theme switching, blog posts, and portfolio showcase.

## Tech Stack

- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- **No build process**: Direct file serving, no compilation or bundling required
- **Internationalization**: Custom i18n system supporting zh-CN, en, and zh-TW
- **Themes**: Light/dark mode switching
- **Blog System**: Client-side blog post loading from `js/blog-posts.js`

## Key Commands

### Local Development Server
```bash
# Python 3
python3 -m http.server 8000

# Node.js alternative
npx http-server
```
Then access at `http://localhost:8000`

### Deployment
- Direct file upload to any static hosting service
- GitHub Pages: Push to main branch
- No build step required - all files are production-ready

## Architecture & Key Files

### Core Structure
- `index.html` - Main single-page application
- `blog-detail.html` - Blog post detail page
- `js/main.js` - Core application logic, navigation, animations
- `js/i18n-complete.js` - Full internationalization translations
- `js/blog-posts.js` - Blog content database (184KB)
- `js/theme.js` - Theme switching logic
- `css/main.css` - Primary styles
- `css/fixes.css` - Browser compatibility fixes
- `css/ultra-loading.css` - Loading screen animations

### Important Patterns
1. **No JavaScript frameworks** - All functionality uses vanilla JS with DOM manipulation
2. **Event-driven architecture** - DOMContentLoaded initializes all modules
3. **CSS-first animations** - Uses CSS transitions/animations, JS only for triggers
4. **Client-side routing** - Hash-based navigation for sections (`#about`, `#skills`, etc.)
5. **Lazy loading** - Images and content loaded as needed
6. **Modular CSS** - Separate files for themes, animations, responsive design

### Blog System
- Blog posts stored in `js/blog-posts.js` as JavaScript objects
- Categories: `ai`, `tech`, `life`, `manage`
- Dynamic loading and filtering on client-side
- URL parameters for blog detail page navigation

### Internationalization
- Language switcher in header
- Translations in `js/i18n-complete.js`
- localStorage persistence for language preference
- Dynamic text replacement based on data attributes

## Development Guidelines

### When modifying JavaScript
- Maintain vanilla JS approach - no external libraries
- Follow existing event delegation patterns
- Keep functions small and single-purpose
- Cache DOM queries in the `elements` object

### When modifying CSS
- Follow existing BEM-like naming conventions
- Maintain CSS variables for theming
- Keep responsive breakpoints consistent
- Add browser prefixes where needed

### When adding content
- Blog posts: Add to `js/blog-posts.js` following existing structure
- Translations: Update all three language objects in `js/i18n-complete.js`
- Images: Optimize for web before adding