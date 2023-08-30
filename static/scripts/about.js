/*
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
*/


const cookieForm = document.querySelector('.fourth-page form');


cookieForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let cook = `name=${e.target.children[0].value}; expires=` + new Date(9999,1,1).toUTCString();
  console.log(cook);
  document.cookie = cook;
  alert('yatta');
});


document.querySelector('.fourth-page > button').addEventListener('click', (async () => {
  
}))






