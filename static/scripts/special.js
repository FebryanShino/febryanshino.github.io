





let tagInput = document.querySelector('.inputs > .search-bar > input');
let options = document.querySelector('.inputs > .pop');

let orientations = document.querySelectorAll('.orientation > h6');

let searchButton = document.querySelector('.inputs > .search-bar > .icon');

let imgContainer = document.querySelector('.img-container');


createRandomDots(document.querySelector('.special-page > .header > .stars'), 35, 3.5);



for(let i = 0; i < 20; i++) {
  let image = document.createElement('div');
  image.setAttribute('data-file', 'https://youtu.be/dQw4w9WgXcQ');
  image.setAttribute('data-tags', 'Undefined');
  image.setAttribute('data-artist', 'Undefined');
  image.setAttribute('data-sample', 'https://cdn.donmai.us/sample/cd/6f/__shiina_mahiru_otonari_no_tenshi_sama_ni_itsu_no_mani_ka_dame_ningen_ni_sarete_ita_ken_drawn_by_hanekoto__sample-cd6f4f2f188060731e2e4e4bf6aebd6d.jpg');
  image.style.background = 'url(https://cdn.donmai.us/sample/cd/6f/__shiina_mahiru_otonari_no_tenshi_sama_ni_itsu_no_mani_ka_dame_ningen_ni_sarete_ita_ken_drawn_by_hanekoto__sample-cd6f4f2f188060731e2e4e4bf6aebd6d.jpg)';
  image.style.backgroundSize = 'cover';
  image.style.backgroundPosition = 'center';

  imgContainer.appendChild(image);
  
}


let imgChildren = imgContainer.children;


const toggleOrientation = (element) => {
  element.style.background = 'hsl(0,0%,60%)';

  for(let i = 0; i < orientations.length; i++) {
    let option = orientations[i];
    if(option !== element) {
      option.style.background = 'none';
    }

  }
}

for(let i = 0; i < orientations.length; i++) {
  let option = orientations[i];

  option.addEventListener('click', () => {
    tagInput.setAttribute('data-orientation', option.textContent);
    toggleOrientation(option);
  });
}



const searchIcons = document.querySelectorAll('.search-bar > .icon > svg');

const searchImage = () => {
  let myIcon = document.querySelectorAll('.search-bar > .icon > svg');
  let input = tagInput.value;
  let attr = tagInput.dataset.orientation;
  
  myIcon[1].style.animation = 'rotateInfinite 1000ms linear infinite';


  
  tagInput.dataset.input = input;
  searchIcons[0].classList.add('hidden');
    searchIcons[1].classList.remove('hidden');

  
  if(attr === 'Landscape') {
    input += ' ratio:>1:1';
  } else if(attr === 'Portrait') {
    input += ' ratio:<1:1';
  }

  fetch(FebryanShino + '/api/danbooru', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tags: input
    })
  })
    .then(response => response.json())
    .then(data => {
      imgContainer.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      for(let i = 0; i < imgChildren.length; i++) {
        let image = imgChildren[i];     
        let post = data.posts[i];
        image.src = post.large_file_url;
        image.dataset.file = post.file_url;
        image.dataset.source = post.source;
        image.dataset.artist = post.tag_string_artist;
        image.dataset.tags = post.tag_update;
        image.dataset.sample = post.large_file_url;

        imageOrientation(
          image,
          post.preview_file_url,
          post.large_file_url,
          post.image_width,
          post.image_height
        );
      }
     myIcon[1].style.animation = 'none';
    });
}


searchButton.addEventListener('click', () => {
  searchImage();
});

tagInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchImage();
  }
});


let searchIconPath = document.querySelector('.inputs > .icon > svg path');


tagInput.addEventListener('input', () => {
  let inputValue = tagInput.getAttribute('data-input');

  if(tagInput.value === inputValue) {
    searchIcons[1].classList.remove('hidden');
    searchIcons[0].classList.add('hidden');
  } else {
    searchIcons[1].classList.add('hidden');
    searchIcons[0].classList.remove('hidden');
  }

});





let redirectButtons = document.querySelector('.img-info > .link-string').children;
let artistDesc = document.querySelector('.artist-string > h6');
let tagDesc = document.querySelector('.tag-string > h6');



const toggleDesaturate = (element, value) => {
  for(let i = 0; i < imgChildren.length; i++) {
    if (imgChildren[i] !== element) {
      imgChildren[i].style.filter = `saturate(${value}%)`;
    }
  }
}


for(let i = 0; i < imgChildren.length; i++) {

  let image = imgChildren[i];
  
  image.addEventListener('click', () => {
    const imgInfo = document.querySelector('.img-info');
    let sourceBtn = redirectButtons[0];
    let dlBtn = redirectButtons[1];

    let source = image.getAttribute('data-source');
    if(source.includes('pixiv')) {
      sourceBtn.children[0].src = '/static/pixiv.png';
    } else {
      sourceBtn.children[0].src = '/static/twitter.png';
    }

    sourceBtn.href = source;
    dlBtn.href = image.getAttribute('data-file');
    artistDesc.textContent = image.getAttribute('data-artist');
    tagDesc.textContent = image.getAttribute('data-tags');

    imgInfo.style.background = `url(${image.getAttribute('data-sample')})`;

    imgInfo.style.backgroundSize = 'cover';
    imgInfo.style.backgroundPosition = 'center 0';
  });

  image.addEventListener("mouseenter", () => {
    toggleDesaturate(image, 0);
  });
  image.addEventListener("mouseleave", ()=> {
    toggleDesaturate(image, 100);
  });
}








