// Basic Service Worker Lifecycle (for installation/activation)
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(self.clients.claim());
});

// --- Background Sync Handler Function ---

// The actual task you want to defer (e.g., sending queued data)
async function sendOutboxMessages() {
    console.log('✅ [SW] Starting background sync task: sendOutboxMessages');
    
    // --- In a real app, you would retrieve data from IndexedDB here ---
    
    try {
        // Simulate a network request that takes 3 seconds
        console.log('[SW] Simulating network call...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('✨ [SW] Sync task completed successfully!');
        // --- In a real app, you would delete the synced data from IndexedDB here ---
        
    } catch (error) {
        console.error('❌ [SW] Sync task failed:', error);
        // IMPORTANT: Re-throwing the error tells the browser to retry the sync later.
        throw error;
    }
}


// Event listener for the background sync event
self.addEventListener("sync", (event) => {
    console.log(`⭐ [SW] Background Sync event received! Tag: ${event.tag}`);
    
    if (event.tag === "sync-messages") {
        // event.waitUntil() keeps the service worker alive until the promise resolves.
        event.waitUntil(sendOutboxMessages());
    }
});