let audioFileUrl = 'static/audio.mp3'
let videoFileUrl = '';
const downloadAudio = document.querySelector('.music-player > .footer > .download');
const playButton = document.querySelector('.player > .play');
const audio = new Audio();
const video = document.querySelector('.music-player > .head > .image > video');






const toggleIcon = (index) => {
  // Used to toggle play, pause, and replay icons
  const icons = playButton.children;
  
  icons[index].classList.remove('hidden');

  for(let i = 0; i < icons.length; i++) {
    if(icons[i] !== icons[index]) {
      icons[i].classList.add("hidden");
    }
  }
}




const toggleViewType = document.querySelector('.music-player > .footer > .toggle-type');

toggleViewType.addEventListener('click', (e) => {
  // Used to toggle between video player and audio player. Default to audio player
  
  e.preventDefault();
  let status = e.target.dataset.status === 'false';
  
  // Video = True, Audio = False
  if(status) {
    video.classList.remove('hidden');
    audio.pause();
    e.target.textContent = 'Audio';
    video.currentTime = audio.currentTime;
    downloadAudio.href = videoFileUrl;
    
    e.target.dataset.status = status;
  } else {
    video.classList.add('hidden');
    video.pause();
    e.target.textContent = 'Video';
    audio.currentTime = video.currentTime;
    downloadAudio.href = audioFileUrl;
    
    e.target.dataset.status = status;
  }
  toggleIcon(0);
});





const audioAction = () => {
  // To control the player if the type is Video
  
  if(audio.paused) {
    let loadAudio = false;
    if(audio.src.includes(audioFileUrl)) {
      loadAudio = true;
    }
    toggleIcon(1);
    
    if(!loadAudio) {
      audio.src = audioFileUrl;
      audio.load();
    }
    audio.play();
  } else {
    toggleIcon(0);
    audio.pause();
  }
}


const videoAction = () => {
  // To control the player if the type is Video
  
  if(video.paused) {
    let loadVideo = false;
    if(video.children[0].src.includes(videoFileUrl)) {
      loadVideo = true;
    }
    toggleIcon(1);
    
    if(!loadVideo) {
      video.children[0].src = videoFileUrl;
      video.load();
    }
    video.play();
  } else {
    toggleIcon(0);
    video.pause();
  }
}




playButton.addEventListener('click', () => {
  let status = toggleViewType.dataset.status === 'false';
  if(status) {
    audioAction();
  } else {
    videoAction();
  }
});



const convertToMinute = (seconds) => {
  // Convert from seconds to hh:mm:ss format
  
  if(isNaN(seconds)) {
    // check if the input is a number
    return 'Loading';
  }
  let minutes = Math.floor(seconds/60);
  let remaining = leadZero(Math.floor(seconds % 60));
  if( minutes >= 60) {
    let hour = Math.floor(seconds/3600);
    let remainMinutes = leadZero(Math.floor(minutes % 60));
    return `${hour}:${remainMinutes}:${remaining}`;
  }

  return `${minutes}:${remaining}`;
}

const timeUpdate = (type) => {
  // A function to update some elements according to video/audio current duration
  const range = document.querySelector('#timeline');
  const timeline = document.querySelector('.timeline');
  
  range.addEventListener('input', () => {
    type.currentTime = range.value;
    let ratio = range.value/range.max;
    let isEnded = timeline.dataset.end === 'true';
    timeline.style.setProperty('--ratio', ratio);
    if (isEnded) {
      toggleIcon(0);
      timeline.dataset.end = !isEnded;
    }
  });
  
  
  type.addEventListener('timeupdate', () => {
    let duration = type.duration;
    let current = type.currentTime;
    let ratio = current/duration;

    const timeCounter = document.querySelector('.music-player > .head > .info > .time').children;
    

    range.max = duration;
    range.value = current;
    timeline.style.setProperty('--ratio', ratio);
    timeCounter[0].textContent = convertToMinute(current);
    timeCounter[1].textContent = convertToMinute(duration);

    
  
  
    if(current === duration) {
      toggleIcon(2);
      timeline.dataset.end = 'true';
      type.pause();
    } else if(type.paused) {
      toggleIcon(0);
    } else {
      toggleIcon(1);
    }
  });

  const backwardButton = document.querySelector('.player > .backward');
  const forwardButton = document.querySelector('.player > .forward');

  
  backwardButton.addEventListener('click', () => {
    // Skip backward by 10s
    type.currentTime -= 10;
  });
  forwardButton.addEventListener('click', () => {
    // Skip forward by 10s
    type.currentTime += 10;
  });
}

timeUpdate(audio);
timeUpdate(video);
/*

rewindButton.addEventListener('click', () => {
  audio.currentTime = 0;
});

*/


const musicForm = document.querySelector('.music-player > form');

musicForm.children[0].addEventListener('input', (e) => {
  const previewBox = document.querySelector('.music-player > form > .video-preview');
  
  if(e.target.value !== musicForm.dataset.url) {
    previewBox.style.transform = 'scaleY(0)';
  } else {
    previewBox.style.transform = 'scaleY(1)';
  }
  
  if(e.target.value !== '') {
    musicForm.children[1].style.transform = 'rotate(0deg)';
  } else {
    musicForm.children[1].style.transform = 'rotate(-180deg)';
  }
});



