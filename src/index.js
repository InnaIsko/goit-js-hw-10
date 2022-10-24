import './css/styles.css';
// import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 1000;
const inputRef = document.querySelector('#search-box');
const ulRef = document.querySelector('.country-list');
const divRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const inputValue = event.target.value.trim();

  fetchCountries(inputValue);
}
function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      const objLength = data.length;
      const countriesArrey = data.map(element => {
        const markup = markupListCountriesAll(element);
        const markupAll = markupListCountri(element);

        if (objLength > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (objLength <= 10 && objLength > 2) {
          ulRef.insertAdjacentHTML('beforeend', markup);
        }
        if (objLength === 1) {
          divRef.insertAdjacentHTML('beforeend', markupAll);
        }
      });
    });
}
function markupListCountriesAll({ flags, name }) {
  return `<li class="country-list__item"><img class="country-img" src="${flags.svg}" alt="name" width="30px" /> ${name}</li>`;
}
function markupListCountri({ flags, name, capital, population, languages }) {
  return `<ul "country-info__list">
         <li class="country-info__item"><img "country-info__img" src="${flags.svg}" alt="name" width="30px"/></li>
        <li class="country-info__item">${name}</li>
        <li class="country-info__item">Capital: ${capital}</li>
        <li class="country-info__item">Population: ${population}</li>
        <li class="country-info__item">Languages: ${languages.name}</li>
      </ul>`;
}
