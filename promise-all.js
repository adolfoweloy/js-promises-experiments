const API_URL = 'https://starwars.egghead.training/';

const output = document.getElementById('output');
const spinner = document.getElementById('spinner');

function queryAPI(endpoint) {
  return fetch(API_URL + endpoint).then(response => {
    return response.ok
      ? response.json()
      : Promise.reject(Error('Unsuccessful response'));
  })
}

// changed from Promise.all to Promise.allSettled
// to avoid getting a rejected promise in case that there's
// at least a fulfilled/resolved entry
Promise.allSettled([
  queryAPI('moto').then(m => `${m.length} motos`),
  queryAPI('films').then(f => `${f.length} films`),
  queryAPI('planets').then(p => `${p.length} planets`),
  queryAPI('species').then(s => `${s.length} species`),
])
.then(results => {
    const entries = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);
  
    output.innerText = entries.length > 0
      ? entries.join('\n')
      : 'no results';
})
.finally(() => {
  spinner.remove();
});