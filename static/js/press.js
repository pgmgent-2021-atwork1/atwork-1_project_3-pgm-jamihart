const PRESS_API = 'data/press.json';

(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.fetchPressApi();
    },
    cacheElements () {
      this.$pressReleases = document.querySelector('.press__releases');
      this.$inThePress = document.querySelector('.in-the-press');
    },

    async fetchPressApi () {
      const pressApi = new PressApi();
      const press = await pressApi.getPressApi();
      this.updatePressReleasesUi(press);
      this.updateInThePressUi(press);
    },

    updatePressReleasesUi (data) {
      console.log(data);
      let tempStr = '';
      data.press.map(article => {
        console.log(article.press_release);
        if (article.press_release === "true") {
          tempStr += `
          <li class="flex-container__cards__list-item">
            <a href="press/my-secret-garden-valencia/index.html">
              <img loading="lazy" class="flex-container__cards__img" src="${article.thumbnail}" alt="${article.title}">
            </a>
            <span>${article.title}</span>
            <h2>${article.place}</h2>
            <p>${article.description}</p>
            <a class="flex-container__cards__list-item__link" href="press/my-secret-garden-valencia/index.html">${article.call_to_action}</a>
          </li>
          `;
        }
      });
      this.$pressReleases.innerHTML = tempStr;
    },

    updateInThePressUi (data) {
      console.log(data);
      let tempStr = '';
      data.press.map(article => {
        console.log(article.press_release);
        if (article.press_release === "false") {
          tempStr += `
          <li class="flex-container__cards__list-item">
          <a href="press/my-secret-garden-valencia/index.html">
            <img loading="lazy" class="flex-container__cards__img" src="${article.thumbnail}" alt="${article.title}">
          </a>
            <span>${article.title}</span>
            <h2>${article.place}</h2>
            <p>${article.description}</p>
            <a class="flex-container__cards__list-item__link" href="press/my-secret-garden-valencia/index.html">${article.call_to_action}</a>
          </li>
          `;
        }
      });
      this.$inThePress.innerHTML = tempStr;
    }
  }
  app.initialize();
})();