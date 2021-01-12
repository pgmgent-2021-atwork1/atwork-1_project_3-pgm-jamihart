function ArtApi () {
  this.getartApi = async () => {
    this.ART_API = 'https://www.pgm.gent/data/arnequinze/art.json';
    try {
      const response = await fetch(this.ART_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };
}

function AtelierApi () {
  this.getatelierApi = async () => {
    this.ATELIER_API = 'data/atelier.json';
    try {
      const response = await fetch(this.ATELIER_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };
}

function ContactTimeInBe () {
  this.timeInBeDigits = function (nmbr, amnt) {
    let str = String(nmbr);
    while (str.length < amnt) {
      str = `0${str}`;
    }
    return str;
  };
  this.timeInBeString = function (utc, Country) {
    const time = new Date();
    time.setHours(time.getHours() + utc + time.getTimezoneOffset() / 60);
    return `<p>Time in belgium ${this.timeInBeDigits(time.getHours(), 2)}:${this.timeInBeDigits(time.getMinutes(), 2)}</p>`;
  };
}

function CategoryApi () {
  this.getCategoryApi = async () => {
    this.CATEGORY_API = 'data/categories.json';
    try {
      const response = await fetch(this.CATEGORY_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };
}
