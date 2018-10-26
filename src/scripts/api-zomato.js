const zomatoAPI = {
  baseUrl: "https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&count=10&sort=rating&order=desc",
  request: function (queryString) {
    let url = this.baseUrl + queryString;
    return fetch(url, {
      headers: {
        "user-key": "4a3b2c80da683a394fed9954095ed6fd"
      }
    }).then(response => response.json());
  }
};