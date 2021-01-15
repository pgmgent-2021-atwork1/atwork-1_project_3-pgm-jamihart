(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.fetchCategoryApi();
      this.fetchYearsApi();
      this.fetchArtApi();
      this.activeCategory();
    },

    cacheElements () {
      this.$art = document.querySelector('.art');
      this.$categoriesListLink = document.getElementsByClassName('categories__list-link');
    },

    async fetchCategoryApi () {
      const categoryApi = new CategoryApi();
      const categories = await categoryApi.getCategoryApi();
      this.categories = categories;
      this.updateArtUi();
    },

    async fetchYearsApi () {
      const yearsApi = new YearsApi();
      const years = await yearsApi.getYearsApi();
      this.years = years;
      this.getHTMLForYearsList();
      this.updateArtUi();
    },

    async fetchArtApi () {
      const artApi = new ArtApi();
      const art = await artApi.getartApi();
      this.art = art;
      this.updateArtUi();
    },

    updateArtUi () {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const urlCategory = params.get('category');

      if (urlCategory !== null) {
        const categoriesParam = this.art.filter((ctgParam) => {
          for (let i = 0; i < ctgParam.tags.length; i++) {
            return ctgParam.tags[i] === urlCategory;
          }
        });

        let tempStr = '';
        tempStr = this.years.map((yr) => {
          const yearsFilter = categoriesParam.filter(yrFiltered => {
            return yrFiltered.year.indexOf(yr) > -1;
          }); 

          const articleList = yearsFilter.map((articles) => {
            return `
            <li class="art_article" data-year="${articles.year}">
               <div class="art__container">
                 <div class="art__content">
                     <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><h2>${articles.title}</h2></a>
                     <h3 class="art__content_subtitle">${articles.subtitle}</h3>
                     <span>${articles.tags.join(' / ')}</span>
                     <span>${articles.location === null ? '' : '— ' + articles.location}</span>
                 </div>
                 <ul class="art_images__container">
                     ${this.loopImagesArt(articles.images)}
                 </ul>
               </div>
             </li>
            `;
          }).join('');

          return `
          <div class="art__content__time">
            <time class="art__content__year" id="${yearsFilter.length === 0 ? '' : yr}">${yearsFilter.length === 0 ? '' : yr}</time>
          </div>
          <ul class="art__list">${articleList}</ul>
          `
        }).join('');

         // Bovenstaande code in een functie steken want wordt 2 keer gebruikt 
        
        this.$art.innerHTML = tempStr;

      } else {
        let tempStr = '';
        tempStr = this.years.map((yr) => {
          const yearsFilter = this.art.filter(yrFiltered => {
            return yrFiltered.year.indexOf(yr) > -1;
          });

          const articleList = yearsFilter.map((articles) => {
            return `
            <li class="art_article" data-year="${articles.year}">
               <div class="art__container">
                 <div class="art__content">
                     <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><h2>${articles.title}</h2></a>
                     <h3 class="art__content_subtitle">${articles.subtitle}</h3>
                     <span>${articles.tags.join(' / ')}</span>
                     <span>${articles.location === null ? '' : '— ' + articles.location}</span>
                 </div>
                 <ul class="art_images__container">
                     ${this.loopImagesArt(articles.images)}
                 </ul>
               </div>
             </li>
             `;
          }).join('');

          return `
          <div class="art__content__time">
            <time class="art__content__year" id="${yr}">${yr}</time>
          </div>
          <ul class="art__list">${articleList}</ul>
          `
        }).join('');

         // Bovenstaande code in een functie steken want wordt 2 keer gebruikt 

        this.$art.innerHTML = tempStr;
      }
    },

    getHTMLForYearsList () {
      const search = window.location.search;
      console.log(search)
      const tempStr = this.years.map((year) => {
        return  `
        <li class="year__filter__list-item">
          <a href="art-and-exhibitions/index.html${search}#${year}">${year}</a>
        </li>
        `;
      }).join('');
      document.querySelector('.year__filter__list').innerHTML = tempStr;
    },

    loopImagesArt (articleImages) {
      let tempStr = '';
      tempStr = articleImages.map((artImg) => {
        return `
        <li>
          <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><img class="art__img" src="static/img/${artImg}" alt="Art & Exhibitions" loading="lazy"></a>
        </li>
        `;
      }).join('');
      return tempStr;
    },

    activeCategory () {
      const path = document.URL;
      for (let i = 0; i < this.$categoriesListLink.length; i++) {
        if (this.$categoriesListLink[i].href === path) {
          this.$categoriesListLink[i].className = 'category__list-link--active';
        };
      };
    },

  };
  app.initialize();
})();