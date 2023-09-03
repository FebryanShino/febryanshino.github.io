// global functions

const createRandomDots = (container, amount, height) => {
  for(let i = 0; i < amount; i++) {
    let dot = document.createElement('div');

    let colorFromLeft = Math.random();
    dot.style.top = `${Math.random()*100}%`;
    dot.style.left = `${colorFromLeft*100}%`;
    dot.style.position = 'absolute';
    dot.style.height = `${Math.random()*height}%`;
    dot.style.aspectRatio = '1/1';
    dot.style.background = `hsl(${colorFromLeft*360}, 100%, 50%)`;
    dot.style.borderRadius = '50%';
    dot.style.animation = `blink ${Math.random()*9+1}s linear forwards infinite`;
    dot.style.zIndex = 0;
    container.appendChild(dot);
  }
}

const imageOrientation = (element, preview, imageUrl, width, height) => {
  element.style.opacity = 0;
  let ratio = width/height;

  let image = new Image();
  image.src = imageUrl;
  
  element.style.backgroundImage = `url(${imageUrl})`;

  image.addEventListener('load', () => {
    element.style.opacity = 1;
  });
  element.className = '';
  if(ratio > 1) {
    element.classList.add('landscape');
  } else if (ratio < 1) {
    element.classList.add('portrait');
  } else {
    element.classList.add('square');
  }
}


const leadZero = (number) => {
  return (number < 10 ? '0' : '') + number;
}


const setBgFull = (element, url) => {
  element.style.background = `url(${url})`;
  element.style.backgroundSize = 'cover';
  element.style.backgroundPosition = 'center';
}