const API_URL = "https://starwars.egghead.training";
const root = document.getElementById('root')
const spinner = document.getElementById('spinner')

fetch(API_URL + "/films")
  .then(response => {
    if (!response.ok) {
      return Promise.reject(
        new Error('Lascou')
      );
    }
    return response.json();
  })
  .then(films => root.innerText = getFilmTitles(films))
  .catch(error => {
    console.warn(error);
    root.innerText = error.message
  })
  .finally(() => spinner.remove()) // invoked when fulfilled or rejected

function getFilmTitles(films) {
  return films
      .sort((a, b) => a.episode_id - b.episode_id)
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n")
}
