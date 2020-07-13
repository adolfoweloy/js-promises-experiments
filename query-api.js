class QueryApi {
  
  static apiUrl() {
    return "https://starwars.egghead.training"
  }
  
  static getRoot() {
    document.getElementById('root')
  } 
  
  static getSpinner() {
    document.getElementById('spinner')  
  }
  
  queryAPI(endpoint) {
    return fetch(QueryApi.apiUrl() + endpoint)
      .then(response => {
        return response.ok
          ? response.json()
          : Promise.reject(Error('Unsuccessful response'))
      })
  }
  
}
