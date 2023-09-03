createRandomDots(document.querySelector('.special-page > .header > .stars'), 35, 3.5);


const imgContainer = document.querySelector('.img-container');
for(let i = 0; i < 20; i++) {
  let image = document.createElement('div');
  image.dataset.file = 'https://youtu.be/dQw4w9WgXcQ';
  image.dataset.tags = '-';
  image.dataset.artist = '-';
  image.dataset.sample = 'https://cdn.donmai.us/sample/cd/6f/__shiina_mahiru_otonari_no_tenshi_sama_ni_itsu_no_mani_ka_dame_ningen_ni_sarete_ita_ken_drawn_by_hanekoto__sample-cd6f4f2f188060731e2e4e4bf6aebd6d.jpg';

  setBgFull(image, 'https://cdn.donmai.us/sample/cd/6f/__shiina_mahiru_otonari_no_tenshi_sama_ni_itsu_no_mani_ka_dame_ningen_ni_sarete_ita_ken_drawn_by_hanekoto__sample-cd6f4f2f188060731e2e4e4bf6aebd6d.jpg');
  imgContainer.appendChild(image);
}



const toggleOrientation = (element) => {
  element.style.background = 'hsl(0,0%,60%)';

  for(let i = 0; i < orientations.length; i++) {
    let option = orientations[i];
    if(option !== element) {
      option.style.background = 'none';
    }

  }
}


/*
for(let i = 0; i < orientations.length; i++) {
  let option = orientations[i];

  option.addEventListener('click', () => {
    tagInput.setAttribute('data-orientation', option.textContent);
    toggleOrientation(option);
  });
}
*/


const tagInput = document.querySelector('.inputs > .search-bar > input');
const orientations = document.querySelectorAll('.orientation > h6');
const searchButton = document.querySelector('.inputs > .search-bar > .icon');
const searchIcons = document.querySelectorAll('.search-bar > .icon > svg');




const modifyTags = (tag) => {
  let tagArray = tagInput.value.split(' ');
  tagArray[tagArray.length - 1] = tag;

  tagInput.value = tagArray.join(' ');
}


const suggestTag = async (parent, key) => {
  let params = new URLSearchParams({
    'search[name_or_alias_matches]': key + '*',
    'search[hide_empty]': 'yes',
    'search[order]': 'count',
    limit: 6
  });
  const url = new URL('https://danbooru.donmai.us/tags.json');
  url.search = params.toString();

  let tags = await (await fetch(url)).json();
  parent.innerHTML = '';

  if(tags.length > 0) {
    for(let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      let item = document.createElement('a');
      item.addEventListener('click', (e) => {
        e.preventDefault();
        modifyTags(tag.name);
      });
      let name = document.createElement('span');
      let count = document.createElement('span');
      item.href = '#';
      
      name.textContent = '• ' + tag.name;
      count.textContent = tag.post_count;
      
      item.appendChild(name);
      item.appendChild(count);
      parent.appendChild(item);
    }
  }
}


tagInput.addEventListener('focus', () => {
  const container = document.querySelector('.suggestions');
  
});
tagInput.addEventListener('blur', () => {
  const container = document.querySelector('.suggestions');
  container.style.transform = 'scaleY(0)';
});


tagInput.addEventListener('input', (e) => {
  let inputValue = tagInput.dataset.input;
  const container = document.querySelector('.suggestions');
  container.style.transform = 'scaleY(1)';

  let tags = e.target.value;
  let lastTag = tags.split(' ')[tags.split(' ').length - 1];
  suggestTag(container, lastTag.trim());


  if(tags === inputValue) {
    searchIcons[1].classList.remove('hidden');
    searchIcons[0].classList.add('hidden');
  } else {
    searchIcons[1].classList.add('hidden');
    searchIcons[0].classList.remove('hidden');
  }

});
/*
document.querySelector('.suggestions > button').addEventListener('click', () => {
  const container = document.querySelector('.suggestions');
  container.style.display = 'none';
});
*/


const formatTags = (string) => {
  arr = string.split(' ')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).replace(/_/g, ' ');
  }
  return arr.join(', ')
}


let searchIconPath = document.querySelector('.inputs > .icon > svg path');



