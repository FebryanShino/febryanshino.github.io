const loadProjects = (projects) => {
  let projectContainer = document.querySelector('.projects');
  
  for(let i = 0; i < 4; i++) {
    let project = projects[i];
    let item = document.createElement('div');
    item.classList.add('project');

    let image = document.createElement('div');
    image.classList.add('thumbnail');
    
    
    let link = document.createElement('a');
    link.href = project[2];
    link.textContent = '→';
    link.setAttribute('target', '_blank');
    
    item.style.backgroundImage = `url(${project[1]})`;
  
  
    let title = document.createElement('h4');
  
    title.textContent = project[0];
  
    item.appendChild(title);
    item.appendChild(link);
    projectContainer.appendChild(item);
  }
}

const loadPhilosophies = (philosophies) => {
  const philosophiesContainer = document.querySelector('.philosophies');

  for(let i = 0; i < philosophies.length; i++) {
    let item = philosophies[i];
    const philosophy = document.createElement('div');
    const head = document.createElement('div');
    const title = document.createElement('h5');
    title.textContent = item[0];
    head.classList.add('head');
    head.appendChild(title);
  
    const body = document.createElement('div');
    createRandomDots(body, 15, 1);
    
    const desc = document.createElement('p');
    const link = document.createElement('a');
    desc.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque congue volutpat.';
    link.href = item[2];
    link.textContent = '...';
    body.appendChild(desc);
    body.appendChild(link);
    body.classList.add('body');

    philosophy.appendChild(head);
    philosophy.appendChild(body);
    philosophiesContainer.appendChild(philosophy );
  }
}


const homepage = document.querySelector('.first-page');

homepage.addEventListener('scroll', (e) => {
  const nav = document.querySelector('.first-page > .header');
  let value = e.target.scrollTop;

  if(value !== 0) {
    nav.style.background = 'rgba(0,0,0,.9)';
  } else {
    nav.style.background = 'transparent';
  }
});




const periodicSine = (radians) => {
  let x = radians + Math.PI/2;

  return (Math.sin(x) + 1) / 2;
}




const homepageBurger = document.querySelector('.first-burger-container');

homepageBurger.addEventListener('click', (e) => {
  const active = homepageBurger.dataset.active === 'false';
  const burgerPart = homepageBurger.children;
  let burgerMenu = document.querySelector('.first-page > .burger-menu');

  if(active) {
    burgerPart[0].style.transform = 'rotate(45deg)';
    burgerPart[1].style.transform = 'rotate(-45deg)';
    burgerMenu.style.transform = 'translateY(0)';
    homepageBurger.dataset.active = active;
  
  } else {
    burgerPart[0].style.transform = 'translateY(-150%)';
    burgerPart[1].style.transform = 'translateY(150%)';

    burgerMenu.style.transform = 'translateY(-100%)';


    homepageBurger.dataset.active = active;
  }
});


const profileImg = new Image();
profileImg.src = '/static/profile.png';
profileImg.addEventListener('load', () => {
  const profileBack = document.querySelector('.first-page > .intro > .img');
  profileBack.style.opacity = 1;
});





const toggleSpecialPart = document.querySelector('.special-part > .planet-container');

toggleSpecialPart.addEventListener('click', (e) => {
  const animation = document.querySelector('.animations');
  const planet = toggleSpecialPart.children[0];
  const ring = toggleSpecialPart.children[1];
  let status = toggleSpecialPart.dataset.status === 'false';
  
  if(status) {
    toggleSpecialPart.style.transform = 'rotate(135deg)';
    toggleSpecialPart.style.setProperty('--planet-scale', 'scale(.8)');
    
    ring.style.border = '.1rem solid var(--grad-2)';
    ring.style.height = 'var(--orbit-width)';
    ring.style.transform = 'scale(1.25)';

    toggleOrbits(true);

    animation.classList.remove('hidden');
    
    toggleSpecialPart.dataset.status = status;
  } else {
    toggleSpecialPart.style.transform = 'rotate(-15deg)';
    toggleSpecialPart.style.setProperty('--planet-scale', 'scale(1)');
    
    ring.style.border = '.1rem solid var(--grad-2)';
    ring.style.height = 'calc(var(--orbit-width)/10)';
    ring.style.transform = 'scale(1)';

    toggleOrbits(false);

    animation.classList.add('hidden');
    
    toggleSpecialPart.dataset.status = status;
  }
});


const toggleOrbits = (status) => {
  const orbits = document.querySelector('.special-part > .orbits').children;
  for(let i = 0; i < orbits.length; i++) {
    if(status) {
      orbits[i].style.opacity = 1;
    } else {
      orbits[i].style.opacity = 0;
    }
  }
}

const orbits = () => {
  const container = document.querySelector('.special-part > .orbits');
  for(let i = 1; i <= 5; i++) {
    let orbit = document.createElement('div');
    orbit.classList.add('orbit');
    orbit.style.width = i*20 + '%';
    orbit.style.opacity = 0;
    orbit.style.transition = `opacity 1000ms ease ${(5-i)*200}ms`;
    container.appendChild(orbit);
  }
}

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

createRandomDots(document.querySelector('.special-part > .stars'), 35, 3.5);
orbits();







const cardContainer = document.querySelector('.hover-box');
const cards = cardContainer.children;

const loadCards = () => {
  for(let i = 0; i < 20; i++) {
    let card = document.createElement('div');
    card.classList.add('cards');
    card.style.transition = `opacity 300ms ease ${i*100}ms, transform 300ms ease`;
    cardContainer.appendChild(card);
  }
}




let refreshButton = document.querySelector('.hover-head > a');




const imageOrientation = (element, preview, imageUrl, width, height) => {
  let ratio = width/height;

  let image = new Image();
  image.src = imageUrl;
  
  element.style.backgroundImage = `url(${preview})`;

  image.addEventListener('load', () => {
  element.style.backgroundImage = `url(${imageUrl})`;
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


refreshButton.addEventListener('click', (event) => {
  event.preventDefault();
  refreshButton.textContent = 'Loading!';

  for(let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = 0;
    cards[i].classList.remove('hidden');
  }

  fetch(FebryanShino + '/api/danbooru', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tags: 'genshin_impact -1boy'
    })
  })
    .then(response => response.json())
    .then(data => {
      refreshButton.textContent = 'Refresh';

      let cardNotLoaded = cardContainer.getAttribute('data-exist') == 'false';

      if(cardNotLoaded) {
        loadCards();
        cardContainer.setAttribute('data-exist', cardNotLoaded);
      }
      
      
      for(let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let post = data.posts[i];
        let fileUrl = post.large_file_url;
        let preview = post.preview_file_url;
        card.style.opacity = 1;

        imageOrientation(card, preview, fileUrl, post.image_width, post.image_height);
      }
    });
});