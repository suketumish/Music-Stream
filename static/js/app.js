const music = new Audio();

// Add error handling for audio loading
music.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
});

// Add event listener for when audio is loaded
music.addEventListener('loadeddata', () => {
    console.log('Audio loaded successfully');
});

// Add event listener for when audio starts playing
music.addEventListener('play', () => {
    console.log('Audio started playing');
});

// Add event listener for when audio is paused
music.addEventListener('pause', () => {
    console.log('Audio paused');
});

// Add event listener for when audio ends
music.addEventListener('ended', () => {
    console.log('Audio ended');
    let b = shuffle.innerHTML;
    switch (b) {
        case 'repeat':
            repeat_music();
            break;
        case 'next':
            next_music();
            break;
        case 'random':
            random_music();
            break;
    }
});

// create Array 
const songs = [
    {
        id:'1',
        songName:` On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "/static/img/1.jpg"
    },
    {
        id:'2',
        songName:` Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "/static/img/2.jpg"
    },
    {
        id:"3",
        songName: `Cartoon - On & On <br><div class="subtitle"> Daniel Levi</div>`,
        poster: "/static/img/3.jpg",
    },
    {
        id:"4",
        songName: `Warriyo - Mortals <br><div class="subtitle">Mortals</div>`,
        poster: "/static/img/4.jpg",
    },
    {
        id:"5",
        songName: `Ertugrul Gazi <br><div class="subtitle">Ertugrul</div>`,
        poster: "/static/img/5.jpg",
    },
    {
        id:"6",
        songName: `Electronic Music <br><div class="subtitle">Electro</div>`,
        poster: "/static/img/6.jpg",
    },
    {
        id:"7",
        songName: `Agar Tum Sath Ho <br><div class="subtitle">Tamashaa</div>`,
        poster: "/static/img/7.jpg",
    },
    {
        id:"8",
        songName: `Suna Hai <br><div class="subtitle">Neha Kakker</div>`,
        poster: "/static/img/8.jpg",
    },
    {
        id:"9",
        songName: `Dilber <br><div class="subtitle">Satyameva Jayate</div>`,
        poster: "/static/img/9.jpg",
    },
    {
        id:"10",
        songName: `Duniya <br><div class="subtitle">Luka Chuppi</div>`,
        poster: "/static/img/10.jpg",
    },
    {
        id:"11",
        songName: `Lagdi Lahore Di <br><div class="subtitle">Street Dancer 3D</div>`,
        poster: "/static/img/11.jpg",
    },
    {
        id:"12",
        songName: `Putt Jatt Da <br><div class="subtitle">Putt Jatt Da</div>`,
        poster: "/static/img/12.jpg",
    },
    {
        id:"13",
        songName: `Baarishein <br><div class="subtitle">Atif Aslam</div>`,
        poster: "/static/img/13.jpg",
    },
    {
        id:"14",
        songName: `Vaaste <br><div class="subtitle">Dhvani Bhanushali</div>`,
        poster: "/static/img/14.jpg",
    },
    {
        id:"15",
        songName: `Lut Gaye <br><div class="subtitle">Jubin Nautiyal</div>`,
        poster: "/static/img/15.jpg",
    },
];

// Populate song items
const menuSong = document.querySelector('.menu_song');
songs.forEach((song, index) => {
    const songItem = document.createElement('li');
    songItem.className = 'songItem';
    songItem.innerHTML = `
        <span>${String(index + 1).padStart(2, '0')}</span>
        <img src="${song.poster}" alt="">
        <h5>${song.songName}</h5>
        <i class="bi playListPlay bi-play-circle-fill" id="${song.id}"></i>
    `;
    menuSong.appendChild(songItem);
});

// Populate popular songs
const popSong = document.querySelector('.pop_song');
songs.forEach((song, index) => {
    if (index < 8) { // Show only first 8 songs in popular section
        const songItem = document.createElement('li');
        songItem.className = 'songItem';
        songItem.innerHTML = `
            <div class="img_play">
                <img src="${song.poster}" alt="">
                <i class="bi playListPlay bi-play-circle-fill" id="${song.id}"></i>
            </div>
            <h5>${song.songName}</h5>
        `;
        popSong.appendChild(songItem);
    }
});

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    });
};

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    });
};

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        
        // Update audio source with proper path
        music.src = `/static/audio/${index}.mp3`;
        poster_master_play.src = `/static/img/${index}.jpg`;
        
        // Load and play the audio
        music.load();
        music.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        });

        song_title.forEach(ele => {
            let { songName } = ele;
            title.innerHTML = songName;
        });
        
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
    });
});