const searchImage = async () => {
  imgContainer.innerHTML = '';
  imgContainer.scrollTo({
    left: 0,
    behavior: 'smooth'
  });

  
  let input = tagInput.value;

  let attr = tagInput.dataset.orientation;
  
  searchIcons[1].style.animation = 'rotateInfinite 1000ms linear infinite';


  tagInput.dataset.input = input;
  searchIcons[0].classList.add('hidden');
    searchIcons[1].classList.remove('hidden');

  
  if(attr === 'Landscape') {
    input += ' ratio:>1:1';
  } else if(attr === 'Portrait') {
    input += ' ratio:<1:1';
  }

  input = document.body.dataset.status === 'dev' ? input : input + ' rating:g';
  
  let params = new URLSearchParams({
    tags: input + ' -filetype:mp4,webm'
  });
  const url = new URL('https://danbooru.donmai.us/posts/random.json');
  url.search = params.toString();

  let arrayOfIDs = [];
  
  for(let i = 0; i < 20; i++) {
    let res = await fetch(url);
    console.log(res.ok);
    if(!res.ok) {
      alert('not found')
      break;
    }

    
    let post = await res.json();
    if(arrayOfIDs.includes(post.id)) {
      continue;
    }
    arrayOfIDs.push(post.id);
    let image = document.createElement('div');
    imgContainer.appendChild(image);
    imageOrientation(
      image,
      post.preview_file_url,
      post.large_file_url,
      post.image_width,
      post.image_height
    );
    setBgFull(image, post.large_file_url);
    imgClick(image, post);
  }

 searchIcons[1].style.animation = 'none';
}

searchButton.addEventListener('click', searchImage);

tagInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchImage();
  }
});







const imgClick = (image, post) => {
  const toggleDesaturate = (element, value) => {
    const imgChildren = imgContainer.children;
    for(let i = 0; i < imgChildren.length; i++) {
      if (imgChildren[i] !== element) {
        imgChildren[i].style.filter = `saturate(${value}%)`;
      }
    }
  }

  image.addEventListener('click', () => {
    const imgInfo = document.querySelector('.img-info');
    const redirectButtons = document.querySelector('.img-info > .link-string').children;
    const artistDesc = document.querySelector('.artist-string > h6');
    const tagDesc = document.querySelector('.tag-string > h6');
    
    let sourceBtn = redirectButtons[0];
    let downloadBtn = redirectButtons[1];

    let source = post.source;
    sourceBtn.href = source;
    
    if(source.includes('pximg') || source.includes('pixiv')) {
      let pixiv = source.split('/');
      sourceBtn.href = 'https://pixiv.net/artworks/' + pixiv[pixiv.length - 1].split('_')[0];
      sourceBtn.children[0].src = '/static/pixiv.png';
      sourceBtn.classList.remove('hidden');
    } else if(source.includes('twitter')) {
      sourceBtn.children[0].src = '/static/twitter.png';
      sourceBtn.classList.remove('hidden');
    } else {
      sourceBtn.classList.add('hidden');
    }
    
    artistDesc.textContent = formatTags(post.tag_string_artist);
    tagDesc.textContent = formatTags(post.tag_string_general);

    setBgFull(imgInfo, post.large_file_url);

    imgInfo.dataset.file = post.large_file_url;
    imgInfo.dataset.artist = post.tag_string_artist;
    imgInfo.dataset.chara = post.tag_string_character;
  });

  image.addEventListener('mouseenter', () => {
    toggleDesaturate(image, 0);
  });
  image.addEventListener('mouseleave', ()=> {
    toggleDesaturate(image, 100);
  });
}



document.querySelector('.img-info > .link-string').lastElementChild.addEventListener('click', (async (e) => {
  e.preventDefault();

  const imgInfo = document.querySelector('.img-info');
  let res = await fetch(imgInfo.dataset.file);
  let blob = await res.blob();
  const reader = new FileReader();
  
  
  reader.readAsDataURL(blob);
  reader.addEventListener('load', (event) => {
    let dl = document.createElement('a');
    dl.href = event.target.result;
    dl.download = imgInfo.dataset.chara + ' by ' + imgInfo.dataset.artist;
    dl.click();
    dl.remove();
  });
}));




const popularToday = document.querySelector('.popular-today');

const loadPopularPosts = async (permitted) => {
  const container = document.querySelector('.popular-today > .body');
  let tags = 'order:rank rating:g -filetype:mp4,zip,webm';
  if(permitted) {
    tags = 'order:rank -filetype:mp4,zip,webm';
  }
  let params = new URLSearchParams({
    tags: tags,
    limit: 50
  });
  const url = new URL('https://danbooru.donmai.us/posts.json?');
  url.search = params.toString();
  let res = await fetch(url);
  let posts = await res.json();

  for(let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let image = document.createElement('div');
    image.textContent = i + 1;

    let ratio = `${post.image_width}/${post.image_height}`
    image.style.aspectRatio = ratio;
    setBgFull(image, post.large_file_url);
    container.appendChild(image);
  }
}





