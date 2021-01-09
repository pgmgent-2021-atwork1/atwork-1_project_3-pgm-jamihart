(() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.timeInBelgium();
    },

    cacheElements () {
      this.$contactInfoTimeGallery = document.querySelector('.contact__info__time--gallery');
      this.$contactInfoTimeStudio = document.querySelector('.contact__info__time--studio');
    },

    timeInBelgium () {
      const contactTimeInBe = new ContactTimeInBe().timeInBeString(1, 'Belgium');
      this.$contactInfoTimeGallery.innerHTML = contactTimeInBe; 
      this.$contactInfoTimeStudio.innerHTML = contactTimeInBe;
      console.log(contactTimeInBe);
    },
  };
  app.initialize();
})();