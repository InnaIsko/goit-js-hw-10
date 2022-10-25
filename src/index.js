import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const ulRef = document.querySelector('.country-list');
const divRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const inputValue = event.target.value.trim();
  if (inputValue === '') {
    ulRef.innerHTML = ' ';
    divRef.innerHTML = ' ';
    return;
  }

  API.fetchCountries(inputValue)
    .then(data => {
      const objLength = data.length;
      let languagesName;
      if (objLength > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      data.map(element => {
        element.languages.map(lang => {
          languagesName = lang.name;
        });
        const markup = markupListCountriesAll(element);
        const markupAll = markupListCountri(element, languagesName);
        renderMarkup(objLength, markup, markupAll);
      });
    })
    .catch(Error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
function markupListCountriesAll({ flags, name }) {
  return `<li class="country-list__item"><img class="country-list__img" src="${flags.svg}" alt="name" width="30px" /> ${name}</li>`;
}
function markupListCountri(element, languagesName) {
  return `<ul class="country-info__list">
         <li class="country-info__item country-info__item-name"><img class="country-info__img" src="${element.flags.svg}" alt="name" width="45px"/>${element.name}</li>
        <li class="country-info__item"><span class="country-info__span">Capital:</span> ${element.capital}</li>
        <li class="country-info__item"><span class="country-info__span">Population:</span> ${element.population}</li>
        <li class="country-info__item"><span class="country-info__span">Languages:</span> ${languagesName}</li>
      </ul>`;
}
function renderMarkup(objLength, markup, markupAll) {
  if (objLength <= 10 && objLength > 2) {
    divRef.innerHTML = ' ';
    ulRef.insertAdjacentHTML('beforeend', markup);
  }
  if (objLength === 1) {
    ulRef.innerHTML = ' ';
    divRef.insertAdjacentHTML('beforeend', markupAll);
  }
}