const getColorPage = document.querySelector('.second');
const getColorBtn = document.querySelector('.second > a');
const fileInput = document.querySelector('.second > .container > .image > input');


const imgInput = document.querySelector('.second > .container > .image > div');

fileInput.addEventListener('change', (e) => {
  e.target.disabled = true;
  
  imgInput.classList.remove('hidden');
  
  let reader = new FileReader();
  reader.addEventListener('load', (event) => {
    imgInput.style.background = `url(${event.target.result})`;
    imgInput.style.backgroundSize = 'cover';
    imgInput.style.backgroundPosition = 'center';
  });
  reader.readAsDataURL(e.target.files[0]);
});

imgInput.addEventListener('click', (e) => {
  e.target.classList.add('hidden');
  fileInput.value = '';
  fileInput.disabled = false;

  getColorPage.style.setProperty('--dom-color-1', 'var(--grad-3)');
  getColorPage.style.setProperty('--dom-color-2', 'var(--grad-2)');
});


const runningNum = (elements, numbers) => {
  for(let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let number = numbers[i];
    let num = 0;

    let interval = setInterval(() => {
            element.firstElementChild.textContent = num;
      if(num >= number) {
        clearInterval(interval);
        return;
      }
      num++;
    }, 10);
  }
}


const rgbToHex = (r, g, b) => {
  const componentToHex = (char) => {
    var hex = char.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  let hexString = "" + componentToHex(parseInt(r)) + componentToHex(parseInt(g)) + componentToHex(parseInt(b));
  return hexString.toUpperCase();
}


getColorBtn.addEventListener('click', (e) => {
    if(fileInput.files.length === 0) {
      alert('Insert your file');
      return;
    };
  e.target.textContent = 'Processing';
  e.preventDefault();
  const color = document.querySelector('.second > .container > .color-palette');
  const colorTexts = color.children[0].children;

  color.style.animation = 'var(--cycle-hue)';

  let redLine = document.querySelector('.second > .color > .red > div');
  let greenLine = document.querySelector('.second > .color > .green > div');
  let blueLine = document.querySelector('.second > .color > .blue > div');

  let numbers = document.querySelectorAll('.percentage > h2');

  let reader = new FileReader();
  reader.addEventListener('load', (event) => {

    fetch("https://febryans-image.hf.space/run/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [event.target.result]
      })
    })
      .then(response => response.json())
      .then(data => {
        color.style.animation = 'none';
        e.target.textContent = 'Get!';
        let rgb = data.data;

        let redRatio = rgb[0]/255*100;
        let greenRatio = rgb[1]/255*100;
        let blueRatio = rgb[2]/255*100;
        
        redLine.style.width = redRatio + '%';
        greenLine.style.width = greenRatio + '%';
        blueLine.style.width = blueRatio + '%';
        runningNum(numbers, [redRatio, greenRatio, blueRatio]);

        
        let rgbColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        let hexValue = rgbToHex(rgb[0], rgb[1], rgb[2]);
        color.style.background = rgbColor;

        color.style.color = rgbColor;

        getColorPage.style.setProperty('--dom-color-1', rgbColor);
        getColorPage.style.setProperty('--dom-color-2', rgbColor);

        fetch(`https://www.thecolorapi.com/id?hex=${hexValue}`)
          .then(response => response.json())
          .then(data => {
            let colorName = data.name.value;

            colorTexts[0].textContent = colorName;
            colorTexts[1].textContent = '#' + hexValue;
          })
      });
  });
  reader.readAsDataURL(fileInput.files[0]);
});



const encryptText = (text, offset) => {
  let encrypted = '';
  for(let i = 0; i < text.length; i++) {
    let ascii = text.charCodeAt(i);
    if(text[i] === ' ') {
      encrypted += text[i];
    } else {
      encrypted += String.fromCharCode(ascii + parseInt(offset));
    }
  }
  return encrypted;
}


const offsetSlider = document.querySelector('.encrypt-text > .body > .outputs > input');

offsetSlider.addEventListener('input', (e) => {
  let offsetText = document.querySelector('.encrypt-text > .body > .outputs > .text > .offset');
  let input = document.querySelector('.encrypt-text > .body > .inputs > textarea').value;
  let output = document.querySelector('.encrypt-text > .body > .outputs > .text > span');

  offsetText.textContent = `Offset: ${e.target.value}`;

  output.textContent = encryptText(input, e.target.value);
});

const textArea = document.querySelector('.encrypt-text > .body > .inputs > textarea');

textArea.addEventListener('input', (e) => {
  let input = e.target.value;
  let output = document.querySelector('.encrypt-text > .body > .outputs > .text > span');

  output.textContent = encryptText(input, offsetSlider.value);
});


document.querySelector('.encrypt-text > .body > .inputs > a').addEventListener('click', (e) => {
  e.preventDefault();
  let output = document.querySelector('.encrypt-text > .body > .outputs > .text > span');

  output.textContent = '';
  textArea.value = '';
});