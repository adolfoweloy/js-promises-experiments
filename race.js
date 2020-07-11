/*
Example of promises using race to implement a timeout for promises
*/
function timeout(ms, promise) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`))
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}

function resolveAfter(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value)
    }, ms)
  })
}

(function(document) {
  const button = document.getElementById('start-race');
  const content = document.getElementById('race-content');
  
  button.addEventListener('click', function() {
    const promise = resolveAfter(1500, 'opa');
    timeout(1000, promise)
      .then(value => {
        content.innerText = value;
      })
      .catch(error => {
        content.innerText = error;
      });
  })
})(window.document)