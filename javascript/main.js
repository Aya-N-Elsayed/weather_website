// ? input selectors

let loc = document.querySelector(".loc").value;
let baseUrl = `./images/weather/64x64`;
var x;
// ? Api requests and responses

var respArr=[];

function getResp(){


    return new Promise(function(fn){

        var getWeatherRequest = new XMLHttpRequest();

        getWeatherRequest.open(
          "GET",
          `http://api.weatherapi.com/v1/forecast.json?key=c2358656c3874c23b1e101821230708&q=${loc}&days=3&aqi=no`
        );

        getWeatherRequest.send();

        getWeatherRequest.addEventListener("loadend", function () {
          console.log(JSON.parse(getWeatherRequest.response));

          // return (JSON.parse(getWeatherRequest.response));
          respArr = JSON.parse(getWeatherRequest.response);
          // return respArr;
          fn();
        });

        

    })

    

}

function displayWeather() {
    todayWeather();
    tomWeather();
    afterWeather();

    // console.log("disaya");
}

function todayWeather(){
    document.querySelector("#today .descrip").innerHTML = respArr.current.condition.text;
    document.querySelector("#today .temp").innerHTML = Math.floor(respArr.current.feelslike_c) + "°C";
    document.querySelector("#today .dir").innerHTML = respArr.current.wind_dir;
    document.querySelector("#today .wind").innerHTML = Math.round(respArr.current.wind_kph) + "km/h";
    document.querySelector("#today .rain").innerHTML = respArr.current.cloud + "%";
    document.querySelector(".city").innerHTML = loc;
    document.querySelector("#today img").src = baseUrl + respArr.current.condition.icon.slice(34);
  
    
   

}


function tomWeather() {
    document.querySelector("#tommorow .descrip").innerHTML = respArr.forecast.forecastday[1].day.condition.text;
    document.querySelector("#tommorow .tempMx").innerHTML = respArr.forecast.forecastday[1].day.maxtemp_c + "°C";
    document.querySelector("#tommorow .tempMn").innerHTML = respArr.forecast.forecastday[1].day.mintemp_c + "°C";
    document.querySelector("#tommorow img").src = baseUrl + respArr.forecast.forecastday[1].day.condition.icon.slice(34);
}


function afterWeather() {
  document.querySelector("#dayafter .descrip").innerHTML = respArr.forecast.forecastday[2].day.condition.text;
  document.querySelector("#dayafter .tempMx").innerHTML = respArr.forecast.forecastday[2].day.maxtemp_c + "°C";
  document.querySelector("#dayafter .tempMn").innerHTML = respArr.forecast.forecastday[2].day.mintemp_c + "°C";
  document.querySelector("#dayafter img").src = baseUrl + respArr.forecast.forecastday[2].day.condition.icon.slice(34);

}

async function main() { 
  loc = document.querySelector(".loc").value;
  
    console.log();
  await getResp();
  x = respArr.current.condition.icon;
    displayWeather();
   
    
}


main();


