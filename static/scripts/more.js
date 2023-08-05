const loadWebsites = (websites) => {
  const container = document.querySelector('.websites');
  for(let i = 0; i < websites.length; i++) {
    let website = websites[i];

    let item = document.createElement('div');
    let title = document.createElement('h4');
    let link = document.createElement('a');

    item.style.setProperty('--background', website[1]);
    title.textContent = website[0];
    link.href = website[2];
    link.setAttribute('target', '_blank');
    link.textContent = '→';

    item.append(title);
    item.append(link);
    container.append(item);
  }
}


const loadRenders = (renders) => {
  const container = document.querySelector('.renders > .body');

  for(let i = 0; i < renders.length; i++) {
    let render = renders[i];
    console.log(render)

    let item = document.createElement('a');

    item.style.background = `url(${render[0]})`;
    item.href = render[0];
    item.setAttribute('target', '_blank');
    item.style.backgroundSize = 'cover';
    item.style.backgroundPosition = 'center';

    container.append(item);
  }
}


const loadGenerated = (generated) => {
  const container = document.querySelector('.generated > .body');

  for(let i = 0; i < generated.length; i++) {
    let piece = generated[i];

    let item = document.createElement('div');
    let url = `https://images.prodia.xyz/${piece[0]}.png`;

    item.style.background = `url(${url})`;
    console.log(piece[1] === 'landscape');
    
    if(piece[1] === 'landscape') {
      item.classList.add('generated-landscape');
    } else if(piece[1] === 'portrait') {
      item.classList.add('generated-portrait');
    } else {
      item.classList.add('generated-square');
    }
    item.style.backgroundSize = 'cover';
    item.style.backgroundPosition = 'center 0';

    container.append(item);
  }
}




const leadZero = (number) => {
  return (number < 10 ? '0' : '') + number;
}

const ordinalNumber = (number) => {
  let string = number.toString();
  let value = string.charAt(string.length-1);
  
  if(value == 1) {
    return number + 'st';
  } else if(value == 2) {
    return number + 'nd';
  } else if(value == 3) {
    return number + 'rd';
  } else {
    return number + 'th';
  }
}


let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let dateContainer = document.querySelector('.date > h6');
let timeContainer = document.querySelector('.date > h1');

const datetime = () => {
  const currentTime = new Date();

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  let date = ordinalNumber(currentTime.getDate());
  let day = days[currentTime.getDay()];
  let month = months[currentTime.getMonth()];
  
  hours = leadZero(hours);
  minutes = leadZero(minutes);

  
  timeContainer.textContent = `${hours}:${minutes}`;
  dateContainer.textContent = `${day}, ${month} ${date}`;
  timeContainer.setAttribute('data-time', `${hours}:${minutes}`);
}



datetime();
setInterval(datetime, 1000 * 60);


const textPopUp = (audio, text) => {
  let textContainer = document.querySelector('.datetime-container > h5');

  textContainer.textContent = text;
  textContainer.style.transform = 'translateY(0)';
  
  audio.play();
  audio.addEventListener('timeupdate', () => {
    if(audio.currentTime === audio.duration) {
      textContainer.style.transform = 'translateY(-100%)';
    }
  });
}


timeContainer.addEventListener('click', () => {
  let audio = new Audio();

  timeContainer.style.animation = 'fade 2000ms ease infinite';
  
  fetch(FebryanShino + '/api/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      time: timeContainer.getAttribute('data-time')
    })
  })
    .then(response => response.json())
    .then(data => {
      timeContainer.style.animation = 'none';
      audio.src = data.voice;
      audio.load();
      audio.play();
      textPopUp(audio, data.text);
    });
  
});



let cityInput = document.querySelector('.datetime > input');
let inputButton = document.querySelector('.datetime-container > button');

cityInput.addEventListener('focus', () => {
  inputButton.style.transform = 'translateY(0)';
});


cityInput.addEventListener('blur', () => {
  inputButton.style.transform = 'translateY(-100%)';
});



let weatherIcons = document.querySelector('.weather-icon').children;
let weatherList = [
  'Clear',
  'Clouds',
  'Rain',
  'Thunderstorm',
  'Snow',
  'Atmosphere'
]
let atmosphericWeather = ['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado']


const toggleWeather = (weather) => {
  if(atmosphericWeather.some(substr => weather.includes(substr))) {
    weather = 'Atmosphere';
  }
  let index = weatherList.indexOf(weather)
  let weatherNow = weatherIcons[index];
  weatherNow.classList.remove('hidden');

  for(let i = 0; i < weatherIcons.length; i++) {
    let weatherIcon = weatherIcons[i];
    if(weatherIcon !== weatherNow) {
      weatherIcon.classList.add('hidden');
    }
  }
}


let weatherIconContainer = document.querySelector('.weather');





const weatherAPI = (city=null, callback) => {
  let temp = document.querySelector('.weather > h6');
  
  if(city === null) {
    city = 'Tokyo, Japan';
  }
  fetch(FebryanShino + '/api/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({city: city})
  })
    .then(response => response.json())
    .then(data => {
      temp.textContent = data.temp + '°C';
      temp.setAttribute('data-temp', data.temp + '°C');
      
      temp.setAttribute('data-status', data.status);
      
      temp.setAttribute('data-location', data.location);
      toggleWeather(data.status);
      callback();
    })
}


inputButton.addEventListener('click', () => {
  weatherIconContainer.style.opacity = 0;
  weatherAPI(cityInput.value, function() {
    weatherIconContainer.style.opacity = 1;
  });
});

weatherAPI(null, function() {});








weatherIconContainer.addEventListener('click', () => {
  let data = document.querySelector('.weather > h6');
  let temp = data.getAttribute('data-temp');
  let status = data.getAttribute('data-status');
  let audio = new Audio();
  let location = data.getAttribute('data-location');
  

  weatherIconContainer.style.animation = 'fade 2000ms ease infinite';
  
  fetch(FebryanShino + '/api/voice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: status,
      temperature: temp.slice(0, -2),
      location: location
    })
  })
    .then(response => response.json())
    .then(data => {
      weatherIconContainer.style.animation = 'none';
      audio.src = data.voice;
      audio.load();

      textPopUp(audio, data.text);
    });
});


