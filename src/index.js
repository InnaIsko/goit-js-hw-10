import './css/styles.css';
// import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(event) {
  const inputValue = event.currentTarget.value;
  console.log(inputValue);
  fetchCountries(inputValue);
}
function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(data => console.log(data));
}
