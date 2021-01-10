(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.eventListeners();
    },

    cacheElements () {
      this.$footerFormButton = document.querySelector('.footer__form__button');
      this.$footerFormInput = document.querySelector('.footer__form__input');
    },

    eventListeners () {
      this.$footerFormInput.addEventListener('click', (event) => {
        this.$footerFormButton.classList.toggle('footer__form__button--active'); 
        console.log('hello');
      });
    }

  };
  app.initialize();
})();