const PRESS_API = '../data/press.json';

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
      try {
        const response = await fetch(PRESS_API);
        const jsonData = await response.json();
        this.updatePressReleasesUi(jsonData);
        this.updateInThePressUi(jsonData);
      } catch(error) {
        console.error(error);
      }
      
    },
    updatePressReleasesUi (data) {
      console.log(data);
      let tempStr = '';
      data.press.map(article => {
        console.log(article.press_release);
        if (article.press_release === "true") {
          tempStr += `
          <li class="flex-container__homepage__list-item">
            <img loading="lazy" class="flex-container__homepage__img" src="../${article.thumbnail}" alt="${article.title}">
            <span>${article.title}</span>
            <h2>${article.place}</h2>
            <p>${article.description}</p>
            <a class="flex-container__homepage__list-item__link" href="#">${article.call_to_action}</a>
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
          <li class="flex-container__homepage__list-item">
            <img loading="lazy" class="flex-container__homepage__img" src="../${article.thumbnail}" alt="${article.title}">
            <span>${article.title}</span>
            <h2>${article.place}</h2>
            <p>${article.description}</p>
            <a class="flex-container__homepage__list-item__link" href="#">${article.call_to_action}</a>
          </li>
          `;
        }
      });
      this.$inThePress.innerHTML = tempStr;
    }
  }
  app.initialize();
})();