// 1. Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register the Service Worker file (sw.js)
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(registration => {
                console.log('✅ Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.error('❌ Service Worker registration failed:', error);
            });
    });
}

// 2. Requesting a Background Sync
async function syncMessagesLater() {
    const output = document.getElementById('output');
    output.textContent = 'Attempting to register background sync...';

    if (!('serviceWorker' in navigator) || !('sync' in navigator.serviceWorker.ready)) {
        output.textContent = 'Error: Background Sync API not supported or SW not ready.';
        console.error('Background Sync API not supported.');
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        // Register a sync event with a unique tag
        await registration.sync.register("sync-messages");
        
        output.textContent = 'Background Sync "sync-messages" registered successfully!';
        console.log("🔔 Background Sync 'sync-messages' registered.");
        console.log("If offline, the sync event will fire when the network is restored.");

    } catch (e) {
        output.textContent = 'Background Sync could not be registered! (Requires HTTPS or localhost)';
        console.error("Background Sync could not be registered:", e);
    }
}

// 3. Event Listener for Button
document.getElementById('syncButton').addEventListener('click', syncMessagesLater);