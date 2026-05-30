/**
 * Utility functions for formatting, sanitization, and generating IDs
 */

/**
 * Generates a unique ID
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * Formats a number as currency
 * @param {number} amount 
 * @param {string} currencySymbol 
 */
export function formatCurrency(amount, currencySymbol = '₹') {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR', // Using INR format for proper comma placement
        currencyDisplay: 'narrowSymbol'
    }).format(amount).replace('₹', currencySymbol); // Fallback to replace symbol if needed
}

/**
 * Basic HTML sanitizer to prevent XSS when setting text/innerHTML
 * @param {string} str 
 */
export function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}
