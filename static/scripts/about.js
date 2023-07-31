let burgerButton = document.querySelector('.burger-btn');
let burgerContainer = document.querySelector('.burger-container');
let burgerList = document.querySelector('.burger-list');

burgerButton.addEventListener('click', () => {
  burgerContainer.classList.remove('hidden');
});



burgerContainer.addEventListener('click', (event) => {
  let isClicked = burgerList.contains(event.target);
  if(!isClicked) {
    burgerContainer.classList.add('hidden');
  }
});






const loadAboutPage = (items) => {
  let ownerGameID = document.querySelector('.profile > h6');
  let bio = document.querySelector('.bio > h6');

  ownerGameID.textContent = items[0];
  bio.textContent = items[1];


  
  let gridContainer = document.querySelector('.social');
  
  for(let i = 0; i < items[2].length; i++) {
    let item = document.createElement('a');
    item.textContent = items[2][i][0];
    item.href = items[2][i][1];
    
    item.style.animation = 'fadeIn 400ms ease forwards';
    item.style.animationDelay = i*180 + 'ms';
  
    gridContainer.appendChild(item);
  }
}






