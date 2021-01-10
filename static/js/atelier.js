const ATELIER_API = '../data/atelier.json';

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
      try {
        const response = await fetch(ATELIER_API);
        const jsonData = await response.json();
        this.updateAtelierUi(jsonData);
      } catch(error) {
        console.error(error);
      }
      
    },
    updateAtelierUi (data) {
      console.log(data)
      this.$atelier.innerHTML = data.atelier.map(project => {
        return `
        <li class="flex-container__homepage__list-item--atelier">
          <img loading="lazy" class="flex-container__homepage__img" src="../${project.thumbnail}" alt="${project.title}">
          <span>${project.sculpture}</span>
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <a class="flex-container__homepage__list-item__link" href="visiting-mons-again/index.html">Learn more</a>
        </li>
        `
      }).join('');
    }
  }
  app.initialize();
})();