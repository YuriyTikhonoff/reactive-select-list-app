let cities = {
  US: ["NY", "Chicago", "LA"],
  Ukraine: ["Kyiv", "Odessa", "ZP"],
};

const state = {};
state.displayedCities = { ...cities };
state.chosenCities = {};

const selectCountry = document.querySelector("#select-country");
const selectCity = document.querySelector("#select-city");
const citiesListHTMLElement = document.querySelector(".list-section");
console.log(citiesListHTMLElement);

const renderSelectOptions = (options, parent) => {
  parent.innerHTML = "";
  options.forEach((optionItem, idx) => {
    let option = document.createElement("option");
    option.textContent = optionItem;
    if (idx === 0) option.setAttribute("selected", true);
    option.setAttribute("value", optionItem);
    parent.append(option);
    //console.log(option);
  });
};

const getCountryByCity = (cityName, citiesObj) => {
  console.log(cityName);
  console.log(citiesObj);
  const countryName = Object.entries(citiesObj).reduce(
    (acc, [country, cities]) => {
      if (cities.includes(cityName)) acc = country;
      return acc;
    },
    ""
  );
  return countryName;
};

console.log(getCountryByCity("Odessa", cities));

const deleteCityHandler = (city) => {
  const countryName = getCountryByCity(city, cities);
  console.log(`delete ${city} ${countryName}`);
  state.chosenCities[countryName] = state.chosenCities[countryName].filter(
    (cityName) => cityName !== city
  );
  state.displayedCities[countryName].push(city);
  renderSelectOptions(Object.keys(state.displayedCities), selectCountry);
  renderSelectOptions(state.displayedCities[countryName], selectCity);
  renderChosenItems(state.chosenCities, citiesListHTMLElement);
};

const deleteCountryHandler = (country) => {
  state.chosenCities[country] = [];
  renderChosenItems(state.chosenCities, citiesListHTMLElement);
  state.displayedCities[country] = [...cities[country]];
  renderSelectOptions(Object.keys(state.displayedCities), selectCountry);
  renderSelectOptions(state.displayedCities[country], selectCity);
  console.log(`Deleted ${country}`);
};

const renderChosenItems = (items, parent) => {
  parent.innerHTML = "";
  Object.entries(items).forEach(([key, value]) => {
    if (value.length > 0) {
      console.log(value);
      const countryCard = document.createElement("div");
      const countryTitle = document.createElement("h3");
      countryTitle.textContent = key;
      countryCard.append(countryTitle);
      const deleteCountryBtn = document.createElement("button");
      deleteCountryBtn.textContent = "X";
      countryTitle.append(deleteCountryBtn);
      countryTitle.addEventListener("click", () => deleteCountryHandler(key));
      countryCard.classList.add("country-card");
      parent.append(countryCard);

      value.forEach((city) => {
        const cityItem = document.createElement("div");
        cityItem.textContent = city;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        cityItem.append(deleteBtn);
        cityItem.addEventListener("click", () => deleteCityHandler(city));
        countryCard.append(cityItem);
      });
    }
  });
};

renderSelectOptions(Object.keys(state.displayedCities), selectCountry);

const selectCountryHandler = (e) => {
  const chosenCountryName = e.target.value;
  console.log(chosenCountryName);
  const selectedCities = state.displayedCities[chosenCountryName];

  console.log(selectedCities);
  renderSelectOptions(selectedCities, selectCity);
};

const selectCityHandler = (e) => {
  const chosenCityName = e.target.value;
  const countryName = getCountryByCity(chosenCityName, cities);
  console.log(chosenCityName);

  state.chosenCities[countryName] = state.chosenCities[countryName] || [];
  state.chosenCities[countryName].push(chosenCityName);
  renderChosenItems(state.chosenCities, citiesListHTMLElement);
  state.displayedCities[countryName] = state.displayedCities[
    countryName
  ].filter((cityName) => cityName !== chosenCityName);
  console.log(state.displayedCities);
  renderSelectOptions(Object.keys(state.displayedCities), selectCountry);
  renderSelectOptions(state.displayedCities[countryName], selectCity);
};

selectCountry.addEventListener("change", selectCountryHandler);
selectCity.addEventListener("change", selectCityHandler);

//console.log(selectCountry);