// Progress bar functionality
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

// Volume control
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});

// Next and Previous functionality
let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = songs.length;
    }
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/img/${index}.jpg`;
    music.play().catch(error => {
        console.error('Error playing audio:', error);
    });
    
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });
    
    makeAllPlays();
    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
});

next.addEventListener('click', () => {
    index = parseInt(index) + 1;
    if (index > songs.length) {
        index = 1;
    }
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/img/${index}.jpg`;
    music.play().catch(error => {
        console.error('Error playing audio:', error);
    });
    
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });
    
    makeAllPlays();
    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
});

// Scroll functionality
let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
});

right_scroll.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
});

// Search functionality
const searchInput = document.querySelector('.search input');
const songItems = document.getElementsByClassName('songItem');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    Array.from(songItems).forEach((item, index) => {
        const songName = songs[index].songName.toLowerCase();
        if (songName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});



// search data start 
let search_results = document.getElementsByClassName('search_results')[0];

songs.forEach(element => {
    const {id, songName, poster} = element;
    // console.log(poster);
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#" + id;
    card.innerHTML = `
    <img src="${poster}" alt="">
                            <div class="content">
                                ${songName}
                            </div>
    `;
    search_results.appendChild(card);
});


let input = document.getElementsByTagName('input')[0];

input.addEventListener('keyup', ()=>{
    let input_value = input.value.toUpperCase();
    let items = search_results.getElementsByTagName('a');

    for (let index = 0; index < items.length; index++) {
        let as = items[index].getElementsByClassName('content')[0];
        let text_value = as.textContent || as.innerHTML;

        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = "flex";
        } else {
            items[index].style.display = "none";
        }

        if (input.value == 0) {
            search_results.style.display = "none";
        } else {
            search_results.style.display = "";
        }
        
    }
})
// search data end 



let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click', ()=>{
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;
    
       case "repeat": 
       shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;
       case "random": 
       shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }
});



const next_music = () => {
    if (index == songs.length) {
        index = 1
    } else {
        index++;
    }
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/img/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href =  `/static/audio/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}
const repeat_music = () => {
    index;
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/img/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href =  `/static/audio/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}

const random_music = () => {
    if (index == songs.length) {
        index = 1
    } else {
        index = Math.floor((Math.random() * songs.length) + 1);
    }
    music.src = `/static/audio/${index}.mp3`;
    poster_master_play.src = `/static/img/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href =  `/static/audio/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}



music.addEventListener('ended', ()=>{
    let b = shuffle.innerHTML;

    switch (b) {
        case 'repeat':
            repeat_music();
            break;
        case 'next':
            next_music();
            break;
        case 'random':
            random_music();
            break;
    }
})

// --- FAVORITES & RECENTLY PLAYED ---
let recentlyPlayed = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentTab = 'all'; // 'all', 'recent', 'fav'

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToRecentlyPlayed(songId) {
    recentlyPlayed = recentlyPlayed.filter(id => id !== songId);
    recentlyPlayed.unshift(songId);
    if (recentlyPlayed.length > 10) recentlyPlayed.pop();
}

function toggleFavorite(songId) {
    if (favorites.includes(songId)) {
        favorites = favorites.filter(id => id !== songId);
    } else {
        favorites.push(songId);
    }
    saveFavorites();
    renderSongList();
}

