const zomatoAPI = {
  defaultUrl: "https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=hot+chicken",
  baseUrl: "https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=",
  request: function (queryString) {
    let url = this.baseUrl + queryString;
    return fetch(url, {
      headers: {
        "user-key": "4a3b2c80da683a394fed9954095ed6fd"
      }
    }).then(response => response.json());
  }
};

zomatoAPI.request("tacos")
  .then(results => console.log(results));