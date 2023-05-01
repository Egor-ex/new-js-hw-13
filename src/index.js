import './sass/main.scss';
import NewApiServise from './js/new-service.js';
import articlesTp from './template/articles.hbs';
import LoadMoreBtn from './js/components/load-more-btn.js';

import * as basicLightbox from 'basiclightbox';

import { alert, error, info } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  modal: document.querySelector('.modal'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newApiService = new NewApiServise();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

refs.articlesContainer.addEventListener('click', modalBasicLightbox);

function onSearch(e) {
  e.preventDefault();

  newApiService.query = e.currentTarget.elements.query.value;

  if (newApiService.query === '') {
    return alert('Введите параметр запроса');
  }

  newApiService.resetPage();
  loadMoreBtn.show();
  clearArticlesContainer();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  newApiService.fetchArticle().then(hits => {
    renderArticlesMurkup(hits);

    loadMoreBtn.enable();
  });
}

function renderArticlesMurkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTp(hits));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

function modalBasicLightbox(e) {
  if (e.target.className === 'photo') {
    basicLightbox
      .create(
        `
    <div class="modal">
        <img src="${e.target.src}" alt="" class="modal-photo" />
      </div>`,
      )
      .show();
  }
}
