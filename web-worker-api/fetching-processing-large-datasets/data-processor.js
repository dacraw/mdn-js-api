// data-processor.js

self.onmessage = async (event) => {
  const url = event.data; // URL passed from the main thread
  
  try {
    // 1. Fetch the data (Network requests are non-blocking to the worker)
    const response = await fetch(url);
    
    // 2. Heavy JSON parsing happens here, blocking the worker thread, but NOT the main UI thread.
    const {data} = await response.json(); 

    console.log('data', data)

    // 3. Perform heavy processing (e.g., complex sort on a large array)
    console.log('Worker: Starting heavy sort...');
    data.sort((a, b) => {
      // Example complex sorting logic: sort by category, then by name
      if (a.lastname !== b.lastname) {
          return a.lastname.localeCompare(b.lastname);
      }
      return a.firstname.localeCompare(b.firstname);
    });
    console.log('Worker: Sort complete.');

    // 4. Send the processed data back to the main thread
    self.postMessage({ status: 'done', count: data.length });
    
  } catch (error) {
    self.postMessage({ status: 'error', message: error.message });
  }
};