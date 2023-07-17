let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'pics/Pharrell_Williams_-_Cash_in_Cash_Out.png',
        name : 'Cash In Cash Out',
        artist : 'Pharrell ft 21 Savage,Tyler THe Creator',
        music : 'music/Pharrell Williams - Cash In Cash Out (Official Video) ft. 21 Savage, Tyler, The Creator.mp3'
    },
    {
        img : 'pics/OIP.jfif',
        name : 'Call me everyday',
        artist : 'Chris Brown ft Wizkid',
        music : 'music/Chris Brown - Call Me Every Day (Official Video) ft. Wizkid.mp3'
    },
    {
        img : 'pics/electrivrt.png',
        name : 'Electricity',
        artist : 'Davido ft Pheelz',
        music : 'music/Pheelz x Davido - _Electricity_ (Official Music Video).mp3'
    },
    {
        img : 'pics/batman.jfif',
        name : 'Who Else',
        artist : 'Tion Wayne ft Unknown T',
        music : 'music/Tion Wayne - Who Else (feat. Unknown T) [Official video].mp3'
    },
    {
        img : 'pics/btas.png',
        name : 'IFTK',
        artist : 'Tion Wayne',
        music : 'music/Tion Wayne - IFTK (Feat. La Roux)  (Official Video).mp3'
    },
    {
        img : 'askae.jpg',
        name : 'Organise',
        artist : 'Asake',
        music : 'music/Asake - Organise (Official Visualizer).mp3'
    },
    {
        img : 'pics/lofi.png',
        name : 'Elevate',
        artist : 'Nemzzz',
        music : 'music/Nemzzz - Elevate [Music Video] _ GRM Daily.mp3'
    },
    {
        img : 'pics/batsiie.jfif',
        name : 'Doja',
        artist : 'Central Cee',
        music : 'music/Central Cee - Doja (Directed by Cole Bennett).mp3'
    },
    {
        img : 'pics/tems.jfif',
        name : 'The key',
        artist : 'Tems',
        music : 'music/Tems- The Key (Official Video).mp3'
    },
    {
        img : 'pics/anime-sunset-scene-b8-1366x768.jpg',
        name : 'Soldier',
        artist : 'Highlyy',
        music : 'music/Highlyy - Soldier (ft. Tion Wayne) Lyric Video.mp3'
    },
    {
        img : 'pics/franky.jfif',
        name : 'Pink + White',
        artist : 'Frank Ocean',
        music : 'music/Frank Ocean - Pink + White.mp3'
    },
    {
        img : 'pics/wizkid-bad-to-me.jpg',
        name : 'Bad to me',
        artist : 'Wizkid',
        music : 'music/Wizkid - Bad To Me (Official Audio).mp3'
    },
    {
        img : 'pics/kkenny.jpg',
        name : 'Alright',
        artist : 'Kendrick Lamar',
        music : 'music/Kendrick Lamar - Alright (Official Music Video).mp3'
    },
    {
        img : 'pics/santan.jfif',
        name : 'Starlight',
        artist : 'Dave',
        music : 'music/Dave - Starlight.mp3'
    },
    {
        img : 'pics/burna.jfif',
        name : 'Different size',
        artist : 'Buna boy',
        music : 'music/Burna Boy - Different Size feat. Victony [Official Audio].mp3'
    },
    {
        img : 'pics/Tyler-y-Kali-.webp',
        name : 'SEE YOU AGAIN',
        artist : 'Tyler The Creator ft Kali Uchis',
        music : 'music/SEE YOU AGAIN featuring Kali Uchis.mp3'
    },
    {
        img : 'pics/flower boy.jfif',
        name : 'Garden Shed',
        artist : 'Tyler The Creator',
        music : 'music/Garden Shed.mp3'
    },
    {
        img : 'pics/flower boy.jfif',
        name : ' 911/MrLonely',
        artist : 'Tyler The Creator',
        music : 'music/Tyler, The Creator - 911 _ Mr. Lonely (Audio).mp3'
    },
    {
        img : 'pics/flower boy.jfif',
        name : 'Where This Flower Blooms',
        artist : 'Tyler The Creator',
        music : 'music/Tyler, the Creator - Where This Flower Blooms [feat. Frank Ocean].mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}

console.log('Created by OPAULO')