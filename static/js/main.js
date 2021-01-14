(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.eventListerners();
      this.fetchArtApi();
      this.fetchAtelierApi();
    },

    cacheElements () {
      this.$art = document.querySelector('.art');
      this.$atelierHomepage = document.querySelector('.atelier__cards');
      this.$atelier = document.querySelector('.atelier');
    },

    eventListerners () {
    },

    async fetchArtApi () {
      const artApi = new ArtApi();
      const art = await artApi.getartApi();
      this.updateArtUi(art);
    },

    updateArtUi (art) {
      //console.log(art);
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
          `
        }
      }
      this.$art.innerHTML = myStr;
    },

    async fetchAtelierApi () {
      const atelierApi = new AtelierApi();
      const atelierData = await atelierApi.getatelierApi();
      if (this.$atelierHomepage !== null) {
        this.updateAtelierHomepageUi(atelierData);
      }
      if (this.$atelier !== null) {
        this.updateAtelierUi(atelierData);
      }
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

    updateAtelierUi (atelierData) {
      console.log(atelierData.atelier)
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


  };
  app.initialize();
})();