export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(data => console.log(data));
}
