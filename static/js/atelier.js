(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.fetchAtelierApi();
    },
    cacheElements () {
      this.$atelier = document.querySelector('.atelier');
    },

    async fetchAtelierApi () {
      const atelierApi = new AtelierApi();
      const atelierData = await atelierApi.getatelierApi();
      this.updateAtelierUi(atelierData);
    },

    updateAtelierUi (atelierData) {
      this.$atelier.innerHTML = atelierData.atelier.map(project => {
        return `
        <li class="flex-container__cards__list-item--atelier">
          <a href="atelier-studio/visiting-mons-again/index.html">
              <img loading="lazy" class="flex-container__cards__img" src="${project.thumbnail}" alt="${project.title}">          
          </a>
          <span>${project.sculpture}</span>
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <a class="flex-container__cards__list-item__link" href="atelier-studio/visiting-mons-again/index.html">Learn more</a>
        </li>
        `
      }).join('');
    }
  }
  app.initialize();
})();