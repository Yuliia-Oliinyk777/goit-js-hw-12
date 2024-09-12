import iziToast from "izitoast";

import SimpleLightbox from "simplelightbox";

import { createGalleryCardTemplate } from "./js/render-functions.js";

import { fetchImages } from "./js/pixabay-api.js";

const searchForm = document.querySelector('.search-form');

const galleryList = document.querySelector('.gallery-list');

const loader = document.querySelector('.loader');

const loadMoreBtn = document.querySelector('.load-btn');

let currentPage = 1;
let searchedWord = '';
let totalPages = 0;
let cardHeight = 0;
const simpleLightbox = new SimpleLightbox('.gallery-item a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});
const onSearchFormSubmit = async event => {
    try {
        event.preventDefault();
        searchedWord = searchForm.elements.user_query.value.trim();
        
    
         if (searchedWord === '') {
        iziToast.show({
        message: 'Please enter a search term.',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
                   position: 'topRight',
    });
             galleryList.innerHTML = '';
             loadMoreBtn.classList.add('is-hidden');
        return;
    }
        currentPage = 1;
        const response = await fetchImages(searchedWord, currentPage);
        searchForm.reset();

        galleryList.innerHTML = '';
        

        if (response.data.hits.length === 0)
        {
            iziToast.warning({
                   message: 'Sorry, there are no images matching your search query. Please try again!',
                   messageColor: '#ffffff',
                   backgroundColor: '#ef4040',
                   position: 'topRight',
            });
            loadMoreBtn.classList.add('is-hidden');
               return;
           }
           
         const galleryCardsTenmplate = response.data.hits.map(imgInfo => createGalleryCardTemplate(imgInfo)).join('');
         galleryList.innerHTML = galleryCardsTenmplate;
        
           simpleLightbox.refresh();
         
         const galleryCard = document.querySelector('.gallery-item');
         cardHeight = galleryCard.getBoundingClientRect().height;
       
         totalPages = Math.ceil(response.data.totalHits / response.data.hits.length);
         if (totalPages > 1) {
            loadMoreBtn.classList.remove('is-hidden');
         } else {
            loadMoreBtn.classList.add('is-hidden'); 
        }
         
    } catch (error) {
        iziToast.error({
            message: `Something went wrong: ${error.message}`,
            backgroundColor: '#ef4040',
            messageColor: '#ffffff',
                   position: 'topRight',
        });
    } 
    
}
const onLoadMoreBtnClick = async event => {
    try {
            loader.classList.remove('is-hidden');
            currentPage++;
            const response = await fetchImages(searchedWord, currentPage);
            console.log(response);
            
            const galleryCardsTenmplate = response.data.hits.map(imgInfo => createGalleryCardTemplate(imgInfo)).join('');
            galleryList.insertAdjacentHTML("beforeend", galleryCardsTenmplate);
           simpleLightbox.refresh();
        scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
        if (currentPage >= totalPages) {
                   iziToast.warning({
                   message: "We're sorry, but you've reached the end of search results",
                   messageColor: '#ffffff',
                   backgroundColor: '#ef4040',
                   position: 'topRight',
               });
              
            loadMoreBtn.classList.add('is-hidden');
             return;
        }
        } catch (error) {
            iziToast.error({
            message: `Something went wrong: ${error.message}`,
            backgroundColor: '#ef4040',
            messageColor: '#ffffff',
            position: 'topRight',
        });
        }finally {
         loader.classList.add('is-hidden');
    }
    
    }
searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)


import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
export const accordion = new Accordion('.about-me-list', {
  duration: 300,
  showMultiple: false,
  openOnInit: [0],
});

import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css';
// import 'swiper/css/navigation';

const swiper = new Swiper('.swiper-container-about', {
  modules: [Navigation, Keyboard],
  loop: true,
  slidesPerView: 2,

  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 6,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  touchEventsTarget: 'container',
  allowSlidePrev: false,
});


const sectionAbout = document.querySelector('.section-about');
document.addEventListener("DOMContentLoaded", function () {
  const pictureEl = document.querySelector('.about-picture');
  const sourceEls = document.querySelectorAll('source');
  const imgEl = document.querySelector('.about-photo');
  
  const observerAbout = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
    
        sourceEls.forEach((source) => {
          const srcsetVal = source.getAttribute('data-srcset');
          if (srcsetVal) {
           
            source.removeAttribute('data-srcset');
             source.setAttribute('srcset', srcsetVal);
          }
        });
        const imgSrc = imgEl.getAttribute('data-src');
        if (imgSrc) {
          
          imgEl.removeAttribute('data-src');
          imgEl.setAttribute('src', imgSrc);
        }

              observer.unobserve(imgEl);
      }
    });
  });

      observerAbout.observe(imgEl);
});