function renderSongList() {
    menuSong.innerHTML = '';
    let list = [];
    if (currentTab === 'all') {
        list = songs;
    } else if (currentTab === 'recent') {
        list = recentlyPlayed.map(id => songs.find(s => s.id == id)).filter(Boolean);
    } else if (currentTab === 'fav') {
        list = favorites.map(id => songs.find(s => s.id == id)).filter(Boolean);
    }
    list.forEach((song, index) => {
        const songItem = document.createElement('li');
        songItem.className = 'songItem';
        songItem.innerHTML = `
            <span>${String(index + 1).padStart(2, '0')}</span>
            <img src="${song.poster}" alt="">
            <h5>${song.songName}</h5>
            <i class="bi playListPlay bi-play-circle-fill" id="${song.id}"></i>
            <i class="bi bi-heart${favorites.includes(song.id) ? '-fill' : ''} fav-icon" data-id="${song.id}" style="position:absolute;right:40px;cursor:pointer;color:${favorites.includes(song.id) ? '#e74c3c' : '#aaa'}"></i>
        `;
        menuSong.appendChild(songItem);
    });
    attachSongItemEvents();
    attachFavoriteEvents();
}

function attachSongItemEvents() {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.onclick = (e) => {
            index = e.target.id;
            makeAllPlays();
            e.target.classList.remove('bi-play-circle-fill');
            e.target.classList.add('bi-pause-circle-fill');
            music.src = `/static/audio/${index}.mp3`;
            poster_master_play.src = `/static/img/${index}.jpg`;
            music.play().catch(error => { console.error('Error playing audio:', error); });
            let song_title = songs.filter((ele) => ele.id == index);
            song_title.forEach(ele => { let { songName } = ele; title.innerHTML = songName; });
            masterPlay.classList.remove('bi-play-fill');
            masterPlay.classList.add('bi-pause-fill');
            wave.classList.add('active2');
            makeAllBackgrounds();
            Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
            addToRecentlyPlayed(index);
        };
    });
}

function attachFavoriteEvents() {
    Array.from(document.getElementsByClassName('fav-icon')).forEach((icon) => {
        icon.onclick = (e) => {
            e.stopPropagation();
            const songId = e.target.getAttribute('data-id');
            toggleFavorite(songId);
        };
    });
}

// --- SIDEBAR TAB HANDLERS ---
function attachSidebarTabEvents() {
    const tabs = document.querySelectorAll('.playlist h4');
    tabs[0].onclick = () => { currentTab = 'all'; renderSongList(); setActiveTab(0); };
    tabs[1].onclick = () => { currentTab = 'recent'; renderSongList(); setActiveTab(1); };
    tabs[2].onclick = () => { currentTab = 'fav'; renderSongList(); setActiveTab(2); };
}
function setActiveTab(idx) {
    const tabs = document.querySelectorAll('.playlist h4');
    tabs.forEach(t => t.classList.remove('active'));
    tabs[idx].classList.add('active');
}
attachSidebarTabEvents();
renderSongList();

// --- 3-BAND EQUALIZER ---
let audioContext;
let source;
let filters = {};
let isEqualizerInitialized = false;

function initializeEqualizer() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!source) {
        source = audioContext.createMediaElementSource(music);
    }

    // Create filters for each band
    const frequencies = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
    frequencies.forEach(freq => {
        const filter = audioContext.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.value = freq;
        filter.Q.value = 1;
        filter.gain.value = 0;
        filters[freq] = filter;
    });

    // Connect the filters in series
    let lastNode = source;
    frequencies.forEach(freq => {
        lastNode.connect(filters[freq]);
        lastNode = filters[freq];
    });
    lastNode.connect(audioContext.destination);
    
    isEqualizerInitialized = true;
}

// Equalizer functionality
const eqToggle = document.getElementById('eqToggle');
const eqSliders = document.querySelector('.eq-sliders');

eqToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    if (!isEqualizerInitialized) {
        initializeEqualizer();
    }
    
    if (eqSliders.style.display === 'none' || eqSliders.style.display === '') {
        eqSliders.style.display = 'flex';
        setTimeout(() => {
            eqSliders.classList.add('visible');
        }, 10);
    } else {
        eqSliders.classList.remove('visible');
        setTimeout(() => {
            eqSliders.style.display = 'none';
        }, 300);
    }
});

// Close equalizer when clicking outside
document.addEventListener('click', (e) => {
    if (!eqSliders.contains(e.target) && !eqToggle.contains(e.target)) {
        eqSliders.classList.remove('visible');
        setTimeout(() => {
            eqSliders.style.display = 'none';
        }, 300);
    }
});

