import iziToast from "izitoast";

import SimpleLightbox from "simplelightbox";

import { createGalleryCardTemplate } from "./js/render-functions.js";

import { fetchImages } from "./js/pixabay-api.js";

const searchForm = document.querySelector('.search-form');

const galleryList = document.querySelector('.gallery-list');

const loader = document.querySelector('.loader');

const onSearchFormSubmit = event => {

    event.preventDefault();

    const searchedWord = searchForm.elements.user_query.value.trim();

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

    loader.style.display = 'block';

    searchForm.reset();

    galleryList.innerHTML = '';

   
   fetchImages(searchedWord)
       .then(data => {
                    if (data.hits.length === 0) {
               iziToast.warning({
                   message: 'Sorry, there are no images matching your search query. Please try again!',
                   messageColor: '#ffffff',
                   backgroundColor: '#ef4040',
                   position: 'topRight',
               });
               return;
           }
           
            const galleryCardsTenmplate = data.hits.map(imgInfo => createGalleryCardTemplate(imgInfo)).join('');
           galleryList.innerHTML = galleryCardsTenmplate;
           new SimpleLightbox('.gallery-item a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
}).refresh();
        })
        .catch(error => {
        iziToast.error({
            message: `Something went wrong: ${error.message}`,
            backgroundColor: '#ef4040',
            messageColor: '#ffffff',
                   position: 'topRight',
        });
        })
       .finally(() => {
      loader.style.display = 'none';
    })
    
}
searchForm.addEventListener('submit', onSearchFormSubmit);


