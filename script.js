import { compareAsc, format } from 'date-fns'


async function getWeatherData(city) {
    let source_address = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=acb49f75e87e8a21de203154f0da8854&units=metric`;
    const response = await fetch(source_address, {mode: "cors"})
    const weatherData = await response.json();
    return weatherData;
}

let tempDisp = document.querySelector(".temperatureInNumber");
let giph = document.querySelector(".giph");
let weatherType = document.querySelector(".weatherType");
let location = document.querySelector(".location");
let dateTime = document.querySelector(".dateTime");


let cityInput = document.querySelector(".cityName");
let btnGo = document.querySelector(".btnGo");

let city_name = "SATNA";
location.innerText = city_name;

function displayData(data) {
    location.innerText = data.name;

    //! Have to start working here ----------> 
    //let date = format(new Date(Date.now), 'dd-MM-yyyy')

    let temp = Math.round(Number(data.main.temp));
    tempDisp.innerText = temp;
    weatherType.innerText = data.weather[0].description;
}


btnGo.addEventListener('click', () =>  {
    city_name = cityInput.value;
    getWeatherData(city_name)
    .then(displayData);
});
