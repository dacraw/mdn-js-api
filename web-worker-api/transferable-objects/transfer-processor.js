// transfer-processor.js

self.onmessage = (event) => {
  // We receive the object containing the buffer
  const { buffer, operation } = event.data;
  
  if (operation !== 'process') return;

  // 1. The buffer is now usable only in the worker thread
  console.log('Worker: Buffer received, size:', buffer.byteLength, 'bytes');
  const workerView = new Int32Array(buffer);

  // 2. Perform some heavy modification on the data (e.g., simple manipulation)
  // This operation is performed directly on the transferred memory block.
  for (let i = 0; i < workerView.length; i++) {
      workerView[i] *= 2; // Double every value
  }
  
  console.log('Worker: Data processing complete. Transferring back...');

  // 3. Transfer the *modified* buffer back to the main thread
  // The worker's buffer becomes neutered after this line.
  self.postMessage({ buffer: buffer }, [buffer]); // <--- Key: Transfer it back!
};