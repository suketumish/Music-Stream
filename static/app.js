// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuSide = document.querySelector('.menu_side');

menuToggle.addEventListener('click', () => {
    menuSide.classList.toggle('active');
});

// Mobile Controls
const mobilePlay = document.getElementById('mobile_play');
const mobileBack = document.getElementById('mobile_back');
const mobileNext = document.getElementById('mobile_next');

// Sync mobile controls with main player
mobilePlay.addEventListener('click', () => {
    document.getElementById('masterPlay').click();
});

mobileBack.addEventListener('click', () => {
    document.getElementById('back').click();
});

mobileNext.addEventListener('click', () => {
    document.getElementById('next').click();
});

// Update mobile play button state
function updateMobilePlayButton() {
    const masterPlay = document.getElementById('masterPlay');
    if (masterPlay.classList.contains('bi-pause-fill')) {
        mobilePlay.classList.remove('bi-play-fill');
        mobilePlay.classList.add('bi-pause-fill');
    } else {
        mobilePlay.classList.remove('bi-pause-fill');
        mobilePlay.classList.add('bi-play-fill');
    }
}

// Add touch event listeners for better mobile interaction
document.querySelectorAll('.menu_song li').forEach(item => {
    item.addEventListener('touchstart', function(e) {
        this.style.backgroundColor = 'rgba(105, 105, 170, 0.2)';
    });
    
    item.addEventListener('touchend', function(e) {
        this.style.backgroundColor = '';
    });
});

// Handle mobile search
const searchInput = document.querySelector('.search input');
searchInput.addEventListener('focus', () => {
    if (window.innerWidth <= 680) {
        document.querySelector('.search_results').style.display = 'block';
    }
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) {
        document.querySelector('.search_results').style.display = 'none';
    }
});

// Handle mobile volume control
const volIcon = document.getElementById('vol_icon');
const volControl = document.querySelector('.vol');

if (window.innerWidth <= 680) {
    volControl.style.display = 'none';
    volIcon.addEventListener('click', () => {
        volControl.style.display = volControl.style.display === 'none' ? 'flex' : 'none';
    });
}

// Handle mobile equalizer
const eqToggle = document.getElementById('eqToggle');
const eqSliders = document.querySelector('.eq-sliders');

if (window.innerWidth <= 680) {
    eqSliders.style.display = 'none';
    eqToggle.addEventListener('click', () => {
        eqSliders.style.display = eqSliders.style.display === 'none' ? 'flex' : 'none';
    });
}

// Existing code...
// ... (keep all your existing JavaScript code here) 