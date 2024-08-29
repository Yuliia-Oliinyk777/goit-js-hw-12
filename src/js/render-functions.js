export const createGalleryCardTemplate = ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
    return `<li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p>Likes: ${likes}</p>
          <p>Views: ${views}</p>
          <p>Comments: ${comments}</p>
          <p>Downloads: ${downloads}</p>
        </div>
      </li>`
}
