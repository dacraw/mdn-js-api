// main.js
// 1. Create a counter to prove the UI is still responsive
let count = 0;
const countDisplay = document.getElementById('count-display');

const countButton = document.getElementById('count-button');

countButton.addEventListener('click', () => {
    console.log('yo')
  count++;
  countDisplay.textContent = count;
});

// 2. Instantiate the Web Worker
const worker = new Worker('prime-finder.js');

// 3. Send a message to the worker to start the calculation
document.getElementById('start-button').addEventListener('click', () => {
  const n = document.getElementById('input-n').value;
  console.log(`Sending request to worker for the ${n}-th prime...`);
  worker.postMessage(n);
});

// 4. Listen for the result message from the worker
worker.onmessage = (event) => {
  const result = event.data;
  document.getElementById('result-display').textContent = `The prime is: ${result}`;
  console.log('Calculation complete!');
};

// 5. Handle errors
worker.onerror = (error) => {
    console.error('Worker error:', error);
};