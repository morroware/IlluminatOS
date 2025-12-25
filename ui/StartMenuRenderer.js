/**
 * StartMenuRenderer - Renders and manages the Windows 95 style Start Menu
 * Updated to dynamically load apps by category with proper event cleanup
 */

import EventBus, { Events } from '../core/EventBus.js';
import StateManager from '../core/StateManager.js';
import AppRegistry from '../apps/AppRegistry.js';
import { StartMenuEvents } from '../core/scripted-events/SemanticEvents.js';

class StartMenuRendererClass {
    constructor() {
        this.element = null;
        this.startButton = null;
        this.isOpen = false;
        this.initialized = false;
        this.focusedIndex = -1;
        this.focusableItems = [];

        // Bound handlers for cleanup
        this.boundHandleOutsideClick = this.handleOutsideClick.bind(this);
        this.boundHandleStartClick = this.handleStartClick.bind(this);
        this.boundHandleMenuClick = this.handleMenuClick.bind(this);
        this.boundHandleKeydown = this.handleKeydown.bind(this);
    }

    initialize() {
        if (this.initialized) {
            console.warn('[StartMenuRenderer] Already initialized');
            return;
        }

        this.element = document.getElementById('startMenu');
        this.startButton = document.getElementById('startButton');

        if (!this.element || !this.startButton) return;

        // Start button click - using bound handler
        this.startButton.addEventListener('click', this.boundHandleStartClick);

        // Event delegation for menu items
        this.element.addEventListener('click', this.boundHandleMenuClick);

        EventBus.on(Events.START_MENU_TOGGLE, (data) => {
            if (data && data.open !== undefined && data.open !== this.isOpen) {
                if (data.open) this.open(); else this.close();
            }
        });

        // Outside click to close - using bound handler
        document.addEventListener('click', this.boundHandleOutsideClick);

        // Keyboard navigation
        document.addEventListener('keydown', this.boundHandleKeydown);

        EventBus.on(Events.WINDOW_OPEN, () => this.close());
        StateManager.subscribe('menuItems', () => this.render());
        StateManager.subscribe('user.isAdmin', () => this.render());

        this.render();
        this.initialized = true;
    }

    /**
     * Handle start button click
     */
    handleStartClick(e) {
        e.stopPropagation();
        this.toggle();
        EventBus.emit(Events.START_MENU_TOGGLE, { open: this.isOpen });
    }

    /**
     * Handle outside click to close menu
     */
    handleOutsideClick(e) {
        if (this.isOpen && !this.element.contains(e.target) && !this.startButton.contains(e.target)) {
            this.close();
        }
    }

    /**
     * Handle menu item clicks via event delegation
     */
    handleMenuClick(e) {
        const appItem = e.target.closest('[data-app]');
        const linkItem = e.target.closest('[data-link]');

        if (appItem) {
            e.stopPropagation();
            EventBus.emit(StartMenuEvents.ITEM_CLICKED, { appId: appItem.dataset.app });
            AppRegistry.launch(appItem.dataset.app);
            this.close();
        } else if (linkItem) {
            e.stopPropagation();
            EventBus.emit(StartMenuEvents.ITEM_CLICKED, { link: linkItem.dataset.link });
            AppRegistry.launch('browser', { url: linkItem.dataset.link });
            this.close();
        }
    }

