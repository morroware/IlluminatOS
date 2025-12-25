# IlluminatOS!

<div align="center">

**A Nostalgic Windows 95 Operating System Simulator**

*Version 95.1 - Now with Scenario System & Enhanced Plugin Architecture*

[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-brightgreen?style=flat-square)](https://github.com/morroware/IlluminatOS)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[Features](#features) | [Installation](#installation) | [Applications](#applications) | [Scenarios](#scenarios) | [Plugins](#plugin-system) | [Easter Eggs](#easter-eggs) | [Development](#development)

</div>

---

## 🌟 Overview

IlluminatOS! is a fully-functional Windows 95 desktop environment simulator built entirely with **vanilla JavaScript**, HTML5, and CSS3. Experience the nostalgic computing era of the mid-1990s right in your web browser, complete with draggable windows, classic applications, retro games, a virtual file system, scripted scenarios, and plenty of hidden surprises.

This project demonstrates advanced JavaScript patterns, event-driven architecture, sophisticated UI/UX implementation, and a powerful scenario system for creating guided experiences—all without any external frameworks or dependencies.

**Project Highlights:**
- **~32,500+ lines of code** across 68 JavaScript files
- **29 fully-functional applications** from productivity tools to games
- **Scenario system** for creating interactive tutorials and challenges
- **Extensible plugin architecture** with example features
- **Virtual file system** with multi-drive support
- **Zero external dependencies** - pure vanilla JavaScript ES6+

---

## ✨ Features

### Desktop Environment
- **Authentic Windows 95 Interface** - Pixel-perfect recreation with period-accurate styling
- **Advanced Window Management** - Drag, resize (8 directions), minimize, maximize, and close
- **Desktop Icons** - Drag to reposition, double-click to launch, right-click for context menus
- **Multi-Select Support** - Click and drag selection box for multiple icons
- **Start Menu** - Fully functional with 7 categories and nested submenus
- **Taskbar** - Window buttons, quick launch area, and system tray with live clock
- **Context Menus** - Right-click anywhere for contextual options
- **CRT Effect** - Optional retro scanline overlay for authentic monitor feel
- **Custom Dialogs** - Windows 95-style alert, confirm, prompt, and file dialogs
- **Window Snapping** - Drag windows to screen edges for snap preview
- **Touch Support** - Mobile and tablet compatible

### Virtual File System
- **Multi-Drive Architecture** - C: (Local Disk), D: (CD-ROM), A: (Floppy)
- **Complete Directory Structure** - Windows, Program Files, Users hierarchy
- **Full File Operations** - Create, read, edit, delete, move, copy, and rename
- **Persistent Storage** - LocalStorage-based persistence across sessions
- **Multiple File Types** - Text files, images, shortcuts, executables, and more
- **File Associations** - Automatic app launching based on file extension
- **Hidden Easter Eggs** - Secret files scattered throughout the system

### Scenario System 🎯 **NEW**
- **Interactive Tutorials** - Guided experiences for learning the OS
- **Cryptography Challenges** - Multi-stage puzzles and hunts
- **Event-Driven Architecture** - Triggers, conditions, and actions
- **Progress Tracking** - Save/load scenario state
- **Hint System** - Context-sensitive help when users get stuck
- **Schema-Based** - JSON schema for creating custom scenarios

### Plugin System 🔌
- **Extensible Architecture** - Add features without modifying core code
- **FeatureBase Class** - Lifecycle hooks and automatic cleanup
- **Settings Integration** - Auto-generated UI for feature configuration
- **Event System** - Emit and subscribe to custom events
- **Example Plugin** - DVD Bouncer screensaver demonstrates capabilities
- **Hot-Reload Support** - Enable/disable features at runtime

### Technical Excellence
- **Zero Dependencies** - 100% vanilla JavaScript with ES6+ modules
- **Event-Driven Architecture** - Central EventBus for decoupled communication
- **Centralized State Management** - Observable state with localStorage persistence
- **Responsive Design** - Apps properly resize when windows change dimensions
- **Mobile Support** - Touch events for mobile and tablet devices
- **Modular Codebase** - Clean separation of concerns and maintainable architecture

---

## 🚀 Installation

### Quick Start (No Build Required!)

IlluminatOS! requires **no build process**, package installation, or compilation. Simply clone and open:

#### Option 1: Direct Browser Access
```bash
git clone https://github.com/morroware/IlluminatOS.git
cd IlluminatOS
# Open index.html directly in your browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

#### Option 2: Local HTTP Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

### Browser Requirements

| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Chrome  | 61+             | ✅ Full Support |
| Firefox | 60+             | ✅ Full Support |
| Safari  | 11+             | ✅ Full Support |
| Edge    | 79+             | ✅ Full Support |
| Opera   | 76+             | ✅ Full Support |

**Required Browser APIs:**
- ES6 Modules (`<script type="module">`)
- Canvas 2D Context
- Web Audio API
- LocalStorage (5MB+ recommended)
- CSS Grid & Flexbox
- ResizeObserver API
- Pointer/Touch Events

---

## 📱 Applications

IlluminatOS! includes **29 fully-functional applications** organized into categories:

### 🛠️ Productivity (7 apps)

| App | Description | Key Features |
|-----|-------------|--------------|
| **Notepad** | Text editor with file system integration | New, Open, Save, Save As, Download to real file system |
| **Calculator** | Full arithmetic calculator | Multi-instance support, keyboard input (0-9, +, -, *, /, Enter) |
| **Paint** | Drawing application | Brush, eraser, bucket fill, color picker, save/load images |
| **Terminal** | MS-DOS style command line | 30+ commands including pipes, file operations, and easter eggs |
| **Calendar** | Monthly calendar view | Date selection, month/year navigation |
| **Clock** | Analog clock display | Real-time updates, timezone support |
| **Find Files** | File search utility | Search across virtual file system by name or content |

### ⚙️ System Applications (8 apps)

| App | Description | Key Features |
|-----|-------------|--------------|
| **My Computer** | Windows Explorer-style file browser | Grid/list views, drag-and-drop, multi-drive navigation |
| **Recycle Bin** | Deleted items manager | View, restore, or permanently delete items |
| **Control Panel** | System settings manager | Display, sound, desktop pet, screensaver configuration |
| **Display Properties** | Display settings | Background, screensaver, appearance, effects tabs |
| **Sound Settings** | Audio control panel | Volume control, sound effect toggles |
| **Admin Panel** | Advanced administration | Icon management, security, achievements, diagnostics |
| **Task Manager** | Process viewer | View running apps, system information |
| **Features Settings** | Plugin/feature management | Enable/disable features, configure settings |

### 🎮 Games (8 apps)

| App | Type | Description | Controls |
|-----|------|-------------|----------|
| **Snake** | Arcade | Classic snake with scoring | Arrow keys or WASD |
| **Minesweeper** | Puzzle | Complete implementation | Mouse clicks, first-click safety |
| **Asteroids** | Shooter | Space shooter with physics | Arrow keys to move, Space to shoot |
| **Solitaire** | Card Game | Klondike solitaire | Drag-and-drop cards |
| **FreeCell** | Card Game | 8 foundation piles variant | Drag-and-drop, undo support |
| **SkiFree** | Arcade | Ski down the mountain, flee the Yeti! | Arrow keys, F for boost, Space to start |
| **DOOM** | FPS | Classic 1993 FPS via WebAssembly | Mouse + keyboard (Chocolate Doom) |
| **Zork** | Text Adventure | Classic interactive fiction | Text commands |

### 🎵 Multimedia (2 apps)

| App | Description | Features |
|-----|-------------|----------|
| **Winamp** | Legendary MP3 player | Visualizer, 8-band EQ, playlist, shuffle/repeat modes |
| **Media Player** | Audio/video player | Windows Media Player style interface |

### 🌐 Internet & Communication (2 apps)

| App | Description | Features |
|-----|-------------|----------|
| **Internet Explorer** | Web browser clone | Bookmarks, history, address bar, classic IE look |
| **Chat Room** | 90s-style chat simulator | AOL/IRC style, bot users, slash commands (/me, /nick, /users) |

### 🔧 Utilities (2 apps)

| App | Description |
|-----|-------------|
| **Disk Defragmenter** | Classic block-moving defrag visualization |
| **Help System** | Built-in documentation and help |

---

## 🎯 Scenarios

IlluminatOS! features a powerful **scenario system** for creating guided tutorials, interactive challenges, and scripted experiences.

### Included Scenarios

#### Tutorial Scenario
- **Difficulty:** Easy
- **Time:** 5-10 minutes
- **Description:** Learn the basics of IlluminatOS! desktop navigation and applications
- **Features:** Interactive walkthrough with progress tracking

#### Cipher Hunt Challenge
- **Difficulty:** Medium/Hard
- **Time:** 15-30 minutes
- **Description:** Multi-stage cryptography puzzle using calculator, terminal, and file system
- **Features:** Event-based progression, hint system, challenge stages

### Scenario Features

- **Event-Driven Triggers** - React to user actions (file created, app opened, etc.)
- **Condition System** - Complex logic for progression (state checks, file checks, time checks)
- **Action System** - Execute actions (show dialogs, create files, unlock apps, etc.)
- **Progress Tracking** - Save scenario state across sessions
- **Hint System** - Context-sensitive hints with delays
- **Variables & State** - Maintain scenario-specific state
- **Lifecycle Hooks** - onStart, onComplete, onFail, onAbort

### Creating Scenarios

Scenarios are defined in JSON format following the schema at `/scenarios/schema.json`. See [SCENARIOS.md](SCENARIOS.md) for comprehensive documentation on creating custom scenarios.

---

## 🔌 Plugin System

IlluminatOS! features an **extensible plugin architecture** allowing third-party features and applications without modifying core code.

### Plugin Capabilities

| Feature | Description |
|---------|-------------|
| **FeatureBase** | Base class with lifecycle hooks (initialize, enable, disable, cleanup) |
| **FeatureRegistry** | Central registry with dependency resolution |
| **PluginLoader** | Dynamic loading from manifest with version management |
| **Settings UI** | Auto-generated settings interface from feature definitions |
| **Event Integration** | Emit/subscribe to system events via EventBus |
| **Auto-cleanup** | Event handlers and subscriptions automatically cleaned on disable |

### Example Plugin: DVD Bouncer

A nostalgic bouncing DVD logo screensaver demonstrating plugin development:

**Features:**
- Bouncing logo animation with wall collision detection
- Color changes on each bounce
- Corner hit tracking with celebrations
- Configurable speed, size, and idle timeout
- Auto-start after inactivity

**Events:**
- `dvd-bouncer:started` - Screensaver begins
- `dvd-bouncer:stopped` - Screensaver ends (includes stats)
- `dvd-bouncer:corner-hit` - Perfect corner hit achieved!

**Configuration:**
```javascript
{
    speed: 2,           // Bounce speed (1-10)
    logoSize: 80,       // Logo size in pixels (40-200)
    idleTimeout: 60000, // Milliseconds before auto-start
    autoStart: true     // Enable idle detection
}
```

See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#plugin-system) for comprehensive plugin development documentation.

---

## 🎨 Special Features

### Clippy Assistant 📎
The iconic Microsoft Office Assistant makes an appearance!
- **50% spawn chance** on boot
- **Progressive personality** - Gets annoyed if dismissed repeatedly
- **Contextual tips** - Offers "helpful" advice based on what you're doing
- **Easter egg** - Dismiss 5 times to unlock "Clippy Hater" achievement

### Desktop Pet 🐕
An animated companion that walks across your desktop:
- **8 pet options:** 🐕 🐈 🐇 🐹 🦊 🦝 🐿️ 🦔
- **Fortune cookies** - Click for random messages
- **Activation:** Konami Code or Control Panel
- **Customizable** via Control Panel settings

### Achievement System 🏆
Unlock achievements by performing various actions:

| Achievement | Unlock Condition |
|-------------|------------------|
| **First Boot** | Launch IlluminatOS! for the first time |
| **Konami Master** | Enter the Konami Code (↑↑↓↓←→←→BA) |
| **Disco Fever** | Click the taskbar clock 10 times |
| **Multitasker** | Open 10+ windows simultaneously |
| **Clippy Hater** | Dismiss Clippy 5 times |
| **Neo** | Enter Matrix mode in Terminal |

### Screensaver System
Activates after configurable inactivity (1, 3, 5, 10 minutes, or never):
- **Flying Toasters** - Classic screensaver animation
- **DVD Bouncer** - Plugin-provided screensaver
- **Configuration** via Control Panel or Display Properties
- **Wake on input** - Any click, key press, or mouse movement

### Sound System 🔊
Web Audio API-based sound effects:
- **System sounds:** startup, shutdown, error, notify, click
- **Music support** - MP3/audio file playback
- **Volume control** - Global and per-feature settings
- **Synthesized effects** - Pure JavaScript audio generation

### System Dialogs
Authentic Windows 95-style dialogs replace browser modals:
- **Alert, Confirm, Prompt** - Classic message boxes
- **File Open/Save** - Virtual file system navigation
- **Run Dialog** (Ctrl+R) - Quick app launcher
- **Shutdown Dialog** - Proper OS shutdown sequence

---

## 🎮 Easter Eggs

### Konami Code
Enter the legendary cheat code for a surprise:
```
↑ ↑ ↓ ↓ ← → ← → B A
```
**Rewards:** Celebration animation + Desktop Pet unlocked

### Rosebud Cheat
Type `rosebud` anywhere to gain admin access (SimCity/The Sims reference)

### Terminal Secrets
Special commands in the Terminal app:

| Command | Effect |
|---------|--------|
| `matrix` | Green "digital rain" effect from The Matrix |
| `disco` | Activate disco mode with colorful effects |
| `zork` | Launch the classic text adventure game |
| `bsod` | Trigger a Blue Screen of Death (harmless!) |
| `fortune` | Display a random fortune cookie message |
| `cowsay <text>` | ASCII cow says your text |

### Hidden Files
Explore the file system for secret references:
- `C:/Users/User/Secret/aperture.log` - Portal/Aperture Science reference
- `C:/Users/User/Secret/hal9000.txt` - 2001: A Space Odyssey reference

### Clock Easter Egg
Click the taskbar clock **10 times** to trigger Disco Fever mode and unlock an achievement

### Clippy Easter Egg
Dismiss Clippy **5 times** to unlock the "Clippy Hater" achievement and see progressively annoyed messages

---

## 🏗️ Architecture

### Core Design Patterns

**Event-Driven Architecture**
- Central EventBus for pub/sub messaging
- 25+ defined events for window, app, and system operations
- Wildcard subscriptions with automatic cleanup

**Singleton Pattern**
- Core services: EventBus, StateManager, WindowManager, FileSystemManager
- Single shared instances ensure consistency

**Observer Pattern**
- Reactive state subscriptions with path-based updates
- Components automatically re-render on state changes

**Template Method Pattern**
- AppBase provides lifecycle hooks for consistent app interface
- Features extend FeatureBase for standardized plugins

**Factory Pattern**
- AppRegistry.launch() for app instantiation
- PluginLoader for dynamic plugin loading

### Project Structure

```
IlluminatOS!/
├── index.html                  # Main entry point + boot screen
├── index.js                    # Boot sequence & system initialization
├── styles.css                  # Windows 95 styling (~2,700 lines)
│
├── apps/                       # 29 Application implementations
│   ├── AppBase.js              # Base class (multi-instance support)
│   ├── AppRegistry.js          # Central registry & launcher
│   └── [app files]             # Individual applications
│
├── core/                       # Core system modules
│   ├── EventBus.js             # Pub/sub event system
│   ├── StateManager.js         # State management + persistence
│   ├── WindowManager.js        # Window lifecycle operations
│   ├── FileSystemManager.js    # Virtual file system
│   ├── StorageManager.js       # LocalStorage abstraction
│   ├── IconSystem.js           # Icon rendering (FontAwesome + emoji)
│   ├── Constants.js            # Centralized configuration
│   ├── FeatureBase.js          # Base class for features
│   ├── FeatureRegistry.js      # Feature management
│   ├── PluginLoader.js         # Plugin loading system
│   │
│   └── scripted-events/        # Scenario system
│       ├── ScenarioManager.js  # Scenario orchestration
│       ├── ScenarioLoader.js   # Load scenario files
│       ├── ActionExecutor.js   # Execute scenario actions
│       ├── ConditionEvaluator.js # Evaluate conditions
│       ├── TriggerEngine.js    # Trigger management
│       ├── SemanticEvents.js   # App-specific events
│       └── EventEmitterMixin.js # Event functionality
│
├── features/                   # Core system features
│   ├── AchievementSystem.js    # Achievement tracking
│   ├── ClippyAssistant.js      # Clippy popup assistant
│   ├── DesktopPet.js           # Desktop pet companion
│   ├── EasterEggs.js           # Hidden features & codes
│   ├── Screensaver.js          # Screensaver module
│   ├── SoundSystem.js          # Web Audio sound effects
│   └── SystemDialogs.js        # Windows 95-style dialogs
│
├── plugins/                    # Extensible plugin system
│   └── features/
│       ├── dvd-bouncer/        # DVD screensaver plugin
│       │   ├── index.js        # Plugin manifest
│       │   ├── DVDBouncerFeature.js
│       │   └── README.md
│       └── example-plugin/     # Plugin template
│
├── ui/                         # UI rendering components
│   ├── DesktopRenderer.js      # Desktop icons
│   ├── TaskbarRenderer.js      # Taskbar & system tray
│   ├── StartMenuRenderer.js    # Start menu
│   └── ContextMenuRenderer.js  # Right-click menus
│
├── scenarios/                  # Scenario definitions
│   ├── schema.json             # Scenario JSON schema
│   ├── tutorial.scenario.json  # Tutorial scenario
│   └── cipher-hunt.scenario.json # Challenge scenario
│
└── docs/                       # Documentation
    ├── README.md               # This file
    ├── ARCHITECTURE_REVIEW.md  # Architecture deep-dive
    ├── DEVELOPER_GUIDE.md      # Development documentation
    ├── SCENARIOS.md            # Scenario system guide
    ├── CONTRIBUTING.md         # Contribution guidelines
    └── ROADMAP.md              # Future plans & improvements
```

### Data Flow

```
User Action (click, drag, keyboard input)
    ↓
UI Renderer captures event
    ↓
EventBus.emit(event) broadcasts to all subscribers
    ↓
Component handlers process event
    ↓
StateManager.setState() updates centralized state
    ↓
StorageManager.set() persists to localStorage
    ↓
StateManager subscribers react to changes
    ↓
UI Updates (re-render affected components)
```

### Key Technologies

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Language** | JavaScript ES6+ | Classes, modules, async/await, destructuring |
| **Markup** | HTML5 | Semantic elements, custom data attributes |
| **Styling** | CSS3 | Grid, Flexbox, Variables, Animations, Transitions |
| **Graphics** | Canvas 2D API | Games (Snake, Asteroids, SkiFree, etc.) |
| **Audio** | Web Audio API | Synthesized sound effects |
| **Storage** | LocalStorage | Persistent state and virtual file system |
| **Icons** | FontAwesome 6.5.1 | CDN-loaded icon library + emoji fallback |
| **Fonts** | VT323 (Google Fonts) | Monospace retro terminal aesthetic |
| **Modules** | ES6 Native | No bundler required, direct browser support |

---

## ⚙️ Configuration

### LocalStorage Keys

All data uses the `smos_` prefix:

| Key | Purpose |
|-----|---------|
| `smos_desktopIcons` | Desktop icon positions and state |
| `smos_filePositions` | File icon coordinates |
| `smos_filesystem` | Virtual file system structure |
| `smos_recycledItems` | Recycle bin contents |
| `smos_achievements` | Unlocked achievements |
| `smos_soundEnabled` | Sound effects preference |
| `smos_crtEnabled` | CRT scanline effect toggle |
| `smos_petEnabled` | Desktop pet visibility |
| `smos_currentPet` | Selected pet emoji |
| `smos_hasVisited` | First-visit flag |
| `smos_desktopBg` | Wallpaper setting |
| `smos_adminPassword` | Admin panel password hash |
| `feature_*_enabled` | Feature enabled states |
| `feature_*_config` | Feature configurations |

### Clearing Data

To reset IlluminatOS! to factory defaults:

**Via Terminal:**
```bash
reset --factory
```

**Via Control Panel:**
Settings > Advanced > Reset to Defaults

**Via Browser Console:**
```javascript
Object.keys(localStorage)
    .filter(key => key.startsWith('smos_'))
    .forEach(key => localStorage.removeItem(key));
location.reload();
```

---

## 🛠️ Development

### Quick Start: Creating a New App

See the comprehensive [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for detailed documentation.

**Basic App Template:**

```javascript
import AppBase from './AppBase.js';

class MyApp extends AppBase {
    constructor() {
        super({
            id: 'myapp',
            name: 'My Application',
            icon: 'fa-solid fa-star',
            width: 500,
            height: 400,
            resizable: true,
            singleton: false,
            category: 'accessories'
        });
    }

    onOpen(params = {}) {
        return `<div class="myapp">Hello World!</div>`;
    }

    onMount() {
        // Setup event handlers using this.addHandler()
    }

    onClose() {
        // Cleanup (most handled automatically)
    }
}

export default MyApp;
```

Register in `AppRegistry.js`:
```javascript
import MyApp from './MyApp.js';
this.register(new MyApp(), { category: 'accessories' });
```

### Creating a Plugin

See [DEVELOPER_GUIDE.md#plugin-system](DEVELOPER_GUIDE.md#plugin-system) for comprehensive plugin development documentation.

---

## 📚 Documentation

- **[README.md](README.md)** - This file, project overview
- **[ARCHITECTURE_REVIEW.md](ARCHITECTURE_REVIEW.md)** - Deep-dive into architecture, patterns, and design decisions
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Comprehensive guide for creating apps, features, and plugins
- **[SCENARIOS.md](SCENARIOS.md)** - Complete scenario system documentation with examples
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guidelines for contributing to the project
- **[ROADMAP.md](ROADMAP.md)** - Future plans, improvements, and known issues

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Code style and conventions
- Submitting bug reports
- Proposing new features
- Creating pull requests
- Testing requirements

---

## 📜 License

This project is available under the **MIT License**. See [LICENSE](LICENSE) for full details.

---

## 🙏 Credits

- **Design Inspiration:** Microsoft Windows 95
- **DOOM Port:** Chocolate Doom WebAssembly
- **Icons:** FontAwesome 6.5.1
- **Font:** VT323 by Google Fonts
- **Clippy:** The classic Microsoft Office Assistant (1997-2007, RIP)
- **Community:** All contributors and testers

---

## 📊 Project Statistics

- **Total Lines of Code:** ~32,500+
- **JavaScript Files:** 68
- **Applications:** 29
- **Core Features:** 7
- **Scenario System:** 8 modules
- **Plugin Examples:** 2
- **Documentation Pages:** 6
- **File Size:** ~1.1 MB (uncompressed)
- **Dependencies:** 0 (zero!)
- **Browser Support:** All modern browsers (Chrome 61+, Firefox 60+, Safari 11+, Edge 79+)

---

<div align="center">

**Built with nostalgia, JavaScript, and a love for retro computing**

*"It looks like you're reading a README. Would you like help?"* - Clippy

[⬆ Back to Top](#illuminatos)

</div>
