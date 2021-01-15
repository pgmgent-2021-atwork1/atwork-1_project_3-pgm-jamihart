(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.fetchArtApi();
      this.fetchAtelierApi();
    },

    cacheElements () {
      this.$art = document.querySelector('.art');
      this.$atelierHomepage = document.querySelector('.atelier__cards');
    },

    async fetchArtApi () {
      const artApi = new ArtApi();
      const art = await artApi.getartApi();
      this.updateArtUi(art);
    },

    updateArtUi (art) {
      let myStr = '';
      for (let i = 0; i < art.length; i++) {
        if (art[i].highlight === true) {
          myStr += `
            <li class="flex-container__cards__list-item">
                <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">
                    <img loading="lazy" class="flex-container__cards__img" src="static/img/${art[i].cover}" alt="${art[i].title}">
                </a>
                <span>${art[i].tags} - ${art[i].location}</span>
                <h2>${art[i].title}</h2>
                <p>${art[i].description}</p>
                <a class="flex-container__cards__list-item__link" href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">Learn more</a>
            </li>
          `;
        }
      }
      this.$art.innerHTML = myStr;
    },

    async fetchAtelierApi () {
      const atelierApi = new AtelierApi();
      const atelierData = await atelierApi.getatelierApi();
      this.updateAtelierHomepageUi(atelierData);
    },

    updateAtelierHomepageUi (atelierData) {
      console.log(atelierData.atelier);
      let myStr = '';
      for (let i = 0; i < 3; i++) {
        myStr += `
        <li class="flex-container__cards__list-item">
          <a href="atelier-studio/visiting-mons-again/index.html">
              <img loading="lazy" class="flex-container__cards__img" src="${atelierData.atelier[i].thumbnail}" alt="${atelierData.atelier[i].title}">
          </a>
          <span>${atelierData.atelier[i].sculpture}</span>
          <h2>${atelierData.atelier[i].title}</h2>
          <p>${atelierData.atelier[i].description}</p>
          <a class="flex-container__cards__list-item__link" href="atelier-studio/visiting-mons-again/index.html">Learn more</a>
        </li>
        `
      }
      this.$atelierHomepage.innerHTML = myStr;
    },
  };
  app.initialize();
})();