

window.addEventListener("load", () => {
    //Variables
    let temperatureDegree = document.getElementById("section_one_column_grado");
    let city = document.getElementById("city");
    let map = document.getElementById("map");
    let daysDate = document.getElementById("daysDate");
    let humidityData = document.getElementById("humidityData");
    let atmosphericPressure = document.getElementById(`atmosphericPressure`);
    let windSpeed = document.getElementById("windSpeed");
    let temperatureMax = document.getElementById("temperatureMax");
    let temperatureMin = document.getElementById("temperatureMin");
    let visibility = document.getElementById("visibility");
    let getMapLat = document.getElementById("mapLat");
    let getMapLon = document.getElementById("mapLon");
    let cityForm 
    let searchForm = document.getElementById("searchForm");
    let phrasesWheater = document.getElementById("phrasesWheater")
    let cityPhrasesWheater = document.getElementById("cityPhrasesWheater")

    //mobile
    let humidityDataMobile = document.getElementById("humidityDataMobile");
    let windSpeedMobile = document.getElementById("windSpeedMobile");
    let temperatureMaxMobile = document.getElementById("temperatureMaxMobile");
    let temperatureMinMobile = document.getElementById("temperatureMinMobile");
    let atmosphericPressureMobile = document.getElementById(`atmosphericPressureMobile`);
    let visibilityMobile = document.getElementById("visibilityMobile");

    //random city

    let randomCityTemp = document.getElementById("randomCityTemp");
    let randomCityName = document.getElementById("randomCityName");
    let randomCityState = document.getElementById("randomCityState");
    let randomCityHumedity = document.getElementById("randomCityHumedity");
    let randomCityPrecise = document.getElementById("randomCityPrecise");
    let randomCitywind = document.getElementById("randomCitywind")
    
    //fuction

    //function - daysDate
    function daysDateContent() {
        setInterval(() => {
        //Days variable
        let weekDays  = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        //daysDate counter variable
        let dateClassCreation = new Date();
        let executionOfDays = dateClassCreation.getDay()
        daysDate.innerHTML = weekDays[executionOfDays];
        //counter variable
        let countDays = 0
        for (let index = 0; index < 3; index++) {
            countDays +=1
            let forecastDay = document.getElementById('forecastDay0'+countDays);
            var daysFilter= ((executionOfDays+=1) > 6) ? weekDays[executionOfDays = 0] : weekDays[executionOfDays];
            forecastDay.innerHTML = daysFilter
        }
           
        }, 1000);
    }
    daysDateContent()



    const getTemperature = (main) => {
        const maxTemp = Math.round(main.temp_max)
        const minTemp = Math.round(main.temp_min)

        return {maxTemp, minTemp};
    }

    //Function - weather process

    function clima(data) {
        cityForm = data.city.name

        console.log(data);
        
        //Obj Phrases Wheater
        let cityPhrasesWheaterValue = data.city.name
        cityPhrasesWheater.innerText = cityPhrasesWheaterValue
        
       //add random phrase

        const objPhrases= {
            Clear: "The weather is clear, it's a great day for a walk.",
            Rain:"Remember to bring an umbrella, the weather is rainy.",
            Clouds:"The weather today is cloudy, it is a great day to do physical activity.",
            Snow:"A snowfall is in town, it's time to assemble the snowman.",
        }

        let valuePhrases = objPhrases[data.list[0].weather[0].main]

        phrasesWheater.innerText = `${valuePhrases}`
     
  
        console.log("Experimento");
        console.log(objPhrases.valuePhrases);
        console.log(valuePhrases);



        let temperatureDegreeValor = Math.round(data.list[0].main.temp);
        temperatureDegree.innerHTML = `${temperatureDegreeValor}°`
        city.innerText = data.city.name
        let mapLon = data.city.coord.lon
        let mapLat = data.city.coord.lat
        getMapLat.innerHTML = mapLat;
        getMapLon.innerHTML = mapLon;


        let selector = document.getElementById('section-two-column-two');
        let iframe = document.createElement('iframe');
        
        //iframe properties
        iframe.setAttribute('src',`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13618.049739807708!2d${mapLon}!3d${mapLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1662869534399!5m2!1ses!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`);
        selector.appendChild(iframe);

        let {humidity, pressure} = data.list[0].main
        humidityData.innerHTML = `${humidity}%`
        humidityDataMobile.innerHTML = `${humidity}%`

        atmosphericPressure.innerHTML = `${pressure} hPa`
        atmosphericPressureMobile.innerHTML = `${pressure} hPa`

        windSpeed.innerHTML = `${data.list[0].wind.speed} km/h`
        windSpeedMobile.innerHTML = `${data.list[0].wind.speed} km/h`

        visibility.innerHTML = `${data.list[0].visibility}`
        visibilityMobile.innerHTML = `${data.list[0].visibility}`

        const {maxTemp, minTemp} = getTemperature(data.list[0].main);
        temperatureMax.innerHTML = `${maxTemp}°`
        temperatureMin.innerHTML = `${minTemp}°`
        temperatureMaxMobile.innerHTML = `${maxTemp}°`
        temperatureMinMobile.innerHTML = `${minTemp}°`

        const icon = data.list[0].weather[0].icon
        iconoClima.src = `assets/animated/${icon}.svg`;

        console.log(iconoClima);
        let countIndex = 0
        //Bucle extended weather
        for (let index = 1; index < 4; index++) {
            countIndex += 1
            let tempExtendedWeather = document.getElementById('extendedWeather0'+countIndex);
            tempExtendedWeather.innerHTML = Math.round(data.list[countIndex].main.temp)+"°"
            const ExtendedWeatherIco = data.list[countIndex].weather[0].icon
            document.getElementById("iconoClima0"+countIndex).src = `assets/animated/${ExtendedWeatherIco}.svg`;
            let forecastDescriptionExtended= document.getElementById('forecastDescriptionExtended0'+countIndex);
            forecastDescriptionExtended.innerText = data.list[countIndex].weather[0].main
            
        }
        getSysMovementOfSunAndMoon(data)
    }


    function getSysMovementOfSunAndMoon(data){
        let movementOfSunAndMoon = data.list[0].sys.pod

        if(movementOfSunAndMoon == "d"){
            let backgroundDay = document.getElementById("section-two-column-one")
            backgroundDay.style.backgroundImage= 'url("assets/background/day.jpg")';

        }
        else{
            let backgroundNight = document.getElementById("section-two-column-one")
            backgroundNight.style.backgroundImage= 'url("assets/background/night.jpg")';
        }
    }


    

    function getClima(posicion) {
        const {longitude, latitude} = posicion;
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=6752644c4b10d307e40b484055d4f5a5&units=metric`
        fetch(url)
            .then(response => {return response.json()})
            .then(data => {
                clima(data)
            })
            .catch(error => {
                console.log(error)
            })

        console.log(url);
    }

    async function getLocationDefault() {
        const request = await fetch("https://ipinfo.io/json?token=90d44b45827c47")
        const jsonResponse = await request.json()
        const loc = jsonResponse.loc.split(',');
        const coords = {
            latitude: loc[0],
            longitude: loc[1]
        };
        getClima(coords);
        return coords;
    }

    function init() {
        navigator.geolocation.getCurrentPosition(posicion => {
            getClima(posicion.coords)
        }, error => {
            getLocationDefault()
        })
    }

    init()

    function searchFunction(params) {
        //handler 
    
        //FORM CONFIGURATION
        params.preventDefault()
        let element  = document.getElementById("section-two-column-two");
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        let contentCity = params.target.nameData.value
        let expReg= new RegExp("[,.;+-1234567890*]","g");
        cityForm = contentCity.replace(expReg, "");
        console.log(cityForm);
        //API

        const URLAPICITY = `https://api.openweathermap.org/data/2.5/forecast?q=${cityForm}&APPID=6752644c4b10d307e40b484055d4f5a5&units=metric`

        fetch(URLAPICITY)
            .then(response=>{return response.json()})
            .then(data=>{
                clima(data)})
                .catch(error=>{
                  console.log(error)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La city colocada no existe... ¡Porfavor inténtelo nuevamente!',
                    background: "#000000ea",
                    color:"#fff",
                    confirmButtonColor: "#161616",
                    width:"40%",
                  })
                })

                console.log(URLAPICITY);
    }


    function getDataRandomCity(data){

        randomCityTemp.innerHTML = `${data.list[0].main.temp}°`
        randomCityName.innerHTML = `${data.city.name}`
        randomCityState.innerHTML = `${data.city.country}`
        randomCityHumedity.innerHTML = `${data.list[0].main.humidity}% Humedity`
        randomCityPrecise.innerHTML = `${data.list[0].main.pressure}hPa pressure`
        randomCitywind.innerHTML = `${data.list[0].wind.speed}km/h wind`
        const randomIconCityValue = data.list[0].weather[0].icon
        RandomIconCity.src = `assets/animated/${randomIconCityValue}.svg`;
        
    }



    function getRandomCity(city) {
        const listCity = ["Buenos Aires", "Japon", "Paris", "Roma", "Nueva York", "Barcelona", "California", "Amsterdam", "Manchester","Madrid", "Pekin", "Moscu", "Estambul"]
        const randomCity = Math.floor(Math.random()*listCity.length)
        const randomUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${listCity[randomCity]}&APPID=6752644c4b10d307e40b484055d4f5a5&units=metric`
        console.log(randomCity)
        console.log("Experimento 3");
        fetch(randomUrl)
            .then(response => {return response.json()})
            .then(data => {
                getDataRandomCity(data)
            })
            .catch(error => {
                console.log(error)
            })

        console.log(randomUrl);
    }

    getRandomCity()



    //Event
    
    searchForm.addEventListener("submit", searchFunction)

    //Event - Menu


    function navResponsive() {
        const menuItemsClass = document.querySelectorAll(".menu-item-block");
        const menuIconMobile = document.querySelector("#menu-icon-mobile");

        menuIconMobile.addEventListener("click", function () {
            document.body.classList.toggle("mobile-menu-active");
          });


        menuItemsClass.forEach(function (menuItem) {
          menuItem.addEventListener("click", function () {
            document.body.classList.remove("mobile-menu-active");
            let currentItem = document.querySelector(".active");
            currentItem.classList.remove("active");
            this.classList.add("active");
          });
        });
      }
      navResponsive();
      
    
});    
