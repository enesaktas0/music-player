const singer = document.getElementById('singer');
const title = document.getElementById('title');
const image = document.getElementById('image');
const audio = document.getElementById('audio');

const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');

const bar = document.querySelector('.bar');
const currentTime = document.querySelector('.current-time');
const fullTime = document.querySelector('.full-time');

const volume = document.getElementById('volume');
const volumeBar = document.getElementById('volume-bar');

const musicList1 =document.getElementById('music-list').firstElementChild;


const player = new MusicPlayer(musicList);

var musicControl = false ;
var muted = false;

let music = player.getMusic();

audio.addEventListener('loadedmetadata',() => {
    secandMusic = audio.duration;
    fullTime.textContent = calculateTime(secandMusic);
    bar.max = Math.floor(audio.duration);
});

play.addEventListener('click',() => {
    if(!musicControl){
        startMusic();
    }else{
        stopMusic();
    }
})

prev.addEventListener('click',function(){
    player.prev();
    display();
    music = player.getMusic();
    startMusic();
    playingMusic();
});

next.addEventListener('click',function(){
    player.next();
    display();
    music = player.getMusic();
    startMusic();
    playingMusic();
});

function display(){
    audio.src = `mp3/${musicList[player.index].mp3}`;
    title.textContent = `${musicList[player.index].title}`;
    singer.textContent = `${musicList[player.index].singer}`;
    image.src = `img/${musicList[player.index].image}`;
}

window.addEventListener('load',() => {
    display();
    displayMusicList(player.musicList);
    playingMusic();
})

function startMusic(){
    audio.play();
    musicControl = true;
    play.firstElementChild.classList = 'fa-solid fa-pause';
}
function stopMusic(){
    audio.pause();
    musicControl = false;
    play.firstElementChild.classList = 'fa-solid fa-play';
};

function calculateTime(secandMusic) {
    let minute = Math.floor(secandMusic / 60) ;
    let secand = Math.floor(secandMusic % 60) ;
    let updateofSecand = secand < 10 ? `0${secand}` : `${secand}`; 
    timeofMusic = `${minute}:${updateofSecand}`;
    return timeofMusic;
}

audio.addEventListener('timeupdate', () => {
    bar.value = audio.currentTime;
    currentTime.textContent = calculateTime(Math.floor(bar.value));
    if(audio.currentTime == audio.duration){
        next.click();
    }
})

bar.addEventListener('input',() => {
    currentTime.textContent = calculateTime(bar.value);
    audio.currentTime = bar.value;
})

volume.addEventListener('click', () => {
    if(!muted){
        audio.muted = true;
        muted = true;
        volumeBar.value = 0;
        volume.classList = 'fa-solid fa-volume-xmark';
    }else{
        audio.muted = false;
        muted = false;
        volumeBar.value = 90;
        volume.classList = "fa-solid fa-volume-high";
    }
})

volumeBar.addEventListener('input', () => {
    let levelofVolume = volumeBar.value ;
    audio.volume = levelofVolume / 100;
    if(levelofVolume == 0){
        audio.muted = true ;
        volume.classList = "fa-solid fa-volume-xmark";
    }else{
        audio.muted = false ;
        volume.classList = "fa-solid fa-volume-high";
    }
})
function displayMusicList(musicList){
    for(let i=0 ; i < musicList.length; i++){
        let element = `
        <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center options">
            <span>${musicList[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${musicList[i].mp3}"></audio>
        </li>
        `
        musicList1.insertAdjacentHTML('beforeend',element);
        // musicList1.innerHTML += element;
        let durationofMusic = musicList1.querySelector(`#music-${i}`);
        let setofMusic = musicList1.querySelector(`.music-${i}`);
        setofMusic.addEventListener('loadeddata',() => {
            durationofMusic.innerText = calculateTime(setofMusic.duration);
        })
    }
}

function selectedMusic(li){
    player.index = li.getAttribute('li-index');
    display();
    startMusic();
    playingMusic();
}

const playingMusic = () => {
    let options = document.querySelectorAll('.options');
    for(let i=0; i < player.musicList.length ; i++){
        options[i].classList.remove('selected');

        if(options[i].getAttribute('li-index') == player.index){
            options[i].classList.add('selected');
        }
    }
    // console.log(li.getAttribute('li-index'));
}




