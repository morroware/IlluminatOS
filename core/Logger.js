/**
 * Logger - Development mode logging utility
 * Provides configurable logging with levels and categories
 * Can be disabled in production for performance
 */

// Log levels
const LogLevel = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    NONE: 4
};

// Log level names for display
const LogLevelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'];

class LoggerClass {
    constructor() {
        // Default to INFO level in production, DEBUG in development
        this.level = this.isDevelopment() ? LogLevel.DEBUG : LogLevel.INFO;
        // Categories that are enabled (empty = all enabled)
        this.enabledCategories = new Set();
        // Categories that are disabled
        this.disabledCategories = new Set();
        // Prefix for all log messages
        this.prefix = '[IlluminatOS]';
        // Store logs for debugging
        this.history = [];
        this.maxHistory = 100;
        // Performance tracking
        this.timers = new Map();
    }

    /**
     * Check if running in development mode
     */
    isDevelopment() {
        // Check for localhost or development indicators
        if (typeof window !== 'undefined') {
            const hostname = window.location?.hostname || '';
            return hostname === 'localhost' ||
                   hostname === '127.0.0.1' ||
                   hostname.startsWith('192.168.') ||
                   hostname.includes('.local') ||
                   window.location?.search?.includes('debug=true');
        }
        return false;
    }

    /**
     * Set the minimum log level
     * @param {number|string} level - Log level (0-4 or 'DEBUG', 'INFO', etc.)
     */
    setLevel(level) {
        if (typeof level === 'string') {
            const upperLevel = level.toUpperCase();
            if (LogLevel[upperLevel] !== undefined) {
                this.level = LogLevel[upperLevel];
            }
        } else if (typeof level === 'number' && level >= 0 && level <= 4) {
            this.level = level;
        }
    }

    /**
     * Enable logging for a specific category
     * @param {string} category - Category name
     */
    enableCategory(category) {
        this.enabledCategories.add(category);
        this.disabledCategories.delete(category);
    }

    /**
     * Disable logging for a specific category
     * @param {string} category - Category name
     */
    disableCategory(category) {
        this.disabledCategories.add(category);
        this.enabledCategories.delete(category);
    }

    /**
     * Check if a category should log
     */
    shouldLog(level, category) {
        // Check log level
        if (level < this.level) return false;

        // Check category
        if (category) {
            if (this.disabledCategories.has(category)) return false;
            if (this.enabledCategories.size > 0 && !this.enabledCategories.has(category)) return false;
        }

        return true;
    }

    /**
     * Format a log message
     */
    format(level, category, message, ...args) {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
        const levelStr = LogLevelNames[level];
        const categoryStr = category ? `[${category}]` : '';
        return [`${timestamp} ${this.prefix}${categoryStr} ${levelStr}:`, message, ...args];
    }

    /**
     * Add to log history
     */
    addToHistory(level, category, message) {
        this.history.push({
            timestamp: Date.now(),
            level: LogLevelNames[level],
            category,
            message
        });

        // Keep history bounded
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }

    /**
     * Debug level logging
     */
    debug(message, ...args) {
        this.log(LogLevel.DEBUG, null, message, ...args);
    }

    /**
     * Info level logging
     */
    info(message, ...args) {
        this.log(LogLevel.INFO, null, message, ...args);
    }

    /**
     * Warning level logging
     */
    warn(message, ...args) {
        this.log(LogLevel.WARN, null, message, ...args);
    }

    /**
     * Error level logging
     */
    error(message, ...args) {
        this.log(LogLevel.ERROR, null, message, ...args);
    }

    /**
     * Log with category
     */
    category(cat) {
        return {
            debug: (message, ...args) => this.log(LogLevel.DEBUG, cat, message, ...args),
            info: (message, ...args) => this.log(LogLevel.INFO, cat, message, ...args),
            warn: (message, ...args) => this.log(LogLevel.WARN, cat, message, ...args),
            error: (message, ...args) => this.log(LogLevel.ERROR, cat, message, ...args),
            time: (label) => this.time(`${cat}:${label}`),
            timeEnd: (label) => this.timeEnd(`${cat}:${label}`)
        };
    }

    /**
     * Core logging function
     */
    log(level, category, message, ...args) {
        if (!this.shouldLog(level, category)) return;

        const formatted = this.format(level, category, message, ...args);
        this.addToHistory(level, category, message);

        switch (level) {
            case LogLevel.DEBUG:
                console.debug(...formatted);
                break;
            case LogLevel.INFO:
                console.info(...formatted);
                break;
            case LogLevel.WARN:
                console.warn(...formatted);
                break;
            case LogLevel.ERROR:
                console.error(...formatted);
                break;
        }
    }

    /**
     * Start a performance timer
     */
    time(label) {
        this.timers.set(label, performance.now());
    }

    /**
     * End a performance timer and log the duration
     */
    timeEnd(label) {
        const start = this.timers.get(label);
        if (start) {
            const duration = (performance.now() - start).toFixed(2);
            this.timers.delete(label);
            this.debug(`${label}: ${duration}ms`);
            return parseFloat(duration);
        }
        return 0;
    }

    /**
     * Group console output
     */
    group(label) {
        if (this.level <= LogLevel.DEBUG) {
            console.group(label);
        }
    }

    /**
     * End console group
     */
    groupEnd() {
        if (this.level <= LogLevel.DEBUG) {
            console.groupEnd();
        }
    }

    /**
     * Log a table (useful for arrays/objects)
     */
    table(data) {
        if (this.level <= LogLevel.DEBUG) {
            console.table(data);
        }
    }

    /**
     * Get log history
     */
    getHistory() {
        return [...this.history];
    }

    /**
     * Clear log history
     */
    clearHistory() {
        this.history = [];
    }

    /**
     * Silence all logging (for production)
     */
    silence() {
        this.level = LogLevel.NONE;
    }

    /**
     * Enable verbose logging (for debugging)
     */
    verbose() {
        this.level = LogLevel.DEBUG;
    }
}

// Singleton instance
const Logger = new LoggerClass();

// Export both the instance and log levels
export default Logger;
export { LogLevel, LogLevelNames };
