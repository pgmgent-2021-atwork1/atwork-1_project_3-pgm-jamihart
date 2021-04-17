(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.toTopButtonActive();
      this.clickEventListeners();
    },

    cacheElements () {
      this.$BtnToTop = document.querySelector('.btn__to-top');
      this.$pageTop = document.documentElement;
    },

    clickEventListeners () {
      document.addEventListener('scroll', (event) => {
        const WindowOnScroll = document.documentElement;
        if (WindowOnScroll.scrollTop > 600) {
          this.$BtnToTop.classList.add('btn__to-top--active');
        } else {
          this.$BtnToTop.classList.remove('btn__to-top--active');
        }
      })

      this.$BtnToTop.addEventListener('click', (event) => {
        this.$pageTop.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      });
    },

    toTopButtonActive () {
      
    }

  };
  app.initialize();
})();