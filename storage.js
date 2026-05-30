/**
 * LocalStorage layer and data schemas
 */
const STORAGE_KEY = 'expenseTracker:data';
const CURRENT_VERSION = 1;

const DEFAULT_DATA = {
    version: CURRENT_VERSION,
    settings: {
        currency: '₹',
        theme: 'dark',
        startOfWeek: 'Mon'
    },
    transactions: []
};

/**
 * Initializes and retrieves data from local storage
 */
export function getStorageData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return DEFAULT_DATA;
        }
        
        const data = JSON.parse(raw);
        return runMigrations(data);
    } catch (e) {
        console.error('Failed to parse storage data', e);
        return DEFAULT_DATA;
    }
}

/**
 * Saves data to local storage
 */
export function saveStorageData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save data', e);
    }
}

/**
 * Migrates old data schemas to the current version
 */
function runMigrations(data) {
    let currentData = { ...data };
    
    // Example migration pattern for future versions
    if (currentData.version < CURRENT_VERSION) {
        // if (currentData.version === 1) { 
        //   migrate logic for v1 -> v2
        //   currentData.version = 2; 
        // }
    }
    
    return currentData;
}
