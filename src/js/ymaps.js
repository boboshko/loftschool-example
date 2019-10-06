function mapInit() {
  ymaps.ready(() => {
    let myMap = new ymaps.Map("map", {
      center: [55.58, 37.33],
      zoom: 7
    });
  });
}

export {
  mapInit
}