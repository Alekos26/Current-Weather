//Getting the right city from API
const cityInputElement = document.getElementById('city');
const findBtn = document.getElementById('form');
const weatherContainer = document.getElementById('container2');

let cityName;

const findCity = (e) =>{
    e.preventDefault();


    // //Getting the right city from API
    cityName = cityInputElement.value;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8480bcc3b2abe71f82e694a40ab50568&units=metric`)
    .then(res => {
        //Display current date
        let date = new Date()
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let fullDate = `${day}/${month}/${year}`;

        document.getElementById('date').innerHTML = fullDate;

        //Display current day
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const currentDate = new Date();
        let currentDay = weekday[currentDate.getDay()];

        document.getElementById('day').innerHTML = currentDay;

        

        const data = res.data;

        //City name
        const name = data.name;
        document.getElementById('cityName').innerHTML = name;

        //Display current temperature
        const temp = data.main.temp;
        document.getElementById('temp').innerHTML = Math.round(temp);

        //Display humidity
        const humid = data.main.humidity;
        document.getElementById('humidity').innerHTML = `${humid}%`;

        //Display wind's velocity
        const wind = data.wind.speed * 3.6;
        document.getElementById('wind').innerHTML = `${Math.round(wind)}Km/h`;

        //Display cloudiness
        const clouds = data.clouds.all;
        document.getElementById('cloudiness').innerHTML = `${clouds}%`;

        //Weather condition image
        const image = data.weather[0].icon
        const img = document.getElementById('weather-condition')
        img.src = `http://openweathermap.org/img/w/${image}.png`;

    })
    .catch(err=>{
        if(err) {
            alert('City not found!')
            cityInputElement.value = '';
            weatherContainer.style.display = 'none'
        }
    });

    weatherContainer.style.display = 'block'

};

findBtn.addEventListener('submit', findCity);
