const zomatoAPI = {
  defaultUrl: "https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=hot%2Bchicken",
  request: function (url) {
    return fetch(url, {
      headers: {
        "user-key": "4a3b2c80da683a394fed9954095ed6fd"
      }
    }).then(response => response.json())
  }
}

zomatoAPI.request(zomatoAPI.defaultUrl)
  .then(results => console.log(results));