musicForm.addEventListener('submit', (async (e) => {
  // Used to submit a form to update music player
  // Input: YouTube video URL (Type: String)
  // Outputs: Video information (Type: Object), video source (Type: String), audio source (Typr: String)
  
  e.preventDefault();
  const previewBox = document.querySelector('.music-player > form > .video-preview');
  previewBox.style.transform = 'scaleY(0)';

  let videoUrl = e.target.children[0].value;
  const button = e.target.children[1];
  const musicTitle = document.querySelector('.music-player > .head > .info > h2');
  const musicArtist = document.querySelector('.music-player > .head > .info > h4');
  const player = document.querySelector('.music-player');
  const trackArt = document.querySelector('.music-player > .head > .image');

  button.textContent = '∆';

  let res = await fetch(FebryanShino + '/api/youtube', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: videoUrl
    })
  });
  let output = await res.json();
  
  
  audio.pause();
  video.pause();
  audio.currentTime = 0;
  video.currentTime = 0;
  toggleIcon(0);
  
  button.textContent = '→';
  let data = output.data;
  let thumbnail = data.thumbnail;
  audioFileUrl = data.audio_url;
  videoFileUrl = data.video_url;

  downloadAudio.href = audioFileUrl;
  musicTitle.textContent = data.title;
  musicArtist.textContent = data.author;
  setBgFull(player, thumbnail);
  button.style.background = data.dominant_color;
  setBgFull(trackArt, thumbnail);
  
  if('mediaSession' in navigator) {
    // Update the notification bar according to the video information
    navigator.mediaSession.metadata = new MediaMetadata({
      title: data.title,
      artist: data.author,
      artwork: [
        {
          src: thumbnail,
          type: 'image/png',
        }
      ]
    });
  }
}));




const youtubeForm = document.querySelector('.youtube > .head > form');

youtubeForm.addEventListener('submit', (async (e) => {
  // Submit a form that using YouTube Search API
  //Input: Keywords (Type: String)
  e.preventDefault();

  let keyword = e.target.children[0].value;
  
  let res = await fetch(FebryanShino + '/api/ytsearch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      keyword: keyword
    })
  });
  
  let posts = (await res.json()).posts;

  const container = document.querySelector('.youtube > .body');
  container.innerHTML = '';
  container.style.height = 'auto';
  container.scrollTo({
    left: 0,
    behavior: 'smooth'
  });

  
  for(let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let thumbnail = post.snippet.thumbnails.high.url;

    let item = document.createElement('div');
    let title = document.createElement('h6');

    setBgFull(item, thumbnail);
    item.style.color = 'white';

    title.textContent = post.snippet.title;
    
    item.appendChild(title);
    container.appendChild(item);

    item.addEventListener('click', () => {
      const containerGod = document.querySelector('.third-page');
      const previewBox = document.querySelector('.music-player > form > .video-preview');
      let videoID = post.id.videoId;

      previewBox.style.transform = 'scaleY(1)';
      setBgFull (previewBox.children[0], thumbnail);
      previewBox.children[1].textContent = post.snippet.title;

      let ytURL = 'https://youtu.be/' + videoID
      musicForm.dataset.url = ytURL;
      musicForm.children[0].value = ytURL;
      containerGod.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      musicForm.children[1].style.transform = 'rotate(0deg)';
    });
  }
}));



const itunesForm = document.querySelector('.itunes > .head > form');


itunesForm.addEventListener('submit', (async (e) => {
  e.preventDefault();
  const container = document.querySelector('.itunes > .body');

  let params = new URLSearchParams({
    term: e.target.children[0].value
  });
  const url = new URL('https://itunes.apple.com/search');
  url.search = params.toString();
  
  let res = await fetch(url);
  let tracks = (await res.json()).results;
  
  container.innerHTML = '';

  for(let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    let trackArt = track.artworkUrl100;
    let item = document.createElement('div');

    item.style.opacity = 0;
    item.style.background = `url(${trackArt.replace('100x100', '400x400')})`;
    let image = new Image();
    image.src = trackArt.replace('100x100', '400x400');
    item.style.backgroundSize = 'cover';
    item.style.backgroundPosition = 'center';

    image.addEventListener('load', () => {
      item.style.opacity = 1;
    });
    container.appendChild(item);


    item.addEventListener('click', () => {
      const head = document.querySelector('.itunes > .head');
      const title = document.querySelector('.itunes > .head > h3');
      const trackBack = document.querySelector('.itunes > .head > .track-info > .track-art')
      const artist = document.querySelector('.itunes > .head > .track-info > .info > #artist');
      const duration = document.querySelector('.itunes > .head > .track-info > .info > #duration');
      const genre = document.querySelector('.itunes > .head > .track-info > .info > #genre');
      const buttons = document.querySelector('.itunes > .head > .track-info > .info > div').children;

      const albumArt = document.querySelector('.itunes > .head > .album > .album-art');
      const albumName = document.querySelector('.itunes > .head > .album > h6');

      title.textContent = track.trackName;

      setBgFull(trackBack, trackArt.replace('100x100','1440x1440'));
      setBgFull(head, trackArt.replace('100x100','1440x1440'));
      setBgFull(albumArt, trackArt.replace('100x100','1440x1440'));
        
        
        
      artist.textContent = track.artistName;
      duration.textContent = convertToMinute(track.trackTimeMillis/1000);
      genre.textContent = track.primaryGenreName;
      albumName.textContent = track.collectionName;
      buttons[0].href = trackArt.replace('100x100','1440x1440');
      buttons[1].dataset.source = track.previewUrl;

      const preview = new Audio();
      buttons[1].addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.dataset.source !== e.target.dataset.current) {
          preview.src = e.target.dataset.source;
          preview.load();
          e.target.dataset.current = e.target.dataset.source;
        }
        preview.play();
      })
    });
  }
}));