// main.js

const dataWorker = new Worker('data-processor.js');
const DATA_URL = 'https://fakerapi.it/api/v1/persons?_quantity=1000'; // Replace with a real large data endpoint or a simulated one
const statusDisplay = document.getElementById('status-display');
const loadButton = document.getElementById('load-button');

// Counter to prove the main thread is still responsive
let count = 0;
document.getElementById('count-button').addEventListener('click', () => {
  count++;
  document.getElementById('count-display').textContent = count;
});


loadButton.addEventListener('click', () => {
    statusDisplay.textContent = 'Processing data in background...';
    // Start the heavy process
    dataWorker.postMessage(DATA_URL);
});

dataWorker.onmessage = (event) => {
  const { status, count, message } = event.data;
  
  if (status === 'error') {
    statusDisplay.textContent = `Error: ${message}`;
    return;
  }

  // Result received—UI remains responsive throughout the entire process
  statusDisplay.textContent = `✅ Data loaded and sorted successfully (${count} items)!`;
};