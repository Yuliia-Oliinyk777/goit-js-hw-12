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
const onSearchFormSubmit = async event => {
    try {
        event.preventDefault();
        searchedWord = searchForm.elements.user_query.value.trim();
        currentPage = 1;
        const response = await fetchImages(searchedWord, currentPage);
        console.log(response);
         if (searchedWord === '') {
    iziToast.show({
        message: 'Please enter a search term.',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
                   position: 'topRight',
    });
        galleryList.innerHTML = '';
    return;
    }

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
               return;
           }
           
            const galleryCardsTenmplate = response.data.hits.map(imgInfo => createGalleryCardTemplate(imgInfo)).join('');
           galleryList.innerHTML = galleryCardsTenmplate;
           new SimpleLightbox('.gallery-item a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
           })
            .refresh();
         
const galleryCard = document.querySelector('.gallery-item');
    cardHeight = galleryCard.getBoundingClientRect().height;
       
   totalPages = Math.ceil(response.data.totalHits / response.data.hits.length);
        if (totalPages > 1) {
            loadMoreBtn.classList.remove('is-hidden');
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
                   new SimpleLightbox('.gallery-item a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
           })
       .refresh();
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

