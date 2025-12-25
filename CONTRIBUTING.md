# Contributing to IlluminatOS!

Thank you for your interest in contributing to IlluminatOS!! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Code Style Guide](#code-style-guide)
5. [Submitting Contributions](#submitting-contributions)
6. [Types of Contributions](#types-of-contributions)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation](#documentation)
9. [Community](#community)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We expect all contributors to:

- **Be respectful** - Treat all community members with respect
- **Be constructive** - Provide helpful, actionable feedback
- **Be collaborative** - Work together toward common goals
- **Be patient** - Help newcomers learn and grow

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

---

## Getting Started

### Prerequisites

- **Web Browser:** Chrome 61+, Firefox 60+, Safari 11+, or Edge 79+
- **Code Editor:** VS Code, Sublime Text, or similar
- **Git:** For version control
- **HTTP Server:** Python, Node.js, or PHP (for local testing)

### Setting Up Development Environment

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/IlluminatOS.git
   cd IlluminatOS
   ```

2. **Set Up Upstream Remote**
   ```bash
   git remote add upstream https://github.com/morroware/IlluminatOS.git
   ```

3. **Start Local Server**
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx http-server -p 8000

   # Using PHP
   php -S localhost:8000
   ```

4. **Open in Browser**
   ```
   Navigate to http://localhost:8000
   ```

### Project Structure Overview

```
IlluminatOS!/
├── apps/           # Applications (29 apps)
├── core/           # Core system modules
├── features/       # System features
├── plugins/        # Plugin system
├── ui/             # UI renderers
├── scenarios/      # Scenario definitions
├── index.html      # Entry point
├── index.js        # Boot sequence
└── styles.css      # Global styles
```

---

## Development Workflow

### Branching Strategy

- **main** - Stable production code
- **develop** - Development branch (if applicable)
- **feature/*** - Feature branches
- **bugfix/*** - Bug fix branches
- **docs/*** - Documentation updates

### Creating a Feature Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/my-new-feature

# Make changes, commit often
git add .
git commit -m "Add new feature"

# Push to your fork
git push origin feature/my-new-feature
```

### Commit Message Guidelines

Use clear, descriptive commit messages:

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding/updating tests
- `chore` - Maintenance tasks

**Examples:**
```bash
feat(calculator): add scientific mode

- Add sin, cos, tan functions
- Add parentheses support
- Update UI with new buttons

Closes #123
```

```bash
fix(windowmanager): resolve z-index conflicts

Fix issue where windows would overlap incorrectly
when more than 15 windows were open.

Fixes #456
```

```bash
docs(readme): update installation instructions

Added instructions for PHP server option
```

---

## Code Style Guide

### JavaScript Style

#### General Principles

- **Use ES6+ features** - Classes, arrow functions, destructuring, etc.
- **No external dependencies** - Keep the project dependency-free
- **Modular design** - One class per file, clear exports
- **Descriptive naming** - Clear variable and function names

#### Naming Conventions

```javascript
// Classes: PascalCase
class MyApplication extends AppBase { }

// Functions/Methods: camelCase
function calculateTotal() { }
handleButtonClick() { }

// Constants: UPPER_SNAKE_CASE
const MAX_WINDOWS = 50;
const DEFAULT_WIDTH = 400;

// Private methods: underscore prefix (optional)
_internalMethod() { }

// Event handlers: handle prefix
handleClick(e) { }
handleKeyDown(e) { }
```

#### Code Formatting

```javascript
// Use 4 spaces for indentation
class MyApp extends AppBase {
    constructor() {
        super({
            id: 'myapp',
            name: 'My App'
        });
    }

    // Space after keywords
    if (condition) {
        doSomething();
    }

    // Spaces around operators
    const total = a + b + c;

    // Template literals for strings with variables
    const message = `Hello, ${name}!`;

    // Arrow functions for callbacks
    items.map(item => item.value);

    // Destructuring when appropriate
    const { width, height } = dimensions;
}
```

#### Error Handling

```javascript
// Always handle errors
try {
    const result = riskyOperation();
} catch (error) {
    console.error('Operation failed:', error);
    // Handle gracefully, show user-friendly message
}

// Validate inputs
if (!isValid(input)) {
    throw new Error('Invalid input provided');
}

// Use optional chaining
const value = obj?.nested?.property;
```

#### Comments

```javascript
/**
 * Calculate the total price including tax
 * @param {number} price - Base price
 * @param {number} taxRate - Tax rate (0-1)
 * @returns {number} Total price with tax
 */
function calculateTotalPrice(price, taxRate) {
    return price * (1 + taxRate);
}

// Use comments to explain "why", not "what"
// GOOD:
// Debounce window resize to prevent performance issues
this.debounce(handleResize, 100);

// BAD:
// Call debounce function
this.debounce(handleResize, 100);
```

### CSS Style

```css
/* Use BEM-like naming for classes */
.my-app {}
.my-app__header {}
.my-app__header--active {}

/* Group related properties */
.window {
    /* Positioning */
    position: absolute;
    top: 0;
    left: 0;

    /* Box model */
    width: 400px;
    height: 300px;
    padding: 0;
    margin: 0;

    /* Visual */
    background: #fff;
    border: 1px solid #000;

    /* Typography */
    font-size: 14px;
    color: #000;
}

/* Use CSS variables for theme colors */
.window-title {
    background: var(--win95-blue);
    color: var(--win95-white);
}
```

### HTML Style

```html
<!-- Use semantic HTML -->
<header class="app-header">
    <h1>Application Title</h1>
</header>

<main class="app-content">
    <section class="app-section">
        <p>Content here</p>
    </section>
</main>

<!-- Use data attributes for state -->
<div class="window" data-id="calculator-1" data-state="normal">
    <!-- content -->
</div>

<!-- Accessibility attributes -->
<button aria-label="Close window" title="Close">
    <i class="fa fa-times"></i>
</button>
```

---

## Submitting Contributions

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Changes work in all major browsers
- [ ] No console errors or warnings
- [ ] Documentation updated if needed
- [ ] Commit messages are clear and descriptive

### Pull Request Process

1. **Ensure your fork is up to date**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Push to your fork**
   ```bash
   git push origin your-feature-branch
   ```

3. **Create Pull Request on GitHub**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

4. **PR Title Format**
   ```
   [Type] Brief description

   Examples:
   [Feature] Add scientific calculator mode
   [Fix] Resolve window z-index issues
   [Docs] Update plugin development guide
   ```

5. **PR Description Should Include**
   - **What** - What changes were made
   - **Why** - Why these changes were needed
   - **How** - How the changes were implemented
   - **Testing** - How you tested the changes
   - **Screenshots** - If UI changes

6. **Address Review Feedback**
   - Respond to comments
   - Make requested changes
   - Push updates to the same branch

7. **After Merge**
   ```bash
   git checkout main
   git pull upstream main
   git branch -d your-feature-branch
   ```

---

## Types of Contributions

### 🐛 Bug Reports

**Before Reporting:**
- Check if the issue already exists
- Try to reproduce on different browsers
- Clear localStorage and try again

**Include in Report:**
- Browser and version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Console errors

**Template:**
```markdown
**Browser:** Chrome 120
**OS:** Windows 11

**Steps to Reproduce:**
1. Open Calculator
2. Enter 1 + 1
3. Press equals

**Expected:** Display 2
**Actual:** Display NaN

**Console Errors:**
```
TypeError: Cannot read property 'value' of null
```
```

### ✨ Feature Requests

**Before Requesting:**
- Check existing feature requests
- Review the roadmap

**Include in Request:**
- Clear description of feature
- Use cases / why it's needed
- Proposed implementation (optional)
- Examples from other software (optional)

### 📝 Documentation

**Areas Needing Documentation:**
- Code comments (JSDoc)
- API documentation
- Tutorial content
- Example scenarios
- Plugin development guides
- Troubleshooting guides

**Documentation Standards:**
- Clear, concise language
- Code examples for APIs
- Step-by-step for tutorials
- Screenshots for UI features

### 🎨 New Applications

See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for complete instructions.

**Requirements:**
- Extends `AppBase`
- Follows app structure conventions
- Uses `this.addHandler()` for events
- Includes proper cleanup in `onClose()`
- Has clear icon and description
- Works with multiple instances (unless singleton)
- Responsive to window resize

**Checklist:**
- [ ] App file created in `/apps/`
- [ ] Registered in `AppRegistry.js`
- [ ] Icon selected (FontAwesome or emoji)
- [ ] Appropriate category assigned
- [ ] Window size is reasonable
- [ ] Event handlers use `addHandler()`
- [ ] Instance state used for data
- [ ] Cleanup implemented if needed
- [ ] Tested with multiple instances
- [ ] Tested minimize/maximize/resize
- [ ] Works on mobile/touch devices

### 🔌 Plugins

See [DEVELOPER_GUIDE.md#plugin-system](DEVELOPER_GUIDE.md#plugin-system) for complete instructions.

**Requirements:**
- Extends `FeatureBase`
- Has unique ID
- Provides description and icon
- Implements lifecycle methods
- Uses auto-cleanup for events
- Includes README.md
- Settings UI defined if configurable

### 🎯 Scenarios

See [SCENARIOS.md](SCENARIOS.md) for complete instructions.

**Requirements:**
- Valid JSON schema
- Clear learning objectives
- Progressive difficulty
- Helpful hints
- Proper cleanup
- Tested end-to-end

### 🧪 Tests

**We need tests for:**
- Core modules (EventBus, StateManager, etc.)
- App lifecycle
- Window management
- File system operations
- Scenario execution

**Testing Approach (once framework set up):**
```javascript
// Example test structure
describe('StateManager', () => {
    test('should set and get state', () => {
        StateManager.setState('test', 'value');
        expect(StateManager.getState('test')).toBe('value');
    });

    test('should persist to localStorage', () => {
        StateManager.setState('persistent', 'data', true);
        // Verify localStorage
    });
});
```

---

## Testing Guidelines

### Manual Testing Checklist

**Before submitting PR:**

- [ ] Test in Chrome, Firefox, and Safari
- [ ] Test on desktop and mobile (if UI changes)
- [ ] Test with multiple app instances
- [ ] Test window resize behavior
- [ ] Test minimize/maximize/close
- [ ] Check for console errors/warnings
- [ ] Test with localStorage cleared
- [ ] Test with existing localStorage data
- [ ] Verify no memory leaks (close and reopen apps)

### Browser Testing

**Minimum Required:**
- Chrome 61+
- Firefox 60+
- Safari 11+

**Nice to Have:**
- Edge 79+
- Opera 76+
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Performance Testing

**Check for:**
- No noticeable lag with 10+ windows open
- Smooth 60fps animations
- Fast boot time (<2 seconds)
- Reasonable memory usage (<100MB)

---

## Documentation

### Code Documentation

**Use JSDoc for all public methods:**

```javascript
/**
 * Launch an application
 * @param {string} appId - The application identifier
 * @param {Object} [params={}] - Optional launch parameters
 * @param {string} [params.filePath] - File to open with app
 * @returns {string|null} Window ID if launched, null if failed
 */
launch(appId, params = {}) {
    // Implementation
}
```

### README Updates

**Update if adding:**
- New applications
- New features
- New dependencies
- New requirements
- Installation changes

### Developer Guide Updates

**Update if changing:**
- App development process
- Plugin development process
- Core APIs
- Lifecycle methods

---

## Community

### Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Developer Guide** - Comprehensive development documentation
- **Code Comments** - Check existing code for examples

### Communication Channels

- **GitHub Issues** - Primary channel for bugs/features
- **Pull Request Comments** - For code review discussions
- **Commit Messages** - Clear communication of changes

### Recognition

Contributors are recognized in:
- GitHub Contributors page
- Release notes
- README credits section

---

## Quick Reference

### Common Tasks

**Create new app:**
```bash
# 1. Create file
touch apps/MyApp.js

# 2. Copy template from DEVELOPER_GUIDE.md
# 3. Implement app logic
# 4. Register in AppRegistry.js
# 5. Test thoroughly
# 6. Submit PR
```

**Create new plugin:**
```bash
# 1. Create directory
mkdir -p plugins/features/my-plugin

# 2. Create manifest: index.js
# 3. Create feature class
# 4. Test locally
# 5. Submit PR with README
```

**Create new scenario:**
```bash
# 1. Create file
touch scenarios/my-scenario.scenario.json

# 2. Follow schema in scenarios/schema.json
# 3. Test via Scenario Player
# 4. Submit PR
```

**Fix a bug:**
```bash
# 1. Reproduce the bug
# 2. Create bugfix branch
git checkout -b bugfix/issue-123

# 3. Fix the bug
# 4. Test thoroughly
# 5. Submit PR with "Fixes #123"
```

---

## FAQ

### Q: Do I need to know React/Vue/Angular?

**A:** No! IlluminatOS! is built with vanilla JavaScript only. No frameworks needed.

### Q: Can I use external libraries?

**A:** The project aims to remain dependency-free. Exceptional cases may be considered, but prefer vanilla solutions.

### Q: How do I test my changes?

**A:** Simply refresh the browser after making code changes. No build step required!

### Q: Can I add npm packages?

**A:** Generally no, as we want to keep the project dependency-free. Propose alternatives in an issue first.

### Q: What if my PR isn't accepted?

**A:** We'll provide feedback on why and suggestions for improvements. All contributions are valued!

### Q: How long until my PR is reviewed?

**A:** We aim to review within 1-2 weeks. Complex PRs may take longer.

---

## License

By contributing to IlluminatOS!, you agree that your contributions will be licensed under the MIT License.

---

## Thank You! 🎉

Every contribution, no matter how small, helps make IlluminatOS! better. Thank you for being part of this project!

---

<div align="center">

**Happy Contributing!**

*Made with ❤️ and nostalgia*

[⬆ Back to Top](#contributing-to-illuminatos)

</div>
