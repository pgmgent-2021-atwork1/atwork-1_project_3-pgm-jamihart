(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.clickEventListerners();
      this.fetchCategoryApi();
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

    async fetchArtApi () {
      const artApi = new ArtApi();
      const art = await artApi.getartApi();
      this.art = art;
      this.updateArtUi();
    },

    updateArtUi () {
      //console.log(this.categories);
      //console.log(this.art);
      const search = window.location.search;
      const params = new URLSearchParams(search);
      //console.log(params.has('category'));

      const urlCategory = params.get('category');
      console.log(urlCategory);

      if (urlCategory !== null) {
        const categoriesParam = this.art.filter((ctgParam) => {
          for (let i = 0; i < ctgParam.tags.length; i++) {
            //console.log(ctgParam.tags[i] === urlCategory);
            return ctgParam.tags[i] === urlCategory;
          }
        });

        const tempStr = this.categories.map((cat) => {
          
          const categoryFilter = categoriesParam.filter((artFiltered) => {
            //console.log(artFiltered.tags.indexOf(cat))
            return artFiltered.tags.indexOf(cat) > -1;
          })

          const articleList = categoryFilter.map((articles) => {
            //console.log(articles.title);
            return `<li class="articles" data-year="${articles.year}">${articles.title}</li>`
          }).join('');

          return `
          <h1></h1>
          <ul class="art__list">${articleList}</ul>
          `
          
          
        }).join('');
        this.$art.innerHTML = tempStr;


      
      } else {
        //console.log(this.art);

        const tempStr = this.art.map((articlesAll) => {
          //console.log(articlesAll.year);
          return `
          <li class="articles" data-year="${articlesAll.year}">${articlesAll.title}</li>`
        }).join('');
        this.$art.innerHTML = tempStr;

      }
    },

    filterYears (year) {
      const $articlesInHTML = this.$art.querySelectorAll('li.articles');
      this.$artList = document.querySelector('.art__list');
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