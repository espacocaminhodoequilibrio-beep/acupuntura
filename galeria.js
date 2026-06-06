const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const dots = Array.from(document.querySelectorAll('.dot'));
const thumbs = Array.from(document.querySelectorAll('.gallery-thumbs img'));

let currentIndex = 0;
let autoplay;

function updateCarousel(index){
  currentIndex = index;

  if(currentIndex < 0){
    currentIndex = slides.length - 1;
  }

  if(currentIndex >= slides.length){
    currentIndex = 0;
  }

  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function startAutoplay(){
  autoplay = setInterval(() => {
    updateCarousel(currentIndex + 1);
  }, 5000);
}

function resetAutoplay(){
  clearInterval(autoplay);
  startAutoplay();
}

nextButton.addEventListener('click', () => {
  updateCarousel(currentIndex + 1);
  resetAutoplay();
});

prevButton.addEventListener('click', () => {
  updateCarousel(currentIndex - 1);
  resetAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateCarousel(index);
    resetAutoplay();
  });
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    updateCarousel(index);
    document.querySelector('.gallery-section').scrollIntoView({behavior:'smooth'});
    resetAutoplay();
  });
});

startAutoplay();
