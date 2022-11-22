// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=
var apiKey = 'f3e794b6f19299364c3a368c93f4e895';
var citySearch = document.getElementById('city-search');
var searchBtn = document.getElementById('search-input');
var searchForm = document.getElementById('search-form');
var currentDay = document.getElementById('currentDay');
var atlantaBtn = document.getElementById('atlanta-btn');
var minneapolisbtn = document.getElementById('minneapolis-btn')
var newyorkbtn = document.getElementById('new-york-btn')
var losangelebtn = document.getElementById('los-angeles-btn')
var chicagobtn = document.getElementById('chicago-btn')
let lat;
let lon;

function getDateString(dateTime) {
    var theDate = new Date(dateTime);
    return '(' + (theDate.getMonth() + 1) + '/' + (theDate.getDate() + 1) + '/' + theDate.getFullYear() + ')';
}


function getCoords(event, buttonCity) {
    event.preventDefault();
    var firstCall = 'http://api.openweathermap.org/geo/1.0/direct?q=' + (buttonCity || citySearch.value) + '&limit=5&appid=' + apiKey;
    fetch(firstCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
        })
        .then(function () {
            var secondcall = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            fetch(secondcall)
                .then(function (response) {
                    return response.json();
                })
               .then(function (data) {
                    console.log(data);
                    var cityAndDate = document.createElement('h2');
                    cityAndDate.innerText = (buttonCity || citySearch.value) + ' ' + getDateString(data.current.dt * 1000);
                    currentDay.append(cityAndDate);

                    var tempEl = document.createElement('div');
                    tempEl.innerText = data.current.temp+" °F";
                    currentDay.append(tempEl);
                    
                    var humidityEl = document.createElement('div');
                    humidityEl.innerText = data.current.humidity+" %";
                    currentDay.append(humidityEl);
                    
                    var feels_likeEl = document.createElement('div');
                    feels_likeEl.innerText = data.current.feels_like+" °F";
                    currentDay.append(feels_likeEl);
                   
                    var wind_speedEl = document.createElement('div');
                    wind_speedEl.innerText = data.current.wind_speed+" mph";
                    currentDay.append(wind_speedEl);

                    var uviEl = document.createElement('div');
                    uviEl.innerText = data.current.uvi+"";
                    currentDay.append(uviEl);
                    
                    fiveDayForecast(data)
                });
        })

    };
    function fiveDayForecast(data){
        console.log(data,"fivedayforecast");
        var fiveDayHeader = document.createElement('h2');
        fiveDayHeader.innerText = '5-Day Forecast:';

        var fiveDayForcecast = document.createElement('div');
        fiveDayForcecast.id = 'fdf';
        fiveDayForcecast.classList.add('row');

        currentDay.append(fiveDayHeader);
        currentDay.append(fiveDayForcecast);

        data.daily && data.daily.forEach(function(day, index) {
            if (index >= 5) {
                return;
            }

            var forecast = document.createElement('div');
            forecast.classList.add('col-3');
            
            var cityAndDate = document.createElement('strong');
            cityAndDate.innerText = getDateString(day.dt * 1000);
            forecast.append(cityAndDate);

            var tempEl = document.createElement('div');
            tempEl.innerText = day.temp.day +" °F daily temp";
            forecast.append(tempEl);
            
            var humidityEl = document.createElement('div');
            humidityEl.innerText = day.humidity+" % humidity";
            forecast.append(humidityEl);
            
            var feels_likeEl = document.createElement('div');
            feels_likeEl.innerText = day.feels_like.day +" °F feels like temp";
            forecast.append(feels_likeEl);
           
            var wind_speedEl = document.createElement('div');
            wind_speedEl.innerText = day.wind_speed+" mph wind speed ";
            forecast.append(wind_speedEl);

            var uviEl = document.createElement('div');
            uviEl.innerText = day.uvi+" uvi";
            forecast.append(uviEl);

            fiveDayForcecast.append(forecast);
        });
    }





    function historyDisplayWeather(){
        cityname = $(this).attr("data-name");
        displayWeather();
        displayFiveDayForecast();
        console.log(cityname);
    }

atlantaBtn.addEventListener('click', function(event) {
    getCoords(event, 'Atlanta');
    

});

minneapolisbtn.addEventListener('click', function(event) {
    getCoords(event, 'minneapolis');
});

newyorkbtn.addEventListener('click', function(event) {
    getCoords(event, 'New-york');
});

losangelebtn.addEventListener('click', function(event) {
    getCoords(event, 'los-angeles');
});

chicagobtn.addEventListener('click', function(event) {
    getCoords(event, 'chicago');
});


searchBtn.addEventListener('click', getCoords);
searchForm.addEventListener('submit', getCoords);
