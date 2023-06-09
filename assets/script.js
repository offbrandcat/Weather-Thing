var currentDate = dayjs();
var APIKey = "9ae2cf33adf665c4618217cea9c0ef05"

document.querySelector("#search").addEventListener('click', function (event) {
    event.preventDefault();
    var searchCity = document.querySelector("#city").value;
    var newSearch = document.createElement("button");
    newSearch.textContent = document.querySelector("#city").value
    newSearch.classList.add("btn")
    
    document.querySelector("#searchArea").appendChild(newSearch)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${APIKey}&units=imperial&speed=miles/hour`)
        .then(function (response) {
            return response.json()
        })
            
        .then(function (data) {
            document.querySelector(`#icon0`).setAttribute("src", `http://www.openweathermap.org/img/w/${data.weather[0].icon}.png`)
            document.querySelector(`#t0`).textContent = `Temp: ${data.main.temp.toString()} \u00B0F`;
            document.querySelector(`#w0`).textContent = `Wind: ${data.wind.speed.toString()} MPH`;
            document.querySelector(`#h0`).textContent = `Humidity: ${data.main.humidity.toString()}%`;
        });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${APIKey}&units=imperial&speed=miles/hour`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            for (i = 0; i < 5; i++) {
                document.querySelector(`#d${i + 1}`).textContent = currentDate.add(i + 1, 'day').format('M/DD');
                document.querySelector(`#icon${i + 1}`).setAttribute("src", `http://www.openweathermap.org/img/w/${data.list[i * 8].weather[0].icon}.png`)
                document.querySelector(`#t${i + 1}`).textContent = `Temp: ${data.list[(i * 8)].main.temp.toString()} \u00B0F`;
                document.querySelector(`#w${i + 1}`).textContent = `Wind: ${data.list[i * 8].wind.speed.toString()} MPH`;
                document.querySelector(`#h${i + 1}`).textContent = `Humidity: ${data.list[i * 8].main.humidity.toString()}%`;
            }

        });
})