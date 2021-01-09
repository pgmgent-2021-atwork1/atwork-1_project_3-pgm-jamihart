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
    this.ATELIER_API = './data/atelier.json';
    try {
      const response = await fetch(this.ATELIER_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };
}