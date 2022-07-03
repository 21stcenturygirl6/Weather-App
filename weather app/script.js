let apikey = "ea34bd611b8f7e9b8d183a491dd2c23c";
let weather = {
    // "apikey": "ea34bd611b8f7e9b8d183a491dd2c23c",
    fetchweather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=" + apikey).then((Response)=>Response.json())
        .then((data)=>this.display(data));
    },
    display: function(data){
        if(data.cod == "404")
        {
            onError(data);
        }
        else
        {
            info.classList.remove("show");
            const{ name } = data;
            const{ icon, description } = data.weather[0];
            const{ temp, humidity } = data.main;
            const{ speed } = data.wind;
            document.querySelector(".city").innerHTML = name;
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
            document.querySelector(".description").innerHTML = description;
            document.querySelector(".temp").innerHTML = temp+"°C";
            document.querySelector(".humidity").innerHTML = "Humidity: "+humidity+"%";
            document.querySelector(".wind").innerHTML = "Wind Speed: "+speed+"km/h";
            document.querySelector(".weather").classList.remove("hide");
            document.body.style.backgroundImage= "url(https://source.unsplash.com/random/1600x900/?"+name+",nature)";
        }
    },
    search: function(){
        this.fetchweather(document.querySelector(".search_box").value);
        document.querySelector(".search_box").value = "";
    }
};

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
});

document.querySelector(".search_box").addEventListener("keyup",function(event){
    if(event.key=="Enter")
    {
        weather.search();
    }
});

let loc = document.querySelector(".location button");
let info = document.querySelector(".message");
loc.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("Your browser does not support geolocation api");
    }
});


function onError(error)
{
    info.innerHTML = error.message;
    info.classList.add("show");
}

function onSuccess(position)
{
    info.classList.remove("show");
    const{latitude,longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`).then((Response)=>Response.json()).then((data)=>weather.display(data));
}
