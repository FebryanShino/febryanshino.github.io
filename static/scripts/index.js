const FebryanShino = 'https://portfolio.febryanshino.repl.co';


fetch(FebryanShino + '/api/database')
  .then(response => response.json())
  .then(data => {
    let tracks = data.music;
    let projects = data.project;
    let about = data.about;

    loadProjects(projects);
    loadPhilosophies([1,2,3,4,5,6]);
    loadTracks(tracks);
    loadAboutPage(about);
  });


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
  themeColor.setAttribute('content', 'white');


  navBar.style.background = 'white';
  navBar.style.border = '1px solid hsl(0,0%,80%)';

  let svg = document.querySelector('.nav-center > svg').querySelectorAll("path");
  
  svg[0].style.fill = "white";
  svg[1].style.fill = "white";
  
  for(let i = 0; i < elements.length; i++) {
    
    let svgs = elements[i].children[0].querySelector("path");

    if(elements[i] !== element) {
      elements[i].classList.remove("active");
      elements[i].style.background = 'none';
    }
    if(svgs !== svgPath) {
      svgs.style.fill = "black";
      elements[i].style.color = "black";
    }
  }
}


const togglePage = (pages, page) => {
  page.classList.remove("hidden");

  for(let i = 0; i < pages.length; i++) {
    if(pages[i] !== page) {
      pages[i].classList.add("hidden");
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



navCenter.addEventListener('click', () => {
  let svg = document.querySelector(".nav-center > svg").querySelectorAll("path");

  themeColor.setAttribute('content', 'black');
  navBar.style.background = 'black';
  navBar.style.border = '1px solid black';
  svg[0].style.fill = 'var(--grad-3)';
  svg[1].style.fill = 'var(--grad-2)';

  
  for(let i = 0; i < navColle.length; i++) {
    let btn = navColle[i];
    btn.classList.remove("active");
    
    btn.style.color = "white";  btn.children[0].querySelector("path").style.fill = "white";
    btn.style.background = 'none';
  }
  togglePage(pages, specialPage);
});