document.querySelectorAll('.eq-band').forEach((slider) => {
    slider.addEventListener('input', (e) => {
        if (!isEqualizerInitialized) initializeEqualizer();
        const value = parseFloat(e.target.value);
        const band = e.target.getAttribute('data-band');
        if (filters[band]) {
            filters[band].gain.value = value;
        }
    });
});

function resetEqualizer() {
    if (isEqualizerInitialized) {
        Object.values(filters).forEach(filter => {
            filter.gain.value = 0;
        });
        document.querySelectorAll('.eq-band').forEach(slider => {
            slider.value = 0;
        });
    }
}

const resetButton = document.querySelector('.eq-reset');
resetButton.addEventListener('click', resetEqualizer);

music.addEventListener('play', () => {
    if (!isEqualizerInitialized) {
        initializeEqualizer();
    }
});

// --- AUTH MODAL LOGIC ---
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
document.getElementById('closeLogin').onclick = () => loginModal.style.display = 'none';
document.getElementById('closeSignup').onclick = () => signupModal.style.display = 'none';
document.getElementById('showSignup').onclick = () => { loginModal.style.display = 'none'; signupModal.style.display = 'block'; };
document.getElementById('showLogin').onclick = () => { signupModal.style.display = 'none'; loginModal.style.display = 'block'; };

// Show login modal on page load (or add a login button somewhere)
window.onload = () => { loginModal.style.display = 'block'; };

// Add: Show login modal when user icon is clicked and not logged in
// Wait for DOMContentLoaded to ensure all elements are present
// This works for both id="userMenu" and class="user" (for different templates)
document.addEventListener('DOMContentLoaded', function() {
    const userMenu = document.getElementById('userMenu') || document.querySelector('.user');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    if (userMenu && loginModal && signupModal) {
        userMenu.addEventListener('click', function() {
            const usernameDisplay = document.getElementById('usernameDisplay');
            const loginOpen = loginModal.style.display === 'block';
            const signupOpen = signupModal.style.display === 'block';
            if ((!usernameDisplay || !usernameDisplay.textContent.trim()) && !loginOpen && !signupOpen) {
                loginModal.style.display = 'block';
            }
        });
    }
});

// Login
if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').onclick = async () => {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            loginModal.style.display = 'none';
            // Optionally show username in UI
        } else {
            document.getElementById('loginMsg').innerText = data.msg;
        }
    };
}
// Signup
if (document.getElementById('signupBtn')) {
    document.getElementById('signupBtn').onclick = async () => {
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        const res = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            signupModal.style.display = 'none';
            loginModal.style.display = 'block';
            document.getElementById('loginMsg').innerText = 'Signup successful! Please login.';
        } else {
            document.getElementById('signupMsg').innerText = data.msg;
        }
    };
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const menuSide = document.querySelector('.menu_side');

menuToggle.addEventListener('click', () => {
    menuSide.classList.toggle('active');
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 680) {
        if (!menuSide.contains(e.target) && !menuToggle.contains(e.target)) {
            menuSide.classList.remove('active');
        }
    }
});

// User menu dropdown logic
const userMenu = document.getElementById('userMenu');
const userDropdown = document.getElementById('userDropdown');
const usernameDisplay = document.getElementById('usernameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

userMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    if (userDropdown.style.display === 'none' || userDropdown.style.display === '') {
        userDropdown.style.display = 'flex';
    } else {
        userDropdown.style.display = 'none';
    }
});

document.addEventListener('click', () => {
    userDropdown.style.display = 'none';
});

async function updateUserInfo() {
    const res = await fetch('/check_auth', { credentials: 'include' });
    const data = await res.json();
    if (data.authenticated) {
        usernameDisplay.textContent = data.username;
        userMenu.style.display = 'block';
    } else {
        userMenu.style.display = 'none';
    }
}
logoutBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    await fetch('/logout', { method: 'POST', credentials: 'include' });
    updateUserInfo();
    document.getElementById('loginModal').style.display = 'block';
    userDropdown.style.display = 'none';
});
window.addEventListener('load', updateUserInfo);

