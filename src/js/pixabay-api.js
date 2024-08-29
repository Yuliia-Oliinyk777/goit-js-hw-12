
export const fetchImages = searchedQuery => {
    return fetch(`https://pixabay.com/api/?key=32552782-0d4c86680018457e820f20492&q=${searchedQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};