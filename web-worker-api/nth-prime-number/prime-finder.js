// prime-finder.js

// A heavy function to find the Nth prime number
function findNthPrime(n) {
  let count = 0;
  let num = 1;
  while (count < n) {
    num++;
    if (isPrime(num)) {
      count++;
    }
  }
  return num;
}

function isPrime(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

// 1. Listen for incoming messages from the main thread
self.onmessage = (event) => {
  const n = parseInt(event.data);

  if (isNaN(n) || n <= 0) {
    // Send back an error message or handle appropriately
    self.postMessage("Invalid input.");
    return;
  }

  // 2. Perform the heavy computation
  const result = findNthPrime(n);

  // 3. Send the result back to the main thread
  self.postMessage(result);
};