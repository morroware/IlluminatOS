/**
 * WebAdminAuth - Web Administrator Authentication Utilities
 *
 * This module provides authentication utilities to distinguish between:
 * - OS "admin" users (just a role in the simulated OS)
 * - Actual web administrators (authenticated with password)
 *
 * This is important for security-sensitive features like:
 * - Auto-starting scenarios on boot
 * - Hiding system apps
 * - Administrative settings
 */

import StateManager from './StateManager.js';
import StorageManager from './StorageManager.js';

/**
 * Check if an admin password has been configured
 * @returns {boolean} True if password protection is enabled
 */
export function hasAdminPassword() {
    return !!StorageManager.get('adminPassword');
}

/**
 * Check if the current session is authenticated as web admin
 *
 * Web admin authentication requires BOTH:
 * 1. An admin password is configured (stored in StorageManager)
 * 2. User has authenticated with that password in this session
 *
 * @returns {boolean} True if authenticated as web admin
 */
export function isWebAdmin() {
    // If no password is set, anyone is effectively admin (no protection)
    if (!hasAdminPassword()) {
        return true;
    }

    // Check if user has authenticated as web admin in this session
    return StateManager.getState('webAdmin.authenticated') === true;
}

/**
 * Authenticate as web admin with password
 * @param {string} password - Password to check
 * @returns {boolean} True if password is correct
 */
export function authenticateWebAdmin(password) {
    const savedPassword = StorageManager.get('adminPassword');

    if (!savedPassword) {
        // No password set, so authentication succeeds by default
        setWebAdminAuthenticated(true);
        return true;
    }

    if (password === savedPassword) {
        setWebAdminAuthenticated(true);
        return true;
    }

    return false;
}

/**
 * Set web admin authentication state
 * @param {boolean} authenticated - Authentication state
 */
export function setWebAdminAuthenticated(authenticated) {
    StateManager.setState('webAdmin.authenticated', authenticated);
}

/**
 * Log out from web admin session
 */
export function logoutWebAdmin() {
    StateManager.setState('webAdmin.authenticated', false);
    // Also clear OS admin flag to be safe
    StateManager.setState('user.isAdmin', false);
}

/**
 * Set the admin password
 * @param {string} password - New password
 */
export function setAdminPassword(password) {
    StorageManager.set('adminPassword', password);
}

/**
 * Remove the admin password (disable password protection)
 */
export function removeAdminPassword() {
    StorageManager.remove('adminPassword');
    // Clear authentication state
    setWebAdminAuthenticated(false);
}

/**
 * Check if user should have access to admin-only features
 *
 * This is the main function to use for checking admin access
 * throughout the application.
 *
 * @returns {boolean} True if user has admin access
 */
export function hasAdminAccess() {
    return isWebAdmin();
}

export default {
    hasAdminPassword,
    isWebAdmin,
    authenticateWebAdmin,
    setWebAdminAuthenticated,
    logoutWebAdmin,
    setAdminPassword,
    removeAdminPassword,
    hasAdminAccess
};
