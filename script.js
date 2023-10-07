
"use strict"

// Primary data for api call
const apiKey = "370d84cb6dc44f8cc712247ce0e7754f"; // from https://home.openweathermap.org/

let tempUnit = "";
let windUnit = "";
let humidityUnit = "%";

//  Weather Units Logic assigned to button
document.querySelector(".btn-1").addEventListener("click", function (){
  if(document.querySelector(".btn-1").innerHTML == "Imperial"){
    document.querySelector(".btn-1").innerHTML ="Metric";
    tempUnit = "°c";
    windUnit = " km/h";

  }else {
    document.querySelector(".btn-1").innerHTML ="Imperial";
    tempUnit = "°F";
    windUnit = " m/h";
  }
}
);
 

// Weather Logic

document.querySelector(".btn-2").addEventListener("click", function(){
  
  const inputCity = document.querySelector(".search input").value;
  const unit = document.querySelector(".btn-1").innerHTML
  const functionalUrl = `https://api.openweathermap.org/data/2.5/weather?units=${unit}&q=${inputCity}`; // Part Data from https://home.openweathermap.org/


     // The Api Call and logic starts
  async function checkWeather(){
    const response = await fetch(functionalUrl + `&appid=${apiKey}`);
    // Checking the response from api call before proceeding
    if(response.status == 404 || inputCity == ""){
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    }else{
      var data = await response.json(); // A json file
      const weatherIconDescription = ((data.weather[0].main).toLowerCase());
      console.log(data)


    // Updating dom elements 
      document.querySelector(".weather-icon").src = "images/" + weatherIconDescription + ".png";
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.trunc(data.main.temp) + tempUnit;
      document.querySelector(".humidity").innerHTML = data.main.humidity + humidityUnit;
      document.querySelector(".wind").innerHTML = data.wind.speed + windUnit;
      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".weather").classList.remove("visibility");
    }
  }; // Api call and logic ends

  checkWeather();
  
})
