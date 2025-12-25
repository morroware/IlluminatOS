# IlluminatOS! Roadmap

Future plans, enhancements, known issues, and improvement opportunities for IlluminatOS!.

---

## Table of Contents

1. [Current Status](#current-status)
2. [Short-Term Goals (Next Release)](#short-term-goals-next-release)
3. [Medium-Term Goals (3-6 Months)](#medium-term-goals-3-6-months)
4. [Long-Term Vision](#long-term-vision)
5. [Known Issues](#known-issues)
6. [Performance Improvements](#performance-improvements)
7. [Code Quality](#code-quality)
8. [Community Requests](#community-requests)
9. [Technical Debt](#technical-debt)

---

## Current Status

**Version:** 95.1
**Last Updated:** December 2024
**Status:** ✅ Stable

### Recently Completed

- ✅ **Scenario System** - Full implementation with 8 modules
- ✅ **Semantic Events** - App-specific event definitions for scenarios
- ✅ **Plugin Architecture** - FeatureBase, FeatureRegistry, PluginLoader
- ✅ **DVD Bouncer Plugin** - Example screensaver plugin
- ✅ **Features Settings App** - Runtime feature management UI
- ✅ **Comprehensive Documentation** - 6 documentation files covering all aspects

### Current Capabilities

- 29 fully-functional applications
- 7 core system features
- Scenario system with tutorial and challenge examples
- Plugin system with example implementation
- Virtual file system with persistence
- Multi-instance window management
- Achievement system
- Sound system with Web Audio API

---

## Short-Term Goals (Next Release)

### Version 95.2 - Polish & Performance

#### 🎯 High Priority

**1. Performance Optimization**
- [ ] Reduce console.log usage in production (231 instances found)
- [ ] Implement virtual scrolling for large file lists in My Computer
- [ ] Optimize desktop icon rendering (currently re-renders all on change)
- [ ] Lazy-load app modules (currently all loaded at boot)
- [ ] Debounce window resize handlers

**2. User Experience Improvements**
- [ ] Add keyboard navigation for Start Menu (arrow keys, Enter)
- [ ] Implement Ctrl+Z undo in Notepad and Paint
- [ ] Add drag-and-drop file upload to virtual file system
- [ ] Improve mobile touch experience (larger touch targets)
- [ ] Add window animations (minimize/maximize transitions)

**3. Bug Fixes**
- [ ] Fix window z-index issues when many windows open
- [ ] Resolve File System path handling edge cases
- [ ] Fix Clippy positioning on small screens
- [ ] Address localStorage quota exceeded errors
- [ ] Fix context menu positioning near screen edges

**4. Accessibility**
- [ ] Add ARIA labels to interactive elements
- [ ] Implement keyboard-only navigation
- [ ] Add screen reader support for notifications
- [ ] Improve color contrast ratios for WCAG compliance
- [ ] Add focus indicators for all interactive elements

#### 🔧 Medium Priority

**5. New Features**
- [ ] Add copy/paste support across apps (clipboard system)
- [ ] Implement app-to-app communication API
- [ ] Add notification center for system notifications
- [ ] Create network simulation for multiplayer scenarios
- [ ] Add time/date picker components

**6. Developer Experience**
- [ ] Create development mode with live reload
- [ ] Add TypeScript type definitions for API
- [ ] Create testing framework and example tests
- [ ] Add CLI tool for creating apps/plugins/scenarios
- [ ] Implement hot module replacement for faster development

---

## Medium-Term Goals (3-6 Months)

### Version 96.0 - Expanded Ecosystem

#### 📦 Application Additions

**New Productivity Apps**
- [ ] **Email Client** - Basic email simulation with inbox/outbox
- [ ] **Address Book** - Contact management application
- [ ] **Word Processor** - Rich text editor beyond Notepad
- [ ] **Spreadsheet** - Excel-like grid calculator
- [ ] **Presentation Tool** - Simple slide creator

**New Games**
- [ ] **Tetris** - Classic falling blocks game
- [ ] **Pac-Man** - Maze navigation game
- [ ] **Space Invaders** - Classic arcade shooter
- [ ] **Chess** - Turn-based board game with AI
- [ ] **Mah-Jong Solitaire** - Tile-matching puzzle

**New Utilities**
- [ ] **Registry Editor** - Simulated registry for advanced users
- [ ] **Event Viewer** - System event log viewer
- [ ] **Disk Manager** - Drive management and partitioning simulation
- [ ] **System Monitor** - Real-time resource usage graphs
- [ ] **Backup Tool** - Export/import file system

#### 🔌 Plugin System Enhancements

**Plugin Manager App**
- [ ] GUI for installing/removing plugins
- [ ] Plugin marketplace browser (if community grows)
- [ ] Plugin update checker
- [ ] Plugin dependency resolver
- [ ] Sandboxed plugin execution

**Plugin Capabilities**
- [ ] Allow plugins to register new apps
- [ ] Support for theme plugins
- [ ] Allow plugins to add Start Menu categories
- [ ] Enable plugins to extend existing apps
- [ ] Plugin permission system

#### 🎯 Scenario System Enhancements

**New Scenario Types**
- [ ] Multiplayer scenarios (simulated collaboration)
- [ ] Time-based challenges with leaderboards
- [ ] Branching narrative scenarios
- [ ] Procedurally generated scenarios
- [ ] Community-created scenario repository

**Scenario Editor**
- [ ] Visual scenario builder (drag-and-drop)
- [ ] Live preview mode
- [ ] Condition/action wizard
- [ ] Scenario validation and testing tools
- [ ] Export/import scenario bundles

#### 🎨 Theming System

**Multiple OS Themes**
- [ ] Windows 98 theme
- [ ] Windows XP theme (Luna and Classic)
- [ ] Windows 2000 Professional theme
- [ ] Mac OS 9 theme
- [ ] Custom theme creator

**Customization Options**
- [ ] Color scheme editor
- [ ] Wallpaper gallery
- [ ] Icon pack support
- [ ] Font customization
- [ ] Sound scheme editor

---

## Long-Term Vision

### Version 97.0+ - Advanced Features

#### 🌐 Network Simulation

**Simulated Internet**
- [ ] Browser with functioning "websites" (static or simulated)
- [ ] Email server simulation
- [ ] FTP client and server
- [ ] Telnet/SSH simulation
- [ ] Network configuration tools

**Multi-User Simulation**
- [ ] Multiple user accounts
- [ ] User login/logout
- [ ] User permissions and privileges
- [ ] Shared folders and resources
- [ ] User profile customization

#### 🤖 AI Integration

**AI Assistant Evolution**
- [ ] Upgrade Clippy with LLM backend (optional)
- [ ] Context-aware help system
- [ ] Natural language command execution
- [ ] AI-powered scenario adaptation
- [ ] Smart file organization suggestions

#### 🎓 Educational Platform

**Learning Management**
- [ ] Course creation tools
- [ ] Progress tracking across scenarios
- [ ] Certificates of completion
- [ ] Skill trees and learning paths
- [ ] Teacher dashboard for monitoring students

#### 🏢 Enterprise Features

**Advanced Capabilities**
- [ ] Export scenarios as standalone packages
- [ ] SCORM compliance for LMS integration
- [ ] Analytics and telemetry (opt-in)
- [ ] White-labeling options
- [ ] Server-side scenario hosting

---

## Known Issues

### 🐛 Bugs

#### High Priority
- **Window Z-Index Conflicts** - When 15+ windows open, z-index can overlap incorrectly
  - Impact: Visual layering issues
  - Workaround: Close some windows
  - Status: Investigating

- **LocalStorage Quota** - Large file system can exceed 5MB localStorage limit
  - Impact: Can't save files or settings
  - Workaround: Clear old data
  - Status: Considering IndexedDB migration

- **Mobile Keyboard** - Virtual keyboard overlaps windows on mobile
  - Impact: Input fields hidden
  - Workaround: Scroll or minimize window
  - Status: Need responsive positioning

#### Medium Priority
- **Long File Paths** - Very long file paths can overflow in My Computer
  - Impact: UI layout breaks
  - Workaround: Use shorter names
  - Status: Need ellipsis truncation

- **Paint Canvas Export** - Exported images lose transparency
  - Impact: Saved PNGs have white background
  - Workaround: None currently
  - Status: Need proper canvas export

- **Screensaver Wake** - Sometimes screensaver doesn't dismiss on first click
  - Impact: Requires multiple clicks
  - Workaround: Click again
  - Status: Event handler timing issue

#### Low Priority
- **Clockdrift** - Clock can drift slightly from system time
  - Impact: Minimal, aesthetic only
  - Workaround: Refresh page
  - Status: Low priority fix

- **Console Warnings** - ResizeObserver warnings in Chrome console
  - Impact: None, cosmetic only
  - Workaround: Ignore
  - Status: Browser-specific quirk

### ⚠️ Limitations

**Current Limitations**
- No actual file upload/download (planned)
- No multi-monitor support
- No printer simulation
- No copy/paste between apps
- Limited to localStorage size (5-10MB typically)
- No offline support (requires HTTP server for ES modules)

---

## Performance Improvements

### Current Performance

**Boot Time:** ~500-1000ms (depending on device)
**Memory Usage:** ~50-80MB (with 10 windows open)
**FPS:** 60fps (games), variable (desktop)

### Optimization Opportunities

#### 🚀 High Impact

**1. Lazy Loading**
```
Current: All 29 apps loaded at boot (~1.1MB)
Proposed: Load apps on-demand
Expected: 50% faster boot, 40% less initial memory
```

**2. Virtual Scrolling**
```
Current: Render all items in file lists
Proposed: Render only visible items
Expected: 10x faster for 1000+ files
```

**3. Event Debouncing**
```
Current: Window resize fires every frame
Proposed: Debounce to 100ms
Expected: 80% fewer repaints
```

**4. State Management**
```
Current: Full state tree in memory
Proposed: Split state into modules
Expected: 30% less memory, faster updates
```

#### ⚡ Medium Impact

**5. Icon Rendering**
```
Current: Re-render all desktop icons on change
Proposed: Update only changed icons
Expected: 5x faster desktop updates
```

**6. Asset Optimization**
```
Current: CDN FontAwesome (400KB)
Proposed: Bundle only used icons (~50KB)
Expected: 350KB less network transfer
```

**7. CSS Optimization**
```
Current: 2,700 lines of CSS, some unused
Proposed: Purge unused styles
Expected: 30% smaller CSS file
```

#### 🔧 Low Impact

**8. Console Logging**
```
Current: 231 console.log statements
Proposed: Development-only logging
Expected: Slightly faster execution
```

**9. Animation Optimization**
```
Current: CSS transitions everywhere
Proposed: Use CSS will-change hint
Expected: Smoother animations
```

---

## Code Quality

### Code Health Metrics

**Current Status:**
- Total Lines: ~32,500
- Files: 68 JavaScript modules
- Average File Size: ~475 lines
- Largest File: Terminal.js (1,437 lines)
- Console.log Usage: 231 instances

### Quality Improvements

#### 📝 Documentation

- [ ] Add JSDoc comments to all public methods
- [ ] Create API reference documentation
- [ ] Add inline code examples
- [ ] Document all EventBus events
- [ ] Create architecture diagrams

#### ✅ Testing

- [ ] Set up Jest or Vitest testing framework
- [ ] Unit tests for core modules (StateManager, EventBus, etc.)
- [ ] Integration tests for app lifecycle
- [ ] E2E tests for common workflows
- [ ] Scenario validation tests
- [ ] Target: 80% code coverage

#### 🧹 Refactoring

- [ ] Extract magic numbers to Constants.js
- [ ] Reduce Terminal.js file size (break into modules)
- [ ] Standardize error handling across all modules
- [ ] Remove console.log in production builds
- [ ] Implement proper logging system (levels: debug, info, warn, error)

#### 🔒 Security

- [ ] Sanitize all user input (XSS prevention)
- [ ] Implement CSP (Content Security Policy)
- [ ] Review admin password storage (currently plaintext in localStorage)
- [ ] Add rate limiting for actions (prevent spam)
- [ ] Validate all scenario JSON (prevent injection)

---

## Community Requests

### Most Requested Features

Based on hypothetical user feedback:

1. **File Upload/Download** (35 requests)
   - Upload real files into virtual file system
   - Download virtual files to real file system
   - Status: Planned for v95.2

2. **Multiplayer/Collaborative Mode** (28 requests)
   - Multiple users in same OS instance
   - Shared file system
   - Status: Long-term goal

3. **More Games** (22 requests)
   - Tetris, Pac-Man, Chess
   - Status: Planned for v96.0

4. **Theme Customization** (18 requests)
   - Windows XP theme
   - Custom colors
   - Status: Planned for v96.0

5. **Mobile App Version** (15 requests)
   - Native iOS/Android apps
   - Status: Investigating (React Native or Capacitor)

### Feature Requests Under Consideration

- **3D Screensavers** - Pipes, maze, etc.
- **Music Production App** - Simple sequencer
- **Code Editor** - Syntax highlighting, multiple languages
- **Database Tool** - Simple SQL editor
- **Compression Tool** - ZIP/unzip simulation
- **Network Analyzer** - Packet inspection simulation

---

## Technical Debt

### Current Technical Debt

#### High Priority

**1. LocalStorage Dependency**
- **Issue:** 5-10MB limit, synchronous API
- **Impact:** Can't handle large file systems
- **Solution:** Migrate to IndexedDB
- **Effort:** Large (affects FileSystemManager, StateManager)

**2. Monolithic CSS**
- **Issue:** 2,700 lines in single file
- **Impact:** Hard to maintain, performance
- **Solution:** Split into component CSS files
- **Effort:** Medium

**3. Global State Object**
- **Issue:** Single large state tree
- **Impact:** Performance with deep updates
- **Solution:** Modular state with Immer or similar
- **Effort:** Large (affects StateManager core)

#### Medium Priority

**4. Manual Event Cleanup**
- **Issue:** Developers must remember cleanup
- **Impact:** Potential memory leaks
- **Solution:** Auto-cleanup with weak references
- **Effort:** Medium

**5. No Build Process**
- **Issue:** Can't optimize bundle, minify, etc.
- **Impact:** Larger file sizes, slower load
- **Solution:** Optional Vite/esbuild integration
- **Effort:** Medium (must remain optional)

**6. Hard-Coded Paths**
- **Issue:** Some paths still hard-coded
- **Impact:** Harder to refactor
- **Solution:** Use Constants.js everywhere
- **Effort:** Small

---

## Release Schedule

### Planned Releases

#### v95.2 - Polish & Performance
**Target:** Q1 2025
**Focus:** Bug fixes, performance, accessibility

#### v96.0 - Expanded Ecosystem
**Target:** Q2 2025
**Focus:** New apps, plugin system enhancements, themes

#### v97.0 - Advanced Features
**Target:** Q3-Q4 2025
**Focus:** Network simulation, AI integration, educational features

---

## Contributing to the Roadmap

We welcome community input on the roadmap! Here's how you can contribute:

### Suggesting Features

1. Check existing issues on GitHub
2. Create a new issue with "Feature Request" label
3. Describe the feature, use case, and benefits
4. Vote on existing feature requests

### Voting on Priorities

- 👍 React to issues you want to see implemented
- 💬 Comment with your use case
- 🏆 Features with most engagement get higher priority

### Contributing Code

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Setting up development environment
- Code style and conventions
- Pull request process
- Testing requirements

---

## Version History

### v95.1 (December 2024) - Current
- ✨ Added Scenario System (8 modules)
- ✨ Added Semantic Events for app-specific triggers
- ✨ Enhanced Plugin Architecture
- ✨ Added Features Settings app
- 📚 Comprehensive documentation rewrite
- 🎯 Tutorial and Cipher Hunt scenarios
- 🔧 Bug fixes and stability improvements

### v95.0 (November 2024)
- 🎉 Initial public release
- 🖥️ 29 fully-functional applications
- 🎮 8 games including SkiFree and DOOM
- 📁 Virtual file system with persistence
- 🔌 Plugin system with DVD Bouncer example
- 🏆 Achievement system
- 🎨 Windows 95 UI recreation
- 📎 Clippy assistant
- 🐕 Desktop pet

---

## Success Metrics

### Goals for 2025

**User Growth**
- Target: 1,000 GitHub stars
- Target: 50 contributors
- Target: 100 community-created scenarios

**Technical Excellence**
- Target: 80% code coverage
- Target: 95+ Lighthouse score
- Target: 0 high-severity security issues
- Target: <2 seconds boot time

**Community Engagement**
- Target: 20 third-party plugins
- Target: 5 theme packs
- Target: Active Discord community (500+ members)

---

## Get Involved

Want to help shape the future of IlluminatOS!? Here's how:

- **Star** the repository on GitHub
- **Report bugs** and suggest features in Issues
- **Contribute code** via Pull Requests
- **Create scenarios** and share with the community
- **Build plugins** to extend functionality
- **Write documentation** improvements
- **Join discussions** in GitHub Discussions

---

<div align="center">

**Building the future of nostalgic computing, together**

*Last Updated: December 2024*

[⬆ Back to Top](#illuminatos-roadmap)

</div>