const changeFileInput = (element, container) => {
  element.addEventListener('change', (e) => {
    e.target.disabled = true;
    
    container.classList.remove('hidden');
    
    let reader = new FileReader();
    reader.addEventListener('load', (event) => {
      setBgFull(container, event.target.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  });

  
  container.addEventListener('click', (e) => {
    e.target.classList.add('hidden');
    element.value = '';
    element.disabled = false;
  });
}

const getColorPage = document.querySelector('.dominant-color');
const getColorBtn = document.querySelector('.dominant-color > a');
const fileInput = document.querySelector('.dominant-color > .container > .image > input');


const imgInput = document.querySelector('.dominant-color > .container > .image > div');

changeFileInput(fileInput, imgInput);



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
    return hex.length == 1 ? '0' + hex : hex;
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
  const color = document.querySelector('.dominant-color > .container > .color-palette');
  const colorTexts = color.children[0].children;

  color.style.animation = 'var(--cycle-hue)';

  let redLine = document.querySelector('.dominant-color > .color > .red > div');
  let greenLine = document.querySelector('.dominant-color > .color > .green > div');
  let blueLine = document.querySelector('.dominant-color > .color > .blue > div');

  let numbers = document.querySelectorAll('.percentage > h2');

  let reader = new FileReader();
  
  reader.addEventListener('load', (async (event) => {
    let res = await fetch('https://febryans-image.hf.space/run/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [event.target.result]
      })
    });
    let rgb = (await res.json()).data;
    color.style.animation = 'none';
    e.target.textContent = 'Get!';

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
    
    let colorAPI = await fetch(`https://www.thecolorapi.com/id?hex=${hexValue}`);
    let colorName = (await colorAPI.json()).name.value;
    
    colorTexts[0].textContent = colorName;
    colorTexts[1].textContent = '#' + hexValue;
  }));
  reader.readAsDataURL(fileInput.files[0]);
});










const QRCodeForm = document.querySelector('.qrcode > .body > form');

QRCodeForm.addEventListener('submit',(e) => {
  e.preventDefault();
  let url = e.target.children[0].value;
  let colors = e.target.querySelectorAll('input[type=color]');
  let stroke = colors[0].value;
  let background = colors[1].value;
  let file = e.target.querySelector('input[type=file]');
  
  const qrImg = document.querySelector('.qr-img');
  const button = e.target.lastElementChild;

  

  let reader = new FileReader();

  reader.addEventListener('load', (event) => {
    button.textContent = 'Loading';
    fetch('https://febryans-qr.hf.space/run/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          url,
          stroke,
          background,
          event.target.result
        ]
      })
    }).then(res => res.json()).then(data => {
      setBgFull(qrImg, data.data);
      qrImg.href = data.data;
      button.textContent = 'Get!';
    });
  });
  reader.readAsDataURL(file.files[0]);
});


const qrColorInputs = document.querySelectorAll('.qrcode > .body > form > div > div > label');

qrColorInputs.forEach(input => {
  input.addEventListener('input', () => {
    input.style.background = `linear-gradient(90deg, black, ${input.children[1].value})`;
  });
});



changeFileInput(
  document.querySelector('.qrcode > .body > form > div > .logo > input'),
  document.querySelector('.qrcode > .body > form > div > .logo > div')
);






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
  let offsetText = document.querySelector('.encrypt-text > .body > .inputs > div > .offset');
  let input = document.querySelector('.encrypt-text > .body > .inputs > textarea').value;
  let output = document.querySelector('.encrypt-text > .body > .outputs > .text');


  offsetText.textContent = `Offset: ${e.target.value}`;

  output.value = encryptText(input, e.target.value);
});

const textArea = document.querySelector('.encrypt-text > .body > .inputs > textarea');

textArea.addEventListener('input', (e) => {
  let input = e.target.value;
  let output = document.querySelector('.encrypt-text > .body > .outputs > .text');

  output.value = encryptText(input, offsetSlider.value);
});


document.querySelector('.encrypt-text > .body > .inputs > div > a').addEventListener('click', (e) => {
  e.preventDefault();
  let output = document.querySelector('.encrypt-text > .body > .outputs > .text');

  output.value = '';
  textArea.value = '';
});