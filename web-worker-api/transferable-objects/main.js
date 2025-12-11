// main.js

// 1. Create a worker (re-using the data-processor from Example 2 for simplicity)
const transferWorker = new Worker('transfer-processor.js');

// 2. Create a large ArrayBuffer (e.g., 32 MB)
const MB = 1024 * 1024;
const bufferSize = 32 * MB; 
const largeBuffer = new ArrayBuffer(bufferSize);
const int32View = new Int32Array(largeBuffer);

// Populate the buffer with some data
for (let i = 0; i < int32View.length; i++) {
    int32View[i] = i; 
}

// 3. Set up the transfer on button click
document.getElementById('transfer-button').addEventListener('click', () => {
    console.log('Main: Buffer size before transfer:', largeBuffer.byteLength, 'bytes');
    
    // 4. Send the buffer, specifying it in the transfer list (the second argument)
    transferWorker.postMessage(
        { buffer: largeBuffer, operation: 'process' }, 
        [largeBuffer] // <--- THE TRANSFER LIST: This is the key!
    );

    // 5. Test if the buffer is still usable (It should be neutered!)
    console.log('Main: Buffer size after transfer:', largeBuffer.byteLength, 'bytes');
    try {
        // This line will typically throw an error if the transfer was successful
        console.log('Main: First element after transfer:', int32View[0]);
    } catch (e) {
        console.log('Main: Successfully transferred. Accessing view failed:', e.message);
    }
});

// 6. Listen for the processed buffer coming back
transferWorker.onmessage = (event) => {
    const receivedBuffer = event.data.buffer;
    console.log('Main: Buffer received back from worker.');
    console.log('Main: Received buffer size:', receivedBuffer.byteLength, 'bytes');

    // We can now create a view on the received buffer to use the results
    const receivedView = new Int32Array(receivedBuffer);
    console.log('Main: Last element (processed) is:', receivedView[receivedView.length - 1]);
};