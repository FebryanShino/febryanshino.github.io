// Load elements on DOM loaded

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

    let item = document.createElement('a');

    item.style.background = `url(${render[0]})`;
    item.href = render[0];
    item.setAttribute('target', '_blank');
    item.style.backgroundSize = 'cover';
    item.style.backgroundPosition = 'center';

    container.append(item);
  }
}

let generatedImageArray;

// Used to get 3 random items from an array
const getThreeRandomItems = (array) => {
  let newArray = [];
  for(let i = 0; i < 6; i++) {
    let item = array[Math.floor(Math.random() * array.length)];

    newArray.push(item);
  }
  return newArray;
}


const loadGenerated = (generated) => {
  const container = document.querySelector('.generated > .body');
  container.innerHTML = '';
  let array = getThreeRandomItems(generated);

  for(let i = 0; i < array.length; i++) {
    let piece = array[i];

    let item = document.createElement('div');
    let url = `https://images.prodia.xyz/${piece[0]}.png`;
    item.style.background = `url(${url})`;
    
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


const loadRepositories = async () => {
  const container = document.querySelector('.repositories > .body');
  
  let res = await fetch('https://api.github.com/users/FebryanShino/repos');
  let data = await res.json();
  for(let i = 0; i < data.length; i++) {
    let repo = data[i];

    let item = document.createElement('a');
    item.textContent = repo.name;
    item.style.background = `hsl(${200 + 45*i}, 100%, 70%)`;
    item.href = repo.html_url;
    item.setAttribute('target', '_blank');

    container.appendChild(item);
  }
}


// function used for dates and time


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


const timeContainer = document.querySelector('.date > h1');


const datetime = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dateContainer = document.querySelector('.date > h6');
  let currentTime = new Date();

  let date = ordinalNumber(currentTime.getDate());
  let day = days[currentTime.getDay()];
  let month = months[currentTime.getMonth()];
  
  dateContainer.textContent = `${day}, ${month} ${date}`;
}

datetime();
setInterval(datetime, 60000);


const analogClock = () => {
  let date = new Date();
  let second = date.getSeconds();
  let minute = date.getMinutes();
  let hour = date.getHours();

  
  const secContainer = document.querySelector('.clock > .seconds');
  const minContainer = document.querySelector('.clock > .minutes');
  const hourContainer = document.querySelector('.clock > .hours');
  
  secContainer.style.transform = `rotate(${second/60*360}deg)`;
  minContainer.style.transform = `rotate(${minute/60*360}deg)`;
  hourContainer.style.transform = `rotate(${hour/12*360}deg)`;

  let hours = leadZero(hour);
  let minutes = leadZero(minute);

  timeContainer.textContent = `${hours}:${minutes}`;
  timeContainer.dataset.time = `${hours}:${minutes}`;
}
analogClock();
setInterval(analogClock, 1000);




const textPopUp = (audio, text) => {
  const textContainer = document.querySelector('.datetime-container > h5');

  textContainer.textContent = text;
  textContainer.style.transform = 'translateY(0)';
  
  audio.play();
  audio.addEventListener('timeupdate', () => {
    if(audio.currentTime === audio.duration) {
      textContainer.style.transform = 'translateY(-100%)';
    }
  });
}



const timeTTS = async (e) => {
  let audio = new Audio();

  e.target.style.animation = 'fade 2000ms ease infinite';
  
  fetch(FebryanShino + '/api/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      time: timeContainer.dataset.time
    })
  })
    .then(response => response.json())
    .then(data => {
      e.target.style.animation = 'none';
      audio.src = data.voice;
      audio.load();
      audio.play();
      textPopUp(audio, data.text);
    });
}

timeContainer.addEventListener('click', timeTTS);






let weatherIcons = document.querySelector('.weather-icon').children;
let weatherList = [
  'Clear',
  'Clouds',
  'Rain',
  'Thunderstorm',
  'Snow',
  'Atmosphere'
]


const toggleWeather = (weather) => {
  const atmosphericWeather = ['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado']
  
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







const weatherAPI = async (city, callback) => {
  let temp = document.querySelector('.weather > h6');
  
  
  let res = await fetch(FebryanShino + '/api/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({city: city})
  });
  let data = await res.json();
  temp.textContent = data.temp + '°C';
  temp.dataset.temp = data.temp + '°C';
  
  temp.dataset.status = data.status;
  
  temp.dataset.location = data.location;
  toggleWeather(data.status);
  callback();
}

const weatherIconContainer = document.querySelector('.weather');

const cityTextInput = () => {
  const cityInput = document.querySelector('.datetime > input');
  const inputButton = document.querySelector('.datetime-container > button');
  
  
  cityInput.addEventListener('focus', () => {
    inputButton.style.transform = 'translateY(0)';
  });
  
  
  cityInput.addEventListener('blur', () => {
    inputButton.style.transform = 'translateY(-100%)';
  });
  
  inputButton.addEventListener('click', () => {
    weatherIconContainer.style.opacity = 0;
    weatherAPI(cityInput.value, () => {
      weatherIconContainer.style.opacity = 1;
    });
  });
}


cityTextInput();
weatherAPI('Tokyo, Japan', () => {});




weatherIconContainer.addEventListener('click', (e) => {
  const data = document.querySelector('.weather > h6');
  let temp = data.dataset.temp;
  let status = data.dataset.status;
  let audio = new Audio();
  let location = data.dataset.location;
  

  e.target.style.animation = 'fade 2000ms ease infinite';
  
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
      e.target.style.animation = 'none';
      audio.src = data.voice;
      audio.load();

      textPopUp(audio, data.text);
    });
});






const generateButton = document.querySelector('.generated > .head > .nn-button');

generateButton.addEventListener('click', (e) => {
  loadGenerated(generatedImageArray);
});
