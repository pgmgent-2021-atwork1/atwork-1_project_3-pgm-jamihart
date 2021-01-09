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
      this.$atelier = document.querySelector('.atelier')
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
            <li class="flex-container__homepage__list-item">
                <img loading="lazy" class="flex-container__homepage__img" src="static/img/${art[i].cover}" alt="${art[i].title}">
                <h3>${art[i].tags} - ${art[i].location}</h3>
                <h2>${art[i].title}</h2>
                <p>${art[i].description}</p>
                <a class="flex-container__homepage__list-item__link" href="#">Learn more</a>
            </li>
          `
        }
      }
      this.$art.innerHTML = myStr;
    },

    async fetchAtelierApi () {
      const atelierApi = new AtelierApi();
      const atelierData = await atelierApi.getatelierApi();
      this.updateAtelierUi(atelierData);
    },

    updateAtelierUi (atelierData) {
      //console.log(atelierData.atelier);
      let myStr = '';
      for (let i = 0; i < 3; i++) {
        myStr += `
        <li class="flex-container__homepage__list-item">
          <img loading="lazy" class="flex-container__homepage__img" src="${atelierData.atelier[i].thumbnail}" alt="${atelierData.atelier[i].title}">
          <h3>${atelierData.atelier[i].sculpture}</h3>
          <h2>${atelierData.atelier[i].title}</h2>
          <p>${atelierData.atelier[i].description}</p>
          <a class="flex-container__homepage__list-item__link" href="#">Learn more</a>
        </li>
        `
      }
      this.$atelier.innerHTML = myStr;
    },
  };
  app.initialize();
})();