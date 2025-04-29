document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel__track');
    const slidesCount = 21;
    const slideWidth = 600;
    const dotsNav = document.querySelector('.carousel__nav');
  
    for (let i = 1; i <= slidesCount; i++) {
      const slide = document.createElement('li');
      slide.className = 'carousel__slide';
      slide.style.minWidth = slideWidth + 'px';
  
      const img = document.createElement('img');
      img.src = `images/screenshot${i}.png`;
      img.alt = `Screenshot ${i}`;
      slide.appendChild(img);
      track.appendChild(slide);
  
      const dot = document.createElement('button');
      dot.className = 'carousel__indicator';
      if (i === 1) dot.classList.add('current-slide');
      dot.dataset.slide = i - 1;
      dotsNav.appendChild(dot);
    }
  
    const slides = Array.from(track.children);
    const dots = Array.from(dotsNav.children);
    const prevBtn = document.querySelector('.carousel__btn--left');
    const nextBtn = document.querySelector('.carousel__btn--right');
  
    slides.forEach((slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    });
  
    slides[0].classList.add('current-slide');
  
    const moveToSlide = (track, current, target) => {
      track.style.transform = `translateX(-${target.style.left})`;
      current.classList.remove('current-slide');
      target.classList.add('current-slide');
    };
  
    const updateDots = (currentDot, targetDot) => {
      currentDot.classList.remove('current-slide');
      targetDot.classList.add('current-slide');
    };
  
    nextBtn.addEventListener('click', () => {
      const currentSlide = track.querySelector('.current-slide');
      const nextSlide = currentSlide.nextElementSibling || slides[0];
      const currentDot = dotsNav.querySelector('.current-slide');
      const nextDot = currentDot.nextElementSibling || dots[0];
  
      moveToSlide(track, currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
    });
  
    prevBtn.addEventListener('click', () => {
      const currentSlide = track.querySelector('.current-slide');
      const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
      const currentDot = dotsNav.querySelector('.current-slide');
      const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
  
      moveToSlide(track, currentSlide, prevSlide);
      updateDots(currentDot, prevDot);
    });
  
    dotsNav.addEventListener('click', (e) => {
      if (!e.target.matches('button')) return;
      const targetIndex = parseInt(e.target.dataset.slide, 10);
      const currentSlide = track.querySelector('.current-slide');
      const targetSlide = slides[targetIndex];
      const currentDot = dotsNav.querySelector('.current-slide');
      const targetDot = dots[targetIndex];
  
      moveToSlide(track, currentSlide, targetSlide);
      updateDots(currentDot, targetDot);
    });
  });
  