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
    const philosophy = document.createElement('div');
    const head = document.createElement('div');
    const title = document.createElement('h5');
    title.textContent = 'Illustrious';
    head.classList.add('head');
    head.appendChild(title);
  
    const body = document.createElement('div');
    const desc = document.createElement('p');
    const link = document.createElement('a');
    desc.textContent = '幾千の時空(じかん)を超えてゆく この想いあなたに届くまで 彷徨う迷子のようにずっと探すよ ねえ　傍にいて…！';
    link.href = '#';
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

homepage.addEventListener('scroll', () => {
  const nav = document.querySelector('.first-page > .header');
  let value = homepage.scrollTop;

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

homepageBurger.addEventListener('click', () => {
  const active = homepageBurger.getAttribute('data-active') == 'false';
  let burgerPart = homepageBurger.children;
  let burgerMenu = document.querySelector('.first-page > .burger-menu');

  if(active) {
    burgerPart[0].style.transform = 'rotate(45deg)';
    burgerPart[1].style.transform = 'rotate(-45deg)';
    burgerMenu.style.transform = 'translateY(0)';
    homepageBurger.setAttribute('data-active', active);
  
  } else {
    burgerPart[0].style.transform = 'translateY(-150%)';
    burgerPart[1].style.transform = 'translateY(150%)';

    burgerMenu.style.transform = 'translateY(-100%)';


    homepageBurger.setAttribute('data-active', active);
  }
});


// let switchCounter = 0;

// const switchStyle = () => {
//   const titleText = document.querySelectorAll('.text > h1 > span');
  

//   if(switchCounter === 0) {
//     titleText[0].style.background = 'var(--title)';
//     titleText[1].style.background = 'white';
//     switchCounter = 1;
//   } else {
//     titleText[0].style.background = 'white';
//     titleText[1].style.background = 'var(--title)';
//     switchCounter = 0;
//   }
// }

// setInterval(switchStyle, 1000);




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
    counter++
  });
  
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