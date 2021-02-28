function loadData(){
  fetch('https://restcountries.eu/rest/v2/all')
  .then(res => res.json())
  .then(data => showCountries(data));
}
loadData();
function showCountries(data){
  const countriesDiv = document.getElementById("countries-div");
  data.forEach(country => {
    const countryDiv = document.createElement('div');
    countryDiv.className = 'country-div';
    // countryDiv.onclick = showCountryDetails(country.name);
    countryDiv.setAttribute('onclick', `showCountryDetails('${country.name}')`);
    // countryDiv.addEventListener('click', showCountryDetails(country.name));
    countryDiv.innerHTML = `
    <h1 class="country-name">${country.name}<h1>
    <p class="capital-name">${country.capital}<p>
    `;
    countriesDiv.appendChild(countryDiv);
  });
}

function showCountryDetails(country){
  const url = `https://restcountries.eu/rest/v2/name/${country}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showInModal(data[0]));
}

const showInModal = country => {
  const countryDetails = document.getElementById('country-details');

  countryDetails.innerHTML =`
    <div class="row country-info">      
        <div class="col-8">
          <h2>${country.name}</h2>
          <p><i class="fas fa-check-circle"></i> Native name: ${country.nativeName}</p>
          <p><i class="fas fa-check-circle"></i> Capital: ${country.capital}</p>
          <p><i class="fas fa-check-circle"></i> Region: ${country.region}</p>
          <p><i class="fas fa-check-circle"></i> Subregion: ${country.subregion}</p>
          <p><i class="fas fa-check-circle"></i> Language: ${country.language}</p>
          <p><i class="fas fa-check-circle"></i> Area: ${country.area}</p>
          <p><i class="fas fa-check-circle"></i> Population: ${country.population}</p>
          <p><i class="fas fa-check-circle"></i> Timezones: ${country.timezones}</p>
        </div>
        <div class="col-4 image">
          <img id="flag" src="${country.flag}">        
        </div>
        <button id="close-btn" class="btn btn-warning" onclick="closeCountryInfo()">Close</button>
      </div>
    `;
    countryDetails.style.display = 'block';
    document.getElementById('countries-div').style.opacity = .2;
    document.getElementById('countries-div').style.pointerEvents = 'none';
}

const closeCountryInfo = () => {
  document.getElementById('country-details').style.display = 'none';
  document.getElementById('countries-div').style.opacity = 1;
  document.getElementById('countries-div').style.pointerEvents = 'auto';
}