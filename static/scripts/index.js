const FebryanShino = 'https://frenella.febryanshino.repl.co';

/*
fetch(FebryanShino + '/api/database')
  .then(response => response.json())
  .then(data => {
    generatedImageArray = data.generated;

    loadProjects(data.project);
    loadPhilosophies(data.philosophies);
    loadWebsites(data.websites);
    loadRenders(data.renders);
    loadGenerated(data.generated);
    // loadTracks(tracks);
    loadAboutPage(data.about);
  });
*/

const auth = (permitted) => {
  loadPopularPosts(permitted);
  if (!permitted) {
    let items = document.querySelectorAll('.auth-needed');
    for(let i = 0; i < items.length; i++) {
      items[i].classList.add('hidden');
    }
    return;
  }

  document.querySelector('.first-page > .header > h5').textContent = 'Hello, Shino!';
  document.body.dataset.status = 'dev';
}


const loadDatabase = async () => {
  let res = await fetch(FebryanShino + '/api/database', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: document.cookie.split('user=')[1]
    })
  });
  let data = await res.json();
  
  auth(data.permitted);
  generatedImageArray = data.generated;
  loadProjects(data.project);
  loadPhilosophies(data.philosophies);
  loadWebsites(data.websites);
  loadRenders(data.renders);
  loadGenerated(data.generated);
  // loadTracks(tracks);
  // loadAboutPage(data.about);
}
loadDatabase();





let home = document.querySelector('#home');
let more = document.querySelector('#more');
let set = document.querySelector('#set');
let about = document.querySelector('#about');
let navColle = [home, more, set, about];

const themeColor = document.querySelector('meta[name="theme-color"]');
let navCenter = document.querySelector('.nav-center');

let firstPage = document.querySelector('.first-page');
let secondPage = document.querySelector('.second-page');
let thirdPage = document.querySelector('.third-page');
let fourthPage = document.querySelector('.fourth-page');
let specialPage = document.querySelector('.special-page');
pages = [firstPage, secondPage, thirdPage, fourthPage, specialPage];


let navBar = document.querySelector('.navigation-bar');


const toggleNav = (elements, element) => {
  element.classList.add('active');
  element.style.background = 'black';
  let svgPath = element.children[0].querySelector('path');

  element.style.color = 'white';
  svgPath.style.fill = 'white';
  toggleNavCenter(false);
  
  for(let i = 0; i < elements.length; i++) {
    
    let svgs = elements[i].children[0].querySelector('path');

    if(elements[i] !== element) {
      elements[i].classList.remove('active');
      elements[i].style.background = 'none';
    }
    if(svgs !== svgPath) {
      svgs.style.fill = "black";
      elements[i].style.color = "black";
    }
  }
}


const togglePage = (pages, page) => {
  page.classList.remove('hidden');

  for(let i = 0; i < pages.length; i++) {
    if(pages[i] !== page) {
      pages[i].classList.add('hidden');
    }
  }
}


for(let i = 0; i < navColle.length; i++) {
  let nav = navColle[i];
  
  nav.addEventListener('click', () => {
    toggleNav(navColle, nav);
    togglePage(pages, pages[i]);
  });
}

const toggleNavCenter = (status) => {
  if(status) {
    themeColor.setAttribute('content', 'black');
    navBar.style.background = 'black';
    navBar.style.border = '1px solid black';

    navCenter.style.setProperty('--orbit-color', 'var(--grad-3)');
    navCenter.style.setProperty('--planet-color', 'var(--grad-2)');
    navCenter.style.setProperty('--moon-color', 'var(--grad-2)');
    
    
    for(let i = 0; i < navColle.length; i++) {
      let btn = navColle[i];
      btn.classList.remove('active');
      
      btn.style.color = 'white';  btn.children[0].querySelector('path').style.fill = 'white';
      btn.style.background = 'none';
    }
    togglePage(pages, specialPage);
    
  } else {
    
    themeColor.setAttribute('content', 'white');
    navBar.style.background = 'white';
    navBar.style.border = '1px solid hsl(0,0%,80%)';

    navCenter.style.setProperty('--orbit-color', 'white');
    navCenter.style.setProperty('--planet-color', 'white');
    navCenter.style.setProperty('--moon-color', 'white');
  }
}

navCenter.addEventListener('click', () => {
  toggleNavCenter(true);
});

