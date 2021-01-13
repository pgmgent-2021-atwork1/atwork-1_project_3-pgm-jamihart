(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.clickEventListerners();
      this.fetchCategoryApi();
      this.fetchYearsApi();
      this.fetchArtApi();
    },

    cacheElements () {
      this.$art = document.querySelector('.art');
      this.$yearFilter = document.querySelectorAll('.year--filter');
    },

    clickEventListerners () {
      this.$yearFilter.forEach(($filterYear) => {
        $filterYear.addEventListener('click', (event) => {
          this.filterYears(event.target.dataset.year);
        });
      });
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
        
        console.log(categoriesParam)
        tempStr = this.years.map((yr) => {
          console.log(yr)
          const yearsFilter = categoriesParam.filter(yrFiltered => {
            return yrFiltered.year.indexOf(yr) > -1;
          });
          
          const articleList = yearsFilter.map((articles) => {
            //console.log(articles.year);
            return `<li class="articles" data-year="${articles.year}">${articles.year} - ${articles.title}</li>`
          }).join('');

          return `
          <h1>${yr}</h1>
          <ul class="art__list">${articleList}</ul>
          `
        }).join('');

        this.$art.innerHTML = tempStr;
      
      } else {
        let tempStr = '';
        
        console.log(this.art)
        tempStr = this.years.map((yr) => {
          console.log(yr)
          const yearsFilter = this.art.filter(yrFiltered => {
            return yrFiltered.year.indexOf(yr) > -1;
          });

          //console.log(yearsFilter)
          
          const articleList = yearsFilter.map((articles) => {
            //console.log(articles.year);
            return `<li class="articles" data-year="${articles.year}">${articles.year} - ${articles.title}</li>`
          }).join('');

          console.log(articleList)

          return `
          <h1>${yr}</h1>
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
        <li>
          <a href="art-and-exhibitions/index.html${search}#${year}" data-year="${year}">${year}</a>
        </li>
        `;
      }).join('');

      document.querySelector('.year--filter').innerHTML = tempStr;
      
    },

    filterYears (year) {
      this.$artList = document.querySelector('.art__list');
      const $articlesInHTML = this.$art.querySelectorAll('li.articles');
      console.log(this.$artList)
      
      //console.log($articlesInHTML);
      $articlesInHTML.forEach(($article, index) => {
        //console.log($article)
        const articleYear = $article.dataset.year;
        //console.log(articleYear);
          if (year !== 'all') {
            if (year === articleYear) {
              $article.classList.remove('hidden');
            } else {
              $article.classList.add('hidden');
            }
          } else {
            $article.classList.remove('hidden');
          }
          //console.log(articleYear)
      });
    }
  };
  app.initialize();
})();