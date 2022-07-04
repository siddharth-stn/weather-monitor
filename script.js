import { compareAsc, format } from 'date-fns'


function handleError () {
    document.querySelector(".notFound").classList.remove("hidden");
    document.querySelector(".temperatureDiv").classList.add("hidden");
    document.querySelector(".weatherType").classList.add("hidden");
    document.querySelector(".locationDateTime").classList.add("hidden");
}

function reset () {
    document.querySelector(".notFound").classList.add("hidden");
    document.querySelector(".temperatureDiv").classList.remove("hidden");
    document.querySelector(".weatherType").classList.remove("hidden");
    document.querySelector(".locationDateTime").classList.remove("hidden");
}

async function getWeatherData(city) {
    let source_address = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=acb49f75e87e8a21de203154f0da8854&units=metric`;
    const response = await fetch(source_address, {mode: "cors"})
    if (response.status !== 200) {
        handleError();
        return;
    }
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

let city_name = "Satna";
location.innerText = city_name;

getWeatherData(city_name)
.then(displayData);

function setToday (data) {
    let utcOffsetInSeconds = data.timezone;
    let currDateTime = new Date ();
    let localTime = currDateTime.getTime(); //convert to msec since Jan 1 1970
    let localOffset = currDateTime.getTimezoneOffset()*60000; //convert minutes to milli seconds
    let UTC = localTime + localOffset;
    let finalTimeInMilliSec = UTC + (utcOffsetInSeconds*1000);
    let finalTime = new Date (finalTimeInMilliSec); //get date and time according to the offset timezone
    
    let time = finalTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let day = finalTime.getDay();
    

    switch (day) {
        case 0:
            day = "Sun"
            break;
        case 1:
            day = "Mon"
            break;
        case 2:
            day = "Tue"
            break;
        case 3:
            day = "Wed"
            break;
        case 4:
            day = "Thu"
            break;
        case 5:
            day = "Fri"
            break;
        case 6:
            day = "Sat"
            break;                         
    }

    let date = `${day}, ${format(new Date(), 'dd MMMM yyyy')} ${time}`;
    dateTime.innerText = date;
}



function displayData(data) {
    location.innerText = data.name;
    setToday(data);
    let temp = Math.round(Number(data.main.temp));
    tempDisp.innerText = temp;
    weatherType.innerText = data.weather[0].description;
}


btnGo.addEventListener('click', () =>  {
    reset();
    city_name = cityInput.value;
    cityInput.value = "";
    getWeatherData(city_name)
    .then(displayData)
    .catch(() => {
        handleError();
    });
});
