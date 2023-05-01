const API_KEY = '35825697-636c53f6412cb6352dc9d0b60';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchArticle() {
    // console.log('До запроса :', this);
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&q=${this.searchQuery}&per_page=12&key=${API_KEY}&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.nextPage();
        // console.log(this);
        // console.log('После запроса если все ок :', this);
        return hits;
      });
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
