(() => {
  const app = {
    initialize () {
      this.cacheElements();
      //this.clickEventListerners();
      this.fetchCategoryApi();
      this.fetchYearsApi();
      this.fetchArtApi();
    },

    cacheElements () {
      this.$art = document.querySelector('.art');
      this.$yearFilter = document.querySelectorAll('.year__filter__list');
    },

    // clickEventListerners () {
    //   this.$yearFilter.forEach(($filterYear) => {
    //     $filterYear.addEventListener('click', (event) => {
    //       this.filterYears(event.target.dataset.year);
    //     });
    //   });
    // },

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
      //console.log(this.categories);
      //console.log(this.years);
      const search = window.location.search;
      const params = new URLSearchParams(search);
      //console.log(params.has('category'));

      const urlCategory = params.get('category');
      //console.log(urlCategory);

      if (urlCategory !== null) {

        //let tempStr = '';
        const categoriesParam = this.art.filter((ctgParam) => {
          for (let i = 0; i < ctgParam.tags.length; i++) {
            //console.log(ctgParam.tags[i] === urlCategory);
            return ctgParam.tags[i] === urlCategory;
          }
        });

        let tempStr = '';



        //console.log(categoriesParam)
        tempStr = this.years.map((yr) => {
          //console.log(this.year)
          const yearsFilter = categoriesParam.filter(yrFiltered => {
            //console.log(yrFiltered.year)
            return yrFiltered.year.indexOf(yr) > -1;
          });

          console.log(yearsFilter)

          const articleList = yearsFilter.map((articles) => {
            
            return `
            <li class="art_article" data-year="${articles.year}">
               <div class="art__container">
                 <div class="art__content">
                     <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><h2>${articles.title}</h2></a>
                     <h3 class="art__content_subtitle">${articles.subtitle}</h3>
                     <span>${articles.tags}</span>
                     <span>${articles.location === null ? '' : '— ' + articles.location}</span>
                 </div>
                 <ul class="art_images__container">
                     ${this.loopImagesArt(articles.images)}
                 </ul>
               </div>
             </li>
            `
          }).join('');

          //console.log(articleList);

          return `
          <div class="art__content__time">
            <time class="art__content__year" id="${yearsFilter.length === 0 ? '' : yr}">${yearsFilter.length === 0 ? '' : yr}</time>
          </div>
          <ul class="art__list">${articleList}</ul>
          `
        }).join('');

        this.$art.innerHTML = tempStr;

      } else {
        let tempStr = '';

        //console.log(this.art)
        tempStr = this.years.map((yr) => {
          //console.log(yr)
          const yearsFilter = this.art.filter(yrFiltered => {
            return yrFiltered.year.indexOf(yr) > -1;
          });

          const articleList = yearsFilter.map((articles) => {
            //console.log(articles.images)
            //console.log(articles.year);
            return `
            <li class="art_article" data-year="${articles.year}">
               <div class="art__container">
                 <div class="art__content">
                     <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><h2>${articles.title}</h2></a>
                     <h3 class="art__content_subtitle">${articles.subtitle}</h3>
                     <span>${articles.tags}</span>
                     <span>${articles.location === null ? '' : '— ' + articles.location}</span>
                 </div>
                 <ul class="art_images__container">
                     ${this.loopImagesArt(articles.images)}
                 </ul>
               </div>
             </li>
             `;
          }).join('');

          //console.log(articleList)

          return `
          <div class="art__content__time">
            <time class="art__content__year" id="${yr}">${yr}</time>
          </div>
          <ul class="art__list">${articleList}</ul>
          `
        }).join('');

        this.$art.innerHTML = tempStr;

      }
    },

    getHTMLForYearsList () {
      const search = window.location.search;
      console.log(search)
      const tempStr = this.years.map((year) => {
        return  `
        <li class="year__filter__list-item">
          <a href="art-and-exhibitions/index.html${search}#${year}" data-year="${year}">${year}</a>
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

    // filterYears (year) {
    //   this.$artList = document.querySelector('.art__list');
    //   const $articlesInHTML = this.$art.querySelectorAll('li.articles');
    //   console.log(this.$artList)

    //   //console.log($articlesInHTML);
    //   $articlesInHTML.forEach(($article, index) => {
    //     //console.log($article)
    //     const articleYear = $article.dataset.year;
    //     //console.log(articleYear);
    //       if (year !== 'all') {
    //         if (year === articleYear) {
    //           $article.classList.remove('hidden');
    //         } else {
    //           $article.classList.add('hidden');
    //         }
    //       } else {
    //         $article.classList.remove('hidden');
    //       }
    //       //console.log(articleYear)
    //   });
    // }
  };
  app.initialize();
})();