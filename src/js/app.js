import * as flsFunctions from "./modules/functions.js";

import Swiper, { Autoplay, Navigation } from 'swiper';


const categoriesSwiper = new Swiper('.categories__swiper', {

  direction: 'horizontal',
  modules: [Autoplay],
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 500,

  wrapperClass: 'categories__wrppper',
  slideClass: 'categories__slide',
  slideActiveClass: 'categories__slide--active',
  slideDuplicateActiveClass: 'categories__slide-duplicate--active',
  slideDuplicateClass: 'categories__slide-duplicate',
  centeredSlides: true,
  loopedSlides: 3,

  breakpoints: {

    320: {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
    },

    567: {
      slidesPerView: 2,
      spaceBetween: 30,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  },

});


const testimonialsSwiper = new Swiper('.testimonials__swiper', {

  direction: 'horizontal',
  modules: [Autoplay],
  loop: true,
  autoplay: {
    delay: 5000,
  },
  loopedSlides: 3,
  spaceBetween: 30,
  speed: 700,

  wrapperClass: 'testimonials__wrappper',
  slideClass: 'testimonials__slide',
  slideActiveClass: 'testimonials__slide--active',
  slideDuplicateActiveClass: 'testimonials__slide-duplicate--active',
  slideDuplicateClass: 'testimonials__slide-duplicate',
});

const shortsSwiper = new Swiper('.shots__swiper', {

  direction: 'horizontal',
  modules: [Autoplay, Navigation],
  loop: true,
  autoplay: {
    delay: 5000,
  },
  loopedSlides: 6,
  spaceBetween: 30,
  speed: 700,


  wrapperClass: 'shots__wrapper',
  slideClass: 'shots__slide',
  slideActiveClass: 'shots__slide--active',
  slideNextClass: 'shots__slide--next',
  slidePrevClass: 'shots__slide--prev',
  slideDuplicateActiveClass: 'shots__slide-duplicate--active',
  slideDuplicateClass: 'shots__slide-duplicate',
  slideDuplicateNextClass: 'shots__slide-duplicate--next',
  slideDuplicatePrevClass: 'shots__slide-duplicate--prev',

  navigation: {
    nextEl: '.shots__button-next',
    prevEl: '.shots__button-prev',
  },

  breakpoints: {

    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    567: {
      slidesPerView: 2,
      spaceBetween: 30,
      centeredSlides: false,

    },

    991: {
      slidesPerView: 3,
      centeredSlides: true,
    }
  },

});

let header = document.querySelector('.header');

if (document.documentElement.scrollTop) {
  header.classList.add('header--fixed');
}

window.addEventListener('scroll', function () {
  if (scrollY > 0) {
    header.classList.add('header--fixed');
  }
  else {
    header.classList.remove('header--fixed');
  }
});


let headerBurger = document.querySelector('.header__burger');
let headerDropdawn = document.querySelectorAll('.header__item--dropdown');

headerBurger.addEventListener('click', function () {
  let headerMenu = document.querySelector('.header__menu');
  let body = document.querySelector('body');
  headerBurger.classList.toggle('burger--active');
  headerMenu.classList.toggle('header__menu--active');
  body.classList.toggle('no-scrol');
});



function headerDropdawnF(event) {
  let target = event.target.closest('.header__item--dropdown');
  let dropdownHeader = target.querySelector('.dropdown-header');
  let dropdownHeaderHeight = dropdownHeader.clientHeight;

  if (target.classList.contains('header__item--active')) {
    target.classList.remove('header__item--active');
    target.style.paddingBottom = 0;
  }

  else {
    target.classList.add('header__item--active');

    target.style.paddingBottom = dropdownHeaderHeight + 'px';
  }

};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  headerDropdawn.forEach(headerDropdawnItem => {
    headerDropdawnItem.addEventListener('click', headerDropdawnF);
  });
}


function close(event) {
  let target = event.target.closest('.header__item--dropdown');

  if (!target) {
    headerDropdawn.forEach(headerDropdawnItem => {
      headerDropdawnItem.classList.remove('header__item--active');
      headerDropdawnItem.style.paddingBottom = 0;
    });

  }
}

document.addEventListener('click', close);


let deadline = document.querySelector('.hero__clock').dataset.deadline;

console.log(deadline);

function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  let clock = document.getElementById(id);
  let daysSpan = clock.querySelector('.days');
  let hoursSpan = clock.querySelector('.hours');
  let minutesSpan = clock.querySelector('.minutes');
  let secondsSpan = clock.querySelector('.seconds');
  function updateClock() {
    let t = getTimeRemaining(endtime);

    daysSpan.innerHTML = ('0' + t.days).slice(-2);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock(); 
  let timeinterval = setInterval(updateClock, 1000);
}

initializeClock('clockdiv', deadline);



let scheduleButton = document.querySelectorAll('.schedule__nav-item ');


function scheduleTab(event) {
  let target = event.target.closest('.schedule__nav-item');

  let scheduleButton = document.querySelectorAll('.schedule__nav-item');

  let scheduleTableWrapper = document.querySelectorAll('.schedule__table-wrapper');

  scheduleButton.forEach(scheduleButton => {
    scheduleButton.classList.remove('schedule__nav-item--active')
  });

  target.classList.add('schedule__nav-item--active');

  for (let item of scheduleTableWrapper) {
    let slideData = item.dataset.target;
    let buttunData = target.dataset.target + '-tab'

    item.classList.remove('schedule__table-wrapper--visible')

    if (slideData == buttunData) {
      item.classList.add('schedule__table-wrapper--visible');
    }
  }

}

scheduleButton.forEach(scheduleItem => {
  scheduleItem.addEventListener('click', scheduleTab);
});

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 2;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}