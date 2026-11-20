const CORSPROXY_API_KEY = "f14ec467";
const GIPHY_API_KEY = "UreA5U9CKBN0iC69rWrD2vauHwCszg5d";

(function() {
  const cw1 = document.getElementById('cw1')
  const cw1t = document.getElementById('cw1t')

  cw1.addEventListener("click", async function() {

    const url = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&rating=g&_=${Date.now()}`;

    const params = new URLSearchParams({
      key: CORSPROXY_API_KEY,
      url: url,
    })
    let response;
    try {
      response = await fetch(
      `https://corsproxy.io/?` + params
    )
    } catch (error) {
      cw1t.innerHTML =  `Bład przy pobieraniu danych`;
    }

    const result = await response.json();

    console.log(result);
    console.log()

    cw1t.innerHTML =  `<img src="${result.data.images.fixed_width.url}" alt="gif">`;
  

  })


})();
