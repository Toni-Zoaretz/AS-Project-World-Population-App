/// function continent

let countriesNamesArr = [];
let countriesPopulationArr = [];
async function getContinentCountriesData(region) {
  try {
    let response = await fetch(`https://restcountries.com/v2/region/${region}`);
    if (!response.ok) throw Error("ERROR!!");
    let data = await response.json();
    // console.log(data);
    countriesNamesArr = [];
    countriesPopulationArr = [];
    data.forEach((country) => {
      countriesNamesArr.push(country.name);
      countriesPopulationArr.push(country.population);
    });
    createbtn(countriesNamesArr);
    // console.log(countriesNamesArr);
    // console.log(countriesPopulationArr);
  } catch (erroe) {
    console.log("error");
  }
}

// --------------------------------------------------------Function to creat bttons ------------------------------------------------
function createbtn(countriesNamesArr) {
  for (let i = 0; i < countriesNamesArr.length; i++) {
    // console.log(countriesNamesArr[i]);
    let btn = document.createElement("button");
    btn.innerText = countriesNamesArr[i];
    btnBox.appendChild(btn);
    // btn.addEventListener("click", function (e) {
    //   console.log(e.target.innerText);
    // });
    // console.log(btn);
  }
}

// ------------------------Faunction for specifi country name -----------------------------------------------------------------

let country = "";
function getOneCountryName() {
  btnBox.addEventListener("click", function (e) {
    country = e.target.innerText;
    console.log(country);
    getCountriesCitiesData(country);
  });
}

getOneCountryName();

// -------------------------------------Function to get all cities of every country ---------------------------------------------

let citiesNamesArr = [];
let citiesPopulationArr = [];
async function getCountriesCitiesData(country) {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population/cities/filter",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 1000,
          order: "asc",
          orderBy: "name",
          country: `${country}`,
        }),
      }
    );
    let data = await response.json();
    citiesNamesArr = [];
    citiesPopulationArr = [];
    if (!response.ok) throw Error("ERROR!!");
    data.data.forEach((cityName) => {
      citiesNamesArr.push(cityName.city);
      citiesPopulationArr.push(cityName.populationCounts[0].value);
    });
    console.log(citiesPopulationArr);
    console.log(citiesNamesArr);
    // console.log(data);
  } catch (error) {
    console.log("error");
  }
}