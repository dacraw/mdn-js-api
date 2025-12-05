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

// main.js (Refined support check)
async function syncMessagesLater() {
    const output = document.getElementById('output');
    
    // Check 1: Is Service Worker supported at all?
    if (!('serviceWorker' in navigator)) {
        output.textContent = 'Error: Service Workers not supported.';
        console.error('Service Workers not supported.');
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        
        // Check 2: Is the SyncManager available on this specific registration object?
        // The property you are looking for is registration.sync
        if (!registration.sync) { 
            // This is the error-catching block for your specific problem
            output.textContent = 'Error: Background Sync API (SyncManager) is not available on this registration.';
            console.error('Background Sync API is not available, even though the Service Worker is ready.');
            return;
        }

        // If we reach here, the API is supported and ready to use
        output.textContent = 'Attempting to register background sync...';
        await registration.sync.register("sync-messages");
        
        output.textContent = 'Background Sync "sync-messages" registered successfully!';
        console.log("🔔 Background Sync 'sync-messages' registered successfully.");

    } catch (e) {
        output.textContent = 'Background Sync registration failed (Final Catch).';
        console.error("Background Sync registration failed:", e);
    }
}

// 3. Event Listener for Button
document.getElementById('syncButton').addEventListener('click', syncMessagesLater);