    /**
     * Handle keyboard navigation for Start Menu
     */
    handleKeydown(e) {
        // Only handle when menu is open
        if (!this.isOpen) {
            // Windows key or Ctrl+Escape opens start menu
            if (e.key === 'Meta' || (e.ctrlKey && e.key === 'Escape')) {
                e.preventDefault();
                this.open();
                return;
            }
            return;
        }

        // Update focusable items list
        this.updateFocusableItems();

        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                this.close();
                this.startButton?.focus();
                break;

            case 'ArrowDown':
                e.preventDefault();
                this.moveFocus(1);
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.moveFocus(-1);
                break;

            case 'ArrowRight':
                e.preventDefault();
                this.expandSubmenu();
                break;

            case 'ArrowLeft':
                e.preventDefault();
                this.collapseSubmenu();
                break;

            case 'Enter':
            case ' ':
                e.preventDefault();
                this.activateFocusedItem();
                break;

            case 'Home':
                e.preventDefault();
                this.focusFirst();
                break;

            case 'End':
                e.preventDefault();
                this.focusLast();
                break;

            default:
                // Type-ahead: focus item starting with pressed key
                if (e.key.length === 1 && !e.ctrlKey && !e.altKey) {
                    this.typeAhead(e.key);
                }
                break;
        }
    }

    /**
     * Update the list of focusable menu items
     */
    updateFocusableItems() {
        if (!this.element) return;
        // Get all visible menu items (not inside hidden submenus)
        this.focusableItems = Array.from(
            this.element.querySelectorAll('.start-menu-item:not(.start-submenu .start-menu-item)')
        );
    }

    /**
     * Move focus by offset (positive = down, negative = up)
     */
    moveFocus(offset) {
        if (this.focusableItems.length === 0) return;

        // Remove highlight from current item
        if (this.focusedIndex >= 0 && this.focusableItems[this.focusedIndex]) {
            this.focusableItems[this.focusedIndex].classList.remove('keyboard-focused');
        }

        // Calculate new index with wrapping
        if (this.focusedIndex === -1) {
            this.focusedIndex = offset > 0 ? 0 : this.focusableItems.length - 1;
        } else {
            this.focusedIndex += offset;
            if (this.focusedIndex < 0) this.focusedIndex = this.focusableItems.length - 1;
            if (this.focusedIndex >= this.focusableItems.length) this.focusedIndex = 0;
        }

        // Add highlight and scroll into view
        const item = this.focusableItems[this.focusedIndex];
        if (item) {
            item.classList.add('keyboard-focused');
            item.scrollIntoView({ block: 'nearest' });
            item.focus();
        }
    }

    /**
     * Focus the first menu item
     */
    focusFirst() {
        this.focusedIndex = -1;
        this.moveFocus(1);
    }

    /**
     * Focus the last menu item
     */
    focusLast() {
        this.focusedIndex = this.focusableItems.length;
        this.moveFocus(-1);
    }

    /**
     * Expand submenu of focused item
     */
    expandSubmenu() {
        if (this.focusedIndex < 0 || !this.focusableItems[this.focusedIndex]) return;

        const item = this.focusableItems[this.focusedIndex];
        if (item.classList.contains('submenu-trigger')) {
            const submenu = item.querySelector('.start-submenu');
            if (submenu) {
                // Update focusable items to submenu items
                this.focusableItems = Array.from(submenu.querySelectorAll('.start-menu-item'));
                this.focusedIndex = -1;
                this.moveFocus(1);
            }
        }
    }

    /**
     * Collapse submenu and return to parent menu
     */
    collapseSubmenu() {
        // Reset to top-level items
        this.updateFocusableItems();
        this.focusedIndex = -1;
        this.moveFocus(1);
    }

    /**
     * Activate (click) the currently focused item
     */
    activateFocusedItem() {
        if (this.focusedIndex < 0 || !this.focusableItems[this.focusedIndex]) return;

        const item = this.focusableItems[this.focusedIndex];

        // If it's a submenu trigger, expand it
        if (item.classList.contains('submenu-trigger')) {
            this.expandSubmenu();
            return;
        }

        // Otherwise, click it
        item.click();
    }

    /**
     * Type-ahead: focus item starting with pressed key
     */
    typeAhead(key) {
        const lowerKey = key.toLowerCase();
        const startIndex = this.focusedIndex + 1;

        // Search from current position to end
        for (let i = startIndex; i < this.focusableItems.length; i++) {
            const text = this.focusableItems[i].textContent.trim().toLowerCase();
            if (text.startsWith(lowerKey)) {
                this.focusedIndex = i - 1;
                this.moveFocus(1);
                return;
            }
        }

        // Wrap around and search from beginning
        for (let i = 0; i < startIndex; i++) {
            const text = this.focusableItems[i].textContent.trim().toLowerCase();
            if (text.startsWith(lowerKey)) {
                this.focusedIndex = i - 1;
                this.moveFocus(1);
                return;
            }
        }
    }

    /**
     * Cleanup resources
     */
    destroy() {
        if (!this.initialized) return;

        document.removeEventListener('click', this.boundHandleOutsideClick);
        document.removeEventListener('keydown', this.boundHandleKeydown);

        if (this.startButton) {
            this.startButton.removeEventListener('click', this.boundHandleStartClick);
        }

        if (this.element) {
            this.element.removeEventListener('click', this.boundHandleMenuClick);
        }

        this.initialized = false;
        console.log('[StartMenuRenderer] Destroyed');
    }

    toggle() { this.isOpen ? this.close() : this.open(); }

    open() {
        this.isOpen = true;
        this.element.classList.add('active');
        this.startButton.classList.add('active');
        EventBus.emit(Events.SOUND_PLAY, { type: 'click' });
        // Emit semantic event for scenario triggers
        EventBus.emit(StartMenuEvents.OPENED, { timestamp: Date.now() });
    }

    close() {
        this.isOpen = false;
        this.focusedIndex = -1;
        this.focusableItems = [];

        // Remove keyboard focus from all items
        if (this.element) {
            this.element.querySelectorAll('.keyboard-focused').forEach(el => {
                el.classList.remove('keyboard-focused');
            });
        }

        this.element.classList.remove('active');
        this.startButton.classList.remove('active');
        EventBus.emit(StartMenuEvents.CLOSED, {});
    }

    render() {
        if (!this.element) return;
        const isAdmin = StateManager.getState('user.isAdmin');

        console.log('[StartMenuRenderer] render() called - building menu HTML');

        this.element.innerHTML = `
            <div class="start-menu-sidebar">
                <span class="sidebar-text">IlluminatOS!</span>
            </div>
            <div class="start-menu-content">
                <div class="start-menu-items">
                    ${this.renderProgramsSection()}
                    ${this.renderDocumentsSection()}
                    ${this.renderSettingsSection()}
                    ${this.renderQuickItems()}
                    <div class="start-menu-divider"></div>
                    ${this.renderAdminItem(isAdmin)}
                    <div class="start-menu-divider"></div>
                    ${this.renderShutdownItem()}
                </div>
            </div>
        `;

        // Debug: verify Settings submenu items in DOM
        const settingsSubmenu = this.element.querySelector('[data-app="controlpanel"]')?.closest('.start-submenu');
        if (settingsSubmenu) {
            const items = settingsSubmenu.querySelectorAll('[data-app]');
            const itemList = Array.from(items).map(i => i.dataset.app);
            console.log('[StartMenuRenderer] Settings submenu items in DOM:', itemList);

            // Verify all expected items are present
            const expected = ['controlpanel', 'display', 'sounds', 'features-settings'];
            const missing = expected.filter(id => !itemList.includes(id));
            if (missing.length > 0) {
                console.error('[StartMenuRenderer] MISSING Settings items:', missing);
            } else {
                console.log('[StartMenuRenderer] All 4 Settings items present ✓');
            }
        } else {
            console.error('[StartMenuRenderer] Settings submenu NOT found in DOM!');
        }

        // Attach only submenu positioning (click handlers use event delegation)
        this.attachSubmenuPositioning();
    }

    renderProgramsSection() {
        // Dynamically fetch apps by category
        const accessories = AppRegistry.getByCategory('accessories').filter(a => a.showInMenu !== false);
        const gamesRaw = AppRegistry.getByCategory('games');
        const games = gamesRaw.filter(a => a.showInMenu !== false);
        console.log('[StartMenu] Games raw:', gamesRaw);
        console.log('[StartMenu] Games filtered:', games);
        console.log('[StartMenu] Zork in games?', games.find(g => g.id === 'zork'));
        const multimedia = AppRegistry.getByCategory('multimedia').filter(a => a.showInMenu !== false);
        const internet = AppRegistry.getByCategory('internet').filter(a => a.showInMenu !== false);
        const systemtools = AppRegistry.getByCategory('systemtools').filter(a => a.showInMenu !== false);

        const links = (StateManager.getState('icons') || []).filter(i => i.type === 'link');

        const renderAppList = (list) => list.map(app => `
            <div class="start-menu-item" data-app="${app.id}" tabindex="-1" role="menuitem">
                <span class="start-menu-icon" aria-hidden="true">${app.icon}</span>
                <span>${app.name}</span>
            </div>
        `).join('');

        return `
            <div class="start-menu-item submenu-trigger">
                <span class="start-menu-icon">📂</span>
                <span>Programs</span>
                <span class="submenu-arrow">▶</span>
                <div class="start-submenu">
                    ${internet.length > 0 ? `
                    <div class="start-menu-item submenu-trigger">
                        <span class="start-menu-icon">🌐</span>
                        <span>Internet</span>
                        <span class="submenu-arrow">▶</span>
                        <div class="start-submenu">
                            ${renderAppList(internet)}
                        </div>
                    </div>
                    ` : ''}

                    ${multimedia.length > 0 ? `
                    <div class="start-menu-item submenu-trigger">
                        <span class="start-menu-icon">🎵</span>
                        <span>Multimedia</span>
                        <span class="submenu-arrow">▶</span>
                        <div class="start-submenu">
                            ${renderAppList(multimedia)}
                        </div>
                    </div>
                    ` : ''}

                    <div class="start-menu-item submenu-trigger">
                        <span class="start-menu-icon">📝</span>
                        <span>Accessories</span>
                        <span class="submenu-arrow">▶</span>
                        <div class="start-submenu">
                            ${renderAppList(accessories)}
                        </div>
                    </div>

                    ${systemtools.length > 0 ? `
                    <div class="start-menu-item submenu-trigger">
                        <span class="start-menu-icon">🔧</span>
                        <span>System Tools</span>
                        <span class="submenu-arrow">▶</span>
                        <div class="start-submenu">
                            ${renderAppList(systemtools)}
                        </div>
                    </div>
                    ` : ''}

                    <div class="start-menu-item submenu-trigger">
                        <span class="start-menu-icon">🎮</span>
                        <span>Games</span>
                        <span class="submenu-arrow">▶</span>
                        <div class="start-submenu">
                            ${renderAppList(games)}
                        </div>
                    </div>

                    ${links.length > 0 ? `
                        <div class="start-menu-divider"></div>
                        ${links.map(link => `
                            <div class="start-menu-item" data-link="${link.url}">
                                <span class="start-menu-icon">${link.emoji}</span>
                                <span>${link.label}</span>
                            </div>
                        `).join('')}
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderDocumentsSection() {
        return `
            <div class="start-menu-item submenu-trigger">
                <span class="start-menu-icon">📄</span>
                <span>Documents</span>
                <span class="submenu-arrow">▶</span>
                <div class="start-submenu">
                    <div class="start-menu-item" data-app="notepad">
                        <span class="start-menu-icon">📝</span>
                        <span>README.txt</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderSettingsSection() {
        const settingsHtml = `
            <div class="start-menu-item submenu-trigger">
                <span class="start-menu-icon">⚙️</span>
                <span>Settings</span>
                <span class="submenu-arrow">▶</span>
                <div class="start-submenu">
                    <div class="start-menu-item" data-app="controlpanel">
                        <span class="start-menu-icon">🎛️</span>
                        <span>Control Panel</span>
                    </div>
                    <div class="start-menu-item" data-app="display">
                        <span class="start-menu-icon">🖥️</span>
                        <span>Display</span>
                    </div>
                    <div class="start-menu-item" data-app="sounds">
                        <span class="start-menu-icon">🔊</span>
                        <span>Sounds</span>
                    </div>
                    <div class="start-menu-item" data-app="features-settings">
                        <span class="start-menu-icon">⚡</span>
                        <span>Features</span>
                    </div>
                </div>
            </div>
        `;
        // Debug: log that we're rendering with all 4 items
        console.log('[StartMenuRenderer] Settings section rendered with 4 items: controlpanel, display, sounds, features-settings');
        return settingsHtml;
    }

    renderQuickItems() {
        return `
            <div class="start-menu-item" data-app="find">
                <span class="start-menu-icon">🔍</span>
                <span>Find...</span>
            </div>
            <div class="start-menu-item" data-app="help">
                <span class="start-menu-icon">❓</span>
                <span>Help</span>
            </div>
            <div class="start-menu-item" data-app="run">
                <span class="start-menu-icon">▶️</span>
                <span>Run...</span>
            </div>
        `;
    }

    renderAdminItem(isAdmin) {
        return isAdmin ? `
            <div class="start-menu-item" data-app="adminpanel">
                <span class="start-menu-icon">⚙️</span>
                <span>Admin Panel</span>
            </div>` : `
            <div class="start-menu-item" data-app="adminpanel">
                <span class="start-menu-icon">🗝️</span>
                <span>Admin Login</span>
            </div>`;
    }

    renderShutdownItem() {
        return `
            <div class="start-menu-item" data-app="shutdown">
                <span class="start-menu-icon">⏻</span>
                <span>Shut Down...</span>
            </div>
        `;
    }

    /**
     * Attach hover handlers to reposition submenus that would go off-screen
     * Note: Click handlers are handled via event delegation in handleMenuClick()
     */
    attachSubmenuPositioning() {
        const submenuTriggers = this.element.querySelectorAll('.submenu-trigger');

        submenuTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => {
                const submenu = trigger.querySelector(':scope > .start-submenu');
                if (submenu) {
                    this.positionSubmenu(trigger, submenu);
                }
            });

            // Note: We intentionally don't reset positioning on mouseleave
            // because the submenu is a child of the trigger - resetting position
            // while hovering the submenu would cause it to jump away.
            // The CSS handles hiding the submenu when the parent loses hover state.
        });
    }

    /**
     * Position a submenu so it stays on screen
     * Uses fixed positioning to avoid clipping by overflow:auto parents
     * @param {HTMLElement} trigger - The parent menu item
     * @param {HTMLElement} submenu - The submenu element
     */
    positionSubmenu(trigger, submenu) {
        const triggerRect = trigger.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Safeguard: viewport width should never be less than 800 for desktop
        // This fixes issues where innerWidth reports incorrect values during page load
        const viewportWidth = Math.max(window.innerWidth, 800);
        const taskbarHeight = 50;
        const availableHeight = viewportHeight - taskbarHeight;

        // Position submenu to the right of the trigger
        let left = triggerRect.right;
        let top = triggerRect.top;

        // Debug: log submenu info
        const triggerName = trigger.querySelector('span:not(.submenu-arrow):not(.start-menu-icon)')?.textContent || 'unknown';
        const itemCount = submenu.querySelectorAll('.start-menu-item').length;
        console.log(`[StartMenuRenderer] Positioning submenu for "${triggerName}" with ${itemCount} items`);

        // Ensure submenu is visible for measurement
        const originalDisplay = submenu.style.display;
        const originalVisibility = submenu.style.visibility;
        submenu.style.visibility = 'hidden';
        submenu.style.display = 'block';

        // Force reflow to get accurate measurements
        const submenuRect = submenu.getBoundingClientRect();

        console.log(`[StartMenuRenderer] Initial positioning: left=${left}, width=${submenuRect.width}, viewport=${viewportWidth}, triggerLeft=${triggerRect.left}`);

        // Check if submenu would overflow to the right
        if (left + submenuRect.width > viewportWidth) {
            // Try positioning to the left of trigger instead
            const leftAlternative = triggerRect.left - submenuRect.width;
            if (leftAlternative >= 10) {
                // Left positioning works - use it
                left = leftAlternative;
            } else {
                // Both directions overflow - position with small right margin
                left = viewportWidth - submenuRect.width - 10;
                if (left < 10) left = 10; // Ensure minimum left margin
            }
        }

        // Check if submenu would overflow below taskbar
        if (top + submenuRect.height > availableHeight) {
            // Shift up to fit
            top = availableHeight - submenuRect.height;
            if (top < 0) {
                // Submenu is taller than available space, pin to top and limit height
                top = 0;
                submenu.style.maxHeight = `${availableHeight - 10}px`;
            }
        }

        // Apply positioning
        submenu.style.left = `${left}px`;
        submenu.style.top = `${top}px`;

        // Restore original display/visibility to let CSS handle show/hide
        submenu.style.visibility = originalVisibility;
        submenu.style.display = originalDisplay;

        console.log(`[StartMenuRenderer] Positioned "${triggerName}" submenu at left=${left}, top=${top}`);
    }
}

const StartMenuRenderer = new StartMenuRendererClass();
export default StartMenuRenderer;